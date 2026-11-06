// Adds each paid order to the Google Sheet for that pickup location.
// Staff mark the Taken column when the family collects the toys.
const crypto = require('crypto');
const { clean } = require('./square.js');

const HEADERS = [
  'Date',
  'Order ID',
  'Products',
  'Total',
  'Parent',
  'Email',
  'Phone',
  'Child',
  'Pickup location',
  'Taken',
];
const NOT_TAKEN = 'Not taken';
const TAKEN = 'Taken';
const TAB = 'Orders';

const SHEET_ENV = {
  richmondcentral: 'SHEET_RICHMOND_CENTRAL',
  richmondnorth: 'SHEET_RICHMOND_NORTH',
};

const money = (cents) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(
    (Number(cents) || 0) / 100,
  );

function spreadsheetId(value) {
  const text = clean(value);
  const fromLink = text.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (fromLink) return fromLink[1];
  return /^[a-zA-Z0-9-_]+$/.test(text) ? text : '';
}

function spreadsheetIdFor(locationId) {
  const key = SHEET_ENV[locationId];
  return key ? spreadsheetId(process.env[key]) : '';
}

function serviceAccount() {
  const raw = clean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  if (raw) {
    const parsed = JSON.parse(raw);
    return { email: clean(parsed.client_email), key: String(parsed.private_key || '') };
  }
  let key = String(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '').trim();
  if (key.startsWith('"') && key.endsWith('"')) key = key.slice(1, -1);
  key = key.replace(/\\n/g, '\n');
  return { email: clean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL), key };
}

function sheetsConfigured() {
  try {
    const account = serviceAccount();
    const hasSheet = Object.keys(SHEET_ENV).some((id) => spreadsheetIdFor(id));
    return Boolean(account.email && account.key && hasSheet);
  } catch {
    return false;
  }
}

function orderStamp(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const pick = (type) => parts.find((part) => part.type === type)?.value || '00';
  return `${pick('year')}-${pick('month')}-${pick('day')} ${pick('hour')}:${pick('minute')}`;
}

function orderRow({ when = new Date(), orderId, lines, totalCents, buyer }) {
  const products = (lines || []).map((line) => `${line.name} x ${line.qty}`).join('; ');
  return [
    orderStamp(when),
    orderId,
    products,
    money(totalCents),
    buyer.parentName,
    buyer.parentEmail,
    buyer.parentPhone,
    buyer.childName || '',
    buyer.location.name,
    NOT_TAKEN,
  ];
}

let cachedToken = null;

function base64url(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function accessToken() {
  if (cachedToken && cachedToken.exp > Date.now() + 60 * 1000) return cachedToken.value;
  const { email, key } = serviceAccount();
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${base64url(
    JSON.stringify({
      iss: email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  )}`;
  const signature = base64url(crypto.createSign('RSA-SHA256').update(unsigned).sign(key));
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Google did not grant sheet access.');
  }
  cachedToken = { value: data.access_token, exp: Date.now() + (data.expires_in || 3600) * 1000 };
  return cachedToken.value;
}

async function sheetsFetch(token, url, { method = 'GET', body } = {}) {
  const response = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(data.error?.message || `Google Sheets returned ${response.status}.`);
    err.status = response.status;
    throw err;
  }
  return data;
}

function valuesUrl(spreadsheetId, range, suffix = '') {
  const encoded = encodeURIComponent(range);
  const root = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values`;
  return `${root}/${encoded}${suffix}`;
}

async function sheetMeta(token, spreadsheetId) {
  const data = await sheetsFetch(
    token,
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties`,
  );
  return (data.sheets || []).find((sheet) => sheet.properties?.title === TAB) || null;
}

async function addTakenDropdown(token, spreadsheetId, sheetId) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
  await sheetsFetch(token, url, {
    method: 'POST',
    body: JSON.stringify({
      requests: [
        {
          setDataValidation: {
            range: {
              sheetId,
              startRowIndex: 1,
              startColumnIndex: HEADERS.length - 1,
              endColumnIndex: HEADERS.length,
            },
            rule: {
              condition: {
                type: 'ONE_OF_LIST',
                values: [{ userEnteredValue: NOT_TAKEN }, { userEnteredValue: TAKEN }],
              },
              showCustomUi: true,
              strict: true,
            },
          },
        },
      ],
    }),
  });
}

async function ensureOrdersTab(token, spreadsheetId) {
  let sheet = await sheetMeta(token, spreadsheetId);
  if (!sheet) {
    try {
      const added = await sheetsFetch(
        token,
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
        {
          method: 'POST',
          body: JSON.stringify({
            requests: [
              {
                addSheet: {
                  properties: { title: TAB, gridProperties: { frozenRowCount: 1 } },
                },
              },
            ],
          }),
        },
      );
      sheet = { properties: added.replies?.[0]?.addSheet?.properties };
    } catch (err) {
      if (!/already exists/i.test(err.message)) throw err;
      sheet = await sheetMeta(token, spreadsheetId);
    }
  }
  const sheetId = sheet?.properties?.sheetId;
  if (sheetId == null) throw new Error('The Orders tab could not be created.');

  const headerData = await sheetsFetch(token, valuesUrl(spreadsheetId, `${TAB}!A1:J1`));
  const header = headerData.values?.[0] || [];
  if (!header.length) {
    await sheetsFetch(token, `${valuesUrl(spreadsheetId, `${TAB}!A1:J1`)}?valueInputOption=RAW`, {
      method: 'PUT',
      body: JSON.stringify({ values: [HEADERS] }),
    });
  } else if (header[0] !== 'Date' || header[1] !== 'Order ID') {
    throw new Error('The Orders tab already uses different column headings.');
  } else if (header[HEADERS.length - 1] !== 'Taken') {
    await sheetsFetch(token, `${valuesUrl(spreadsheetId, `${TAB}!J1`)}?valueInputOption=RAW`, {
      method: 'PUT',
      body: JSON.stringify({ values: [['Taken']] }),
    });
  }
  await addTakenDropdown(token, spreadsheetId, sheetId);
  return sheetId;
}

async function appendPaidOrder({ orderId, lines, totalCents, buyer }) {
  const spreadsheetId = spreadsheetIdFor(buyer.location?.id);
  if (!spreadsheetId) {
    const place = buyer.location?.name || 'this location';
    const err = new Error(`No spreadsheet is configured for ${place}.`);
    err.code = 'sheet_not_configured';
    throw err;
  }
  const token = await accessToken();
  await ensureOrdersTab(token, spreadsheetId);
  const existing = await sheetsFetch(token, valuesUrl(spreadsheetId, `${TAB}!B:B`));
  const seen = (existing.values || []).some((row, index) => index > 0 && row[0] === orderId);
  if (seen) return 'already';
  const appendUrl = `${valuesUrl(spreadsheetId, `${TAB}!A:J`)}:append`;
  await sheetsFetch(
    token,
    `${appendUrl}?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      body: JSON.stringify({ values: [orderRow({ orderId, lines, totalCents, buyer })] }),
    },
  );
  return 'logged';
}

module.exports = {
  HEADERS,
  NOT_TAKEN,
  sheetsConfigured,
  spreadsheetIdFor,
  orderRow,
  appendPaidOrder,
};
