const crypto = require('crypto');
const { pickupLocations } = require('../locations.js');
const { clean } = require('./square.js');

const LIMITS = { name: 80, email: 120, phone: 30, child: 80 };

function cleanText(value, max, optional = false) {
  const text = String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return optional ? '' : null;
  if (text.length > max) return null;
  return text;
}

function cleanEmail(value) {
  const email = cleanText(value, LIMITS.email);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

function cleanPhone(value) {
  const phone = cleanText(value, LIMITS.phone);
  if (!phone || !/^[0-9+().\-\s]+$/.test(phone)) return null;
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return null;
  return phone;
}

// Parent name, email, and phone are required. The child's name is optional.
function readBuyer(input) {
  const source = input || {};
  const location = pickupLocations.find((loc) => loc.id === (source.location || source.locationId));
  const parentName = cleanText(source.parentName, LIMITS.name);
  const parentEmail = cleanEmail(source.parentEmail);
  const parentPhone = cleanPhone(source.parentPhone);
  const childName = cleanText(source.childName, LIMITS.child, true);
  if (!location || !parentName || !parentEmail || !parentPhone || childName == null) {
    return {
      error:
        'Choose a pickup location and add the parent’s name, email, and phone. The child’s name is optional.',
    };
  }
  return { location, parentName, parentEmail, parentPhone, childName };
}

// Stored on the Square payment so the club can see it in the dashboard, and so a
// paid-order email can be sent even if the buyer never returns to the thank-you page.
function buildNote(buyer) {
  const lines = [
    `Pickup: ${buyer.location.name}`,
    `Address: ${buyer.location.address}`,
    `Parent: ${buyer.parentName}`,
    `Email: ${buyer.parentEmail}`,
    `Phone: ${buyer.parentPhone}`,
  ];
  if (buyer.childName) lines.push(`Child: ${buyer.childName}`);
  const note = lines.join('\n');
  if (note.length > 500) return null;
  return note;
}

function parseNote(note) {
  const fields = {};
  for (const line of String(note || '').split('\n')) {
    const splitAt = line.indexOf(': ');
    if (splitAt === -1) continue;
    fields[line.slice(0, splitAt)] = line.slice(splitAt + 2).trim();
  }
  return readBuyer({
    location: pickupLocations.find((loc) => loc.name === fields.Pickup)?.id,
    parentName: fields.Parent,
    parentEmail: fields.Email,
    parentPhone: fields.Phone,
    childName: fields.Child || '',
  });
}

function signingSecret() {
  return clean(process.env.SQUARE_ACCESS_TOKEN);
}

// Binds the pickup details to the Square order id. The browser holds this until
// the thank-you page, which covers sandbox checkouts that do not add orderId to the URL.
function signPickupToken(payload) {
  const secret = signingSecret();
  if (!secret) return '';
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Date.now() + 14 * 24 * 60 * 60 * 1000 }),
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function verifyPickupToken(token) {
  const secret = signingSecret();
  if (!secret || typeof token !== 'string' || token.length > 4000) return null;
  const dot = token.indexOf('.');
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) return null;
  let data;
  try {
    data = JSON.parse(Buffer.from(body, 'base64url').toString());
  } catch {
    return null;
  }
  if (!data || !data.orderId || !data.exp || data.exp < Date.now()) return null;
  const buyer = readBuyer(data);
  if (buyer.error) return null;
  const items = Array.isArray(data.items) ? data.items : [];
  return { ...buyer, orderId: data.orderId, items };
}

module.exports = { readBuyer, buildNote, parseNote, signPickupToken, verifyPickupToken };
