const crypto = require('crypto');
const products = require('../products.js');

const MAX_QTY = 20;
const SQUARE_HOSTS = {
  production: 'https://connect.squareup.com',
  sandbox: 'https://connect.squareupsandbox.com',
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID, SQUARE_ENVIRONMENT = 'sandbox' } = process.env;
  const squareHost = SQUARE_HOSTS[SQUARE_ENVIRONMENT];
  if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID || !squareHost) {
    return res
      .status(500)
      .json({ error: 'Checkout is not set up yet. Please contact the club to order.' });
  }

  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (!items.length || items.length > products.length) {
    return res.status(400).json({ error: 'Your cart is empty or invalid.' });
  }

  const lineItems = [];
  for (const { id, qty } of items) {
    const product = products.find((p) => p.id === id);
    const quantity = Number(qty);
    if (
      !product ||
      product.price == null ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QTY
    ) {
      return res
        .status(400)
        .json({
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
    const response = await fetch(`${squareHost}/v2/online-checkout/payment-links`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Square-Version': process.env.SQUARE_VERSION || '2024-01-18',
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        order: { location_id: SQUARE_LOCATION_ID, line_items: lineItems },
        checkout_options: { redirect_url: `${origin}/thanks.html` },
      }),
    });
    const data = await response.json();
    if (!response.ok || !data.payment_link?.url) {
      console.error('Square checkout failed', response.status, data.errors);
      return res.status(502).json({ error: 'Square could not start checkout. Please try again.' });
    }
    return res.status(200).json({ url: data.payment_link.url });
  } catch (err) {
    console.error('Square checkout error', err);
    return res.status(502).json({ error: 'Square could not start checkout. Please try again.' });
  }
};
