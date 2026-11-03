const crypto = require('crypto');
const { items: catalogue } = require('../products.js');
const { clean, squareFetch, squareReady } = require('./square.js');
const { readBuyer, buildNote, signPickupToken } = require('./buyer.js');
const { gmailUser } = require('./mail.js');

const MAX_QTY = 20;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const SQUARE_LOCATION_ID = clean(process.env.SQUARE_LOCATION_ID);
  if (!squareReady() || !SQUARE_LOCATION_ID) {
    return res
      .status(500)
      .json({ error: 'Checkout is not set up yet. Please contact the club to order.' });
  }

  const buyer = readBuyer(req.body?.buyer);
  if (buyer.error) return res.status(400).json({ error: buyer.error });
  const note = buildNote(buyer);
  if (!note) {
    return res.status(400).json({ error: 'Those pickup details are too long. Please shorten them.' });
  }

  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (!items.length || items.length > catalogue.length) {
    return res.status(400).json({ error: 'Your cart is empty or invalid.' });
  }

  const lineItems = [];
  for (const { id, qty } of items) {
    const product = catalogue.find((p) => p.id === id);
    const quantity = Number(qty);
    if (
      !product ||
      product.price == null ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QTY
    ) {
      return res.status(400).json({
        error: 'Something in your cart is no longer available. Please refresh and try again.',
      });
    }
    lineItems.push({
      name: product.name,
      quantity: String(quantity),
      base_price_money: { amount: product.price, currency: 'CAD' },
    });
  }

  const origin =
    process.env.SITE_URL || `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;

  try {
    const response = await squareFetch('/v2/online-checkout/payment-links', {
      method: 'POST',
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        order: { location_id: SQUARE_LOCATION_ID, line_items: lineItems },
        checkout_options: {
          redirect_url: `${origin}/thanks.html`,
          merchant_support_email: gmailUser() || buyer.location.email,
        },
        pre_populated_data: { buyer_email: buyer.parentEmail },
        payment_note: note,
      }),
    });
    const data = await response.json();
    if (!response.ok || !data.payment_link?.url || !data.payment_link.order_id) {
      const squareError = data.errors?.[0];
      console.error('Square checkout failed', response.status, data.errors);
      const detail = squareError?.detail || squareError?.code;
      return res.status(502).json({
        error: detail
          ? `Square could not start checkout. ${detail}`
          : 'Square could not start checkout. Please try again.',
      });
    }
    const orderId = data.payment_link.order_id;
    const pickupToken = signPickupToken({
      orderId,
      locationId: buyer.location.id,
      parentName: buyer.parentName,
      parentEmail: buyer.parentEmail,
      parentPhone: buyer.parentPhone,
      childName: buyer.childName,
      items: lineItems.map((line) => ({ name: line.name, qty: Number(line.quantity) })),
    });
    return res.status(200).json({ url: data.payment_link.url, orderId, pickupToken });
  } catch (err) {
    console.error('Square checkout error', err);
    return res.status(502).json({ error: 'Square could not start checkout. Please try again.' });
  }
};
