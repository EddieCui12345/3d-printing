const crypto = require('crypto');
const { clean } = require('./square.js');
const { notifyPaidOrder } = require('./notify.js');

function readRaw(req) {
  if (typeof req.rawBody === 'string') return Promise.resolve(req.rawBody);
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function webhookUrl(req) {
  const configured = clean(process.env.SQUARE_WEBHOOK_URL);
  if (configured) return configured;
  const origin =
    process.env.SITE_URL || `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
  return `${String(origin).replace(/\/$/, '')}/api/square-webhook`;
}

function signed(raw, url, header) {
  const key = clean(process.env.SQUARE_WEBHOOK_SIGNATURE_KEY);
  if (!key || !header || !raw) return false;
  const expected = crypto.createHmac('sha256', key).update(url + raw).digest('base64');
  const left = Buffer.from(String(header));
  const right = Buffer.from(expected);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

// Square signs the raw body. Leave the body parser off so the bytes stay intact.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const raw = await readRaw(req);
  if (!signed(raw, webhookUrl(req), req.headers['x-square-hmacsha256-signature'])) {
    return res.status(401).json({ error: 'Invalid webhook signature.' });
  }
  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return res.status(400).json({ error: 'Invalid payload.' });
  }
  const payment = event?.data?.object?.payment;
  if (!payment?.order_id || payment.status !== 'COMPLETED') {
    return res.status(200).json({ ok: true });
  }
  const result = await notifyPaidOrder(payment.order_id, { hintNote: payment.note || '' });
  if (result.body.pending) return res.status(503).json(result.body);
  return res.status(result.http).json(result.body);
};

module.exports.config = { api: { bodyParser: false } };
