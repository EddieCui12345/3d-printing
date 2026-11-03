const { notifyPaidOrder } = require('./notify.js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const result = await notifyPaidOrder(req.body?.orderId, {
    token: req.body?.pickupToken || '',
  });
  return res.status(result.http).json(result.body);
};
