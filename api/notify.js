const crypto = require('crypto');
const { squareFetch } = require('./square.js');
const { parseNote, verifyPickupToken } = require('./buyer.js');
const { mailConfigured, gmailUser, sendMail } = require('./mail.js');
const { sheetsConfigured, appendPaidOrder } = require('./sheets.js');

const money = (cents) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(
    (Number(cents) || 0) / 100,
  );

const NOT_SETUP =
  'Your payment went through. Pickup emails are not set up on the site yet, so please contact the location and mention the parent’s name.';
const MAIL_FAILED =
  'Your payment went through, but the pickup email could not be sent. Please contact the location and mention the parent’s name.';

function orderLines(order) {
  return (order.line_items || []).map((line) => ({
    name: line.name,
    qty: Number(line.quantity),
    amount: line.total_money?.amount ?? 0,
  }));
}

function sameItems(order, items) {
  const paid = orderLines(order)
    .map((line) => `${line.name}\n${line.qty}`)
    .sort();
  const expected = (items || []).map((item) => `${item.name}\n${Number(item.qty)}`).sort();
  return (
    paid.length > 0 &&
    paid.length === expected.length &&
    paid.every((line, i) => line === expected[i])
  );
}

function buyerFromNote(note) {
  if (!note) return null;
  const buyer = parseNote(note);
  return buyer?.error ? null : buyer;
}

function productBlocks(lines) {
  return lines
    .map((line) => `Product: ${line.name}\nCount: ${line.qty}\nAmount: ${money(line.amount)}`)
    .join('\n\n');
}

function clubLetter(details, lines, total) {
  return `A new toy order has been paid.

Location: ${details.location.name}
${details.location.address}

${productBlocks(lines)}

Total: ${money(total)}

Parent: ${details.parentName}
Email: ${details.parentEmail}
Phone: ${details.parentPhone}
Child: ${details.childName || 'not given'}
`;
}

function parentLetter(details, lines, total, inbox) {
  const loc = details.location;
  return `Hello ${details.parentName},

Thank you for supporting the Steamoji 3D Toy Design Club and BC Children’s Hospital.

${productBlocks(lines)}

Total: ${money(total)}

Pick up at:
${loc.name}
${loc.lines.join('\n')}
${loc.phone}

Parent: ${details.parentName}
Phone: ${details.parentPhone}
Child: ${details.childName || 'not given'}

Square will also email a payment receipt. Questions about pickup: ${inbox}
`;
}

async function getOrder(orderId) {
  const res = await squareFetch(`/v2/orders/${orderId}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error('Square order lookup failed', res.status, data.errors);
    return null;
  }
  return data.order;
}

async function completedPayment(order) {
  const paymentId = (order.tenders || []).map((tender) => tender.payment_id).find(Boolean);
  if (!paymentId) return null;
  const res = await squareFetch(`/v2/payments/${paymentId}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error('Square payment lookup failed', res.status, data.errors);
    return null;
  }
  return data.payment?.status === 'COMPLETED' ? data.payment : null;
}

// Sparse update. Line items are left untouched. Metadata is sent in full because
// Square replaces the whole map when it is included.
async function setMeta(order, patch) {
  const res = await squareFetch(`/v2/orders/${order.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      idempotency_key: crypto.randomUUID(),
      order: {
        location_id: order.location_id,
        version: order.version,
        metadata: { ...(order.metadata || {}), ...patch },
      },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error('Square order update failed', res.status, data.errors);
    return null;
  }
  return data.order;
}

async function setNotice(order, notice) {
  return setMeta(order, { notice });
}

function noticeAge(order) {
  const updated = Date.parse(order.updated_at);
  return Number.isFinite(updated) ? Date.now() - updated : Infinity;
}

async function claim(order) {
  if (order.metadata?.notice === 'sent') return { state: 'sent', order };
  if (order.metadata?.notice === 'sending' && noticeAge(order) < 90 * 1000) {
    return { state: 'busy', order };
  }
  const updated = await setNotice(order, 'sending');
  if (updated) return { state: 'claimed', order: updated };
  const again = await getOrder(order.id);
  if (again?.metadata?.notice === 'sent') return { state: 'sent', order: again };
  if (again?.metadata?.notice === 'sending' && noticeAge(again) < 90 * 1000) {
    return { state: 'busy', order: again };
  }
  // The notice flag is the duplicate guard. A missed update can send a second copy.
  return { state: 'claimed', order };
}

async function deliver(order, details) {
  const lines = orderLines(order);
  const total = order.total_money?.amount ?? lines.reduce((sum, line) => sum + line.amount, 0);
  const inbox = gmailUser();
  const subjectLocation = details.location.name;
  await sendMail({
    to: [inbox],
    replyTo: details.parentEmail,
    subject: `New toy order — ${subjectLocation} — ${details.parentName}`,
    text: clubLetter(details, lines, total),
    idempotencyKey: `${order.id}:club`,
  });
  await sendMail({
    to: [details.parentEmail],
    replyTo: inbox,
    subject: `Your Steamoji pickup order — ${subjectLocation}`,
    text: parentLetter(details, lines, total, inbox),
    idempotencyKey: `${order.id}:parent`,
  });
}

// Sends once, after Square marks the order paid. `hintNote` is only accepted from a
// signature-checked Square webhook. The pickup token is the browser's signed copy.
async function notifyPaidOrder(orderId, { token = '', hintNote = '' } = {}) {
  if (!/^[A-Za-z0-9]+$/.test(String(orderId || '')) || String(orderId).length > 64) {
    return { http: 400, body: { error: 'Unknown order.' } };
  }
  const order = await getOrder(orderId);
  if (!order) return { http: 404, body: { error: 'We could not find that order.' } };
  const emailDone = order.metadata?.notice === 'sent';
  const sheetDone = order.metadata?.sheet === 'logged' || !sheetsConfigured();
  if (emailDone && sheetDone) return { http: 200, body: { sent: true, already: true } };
  if (order.state === 'CANCELED') {
    return { http: 200, body: { error: 'This payment was not completed.' } };
  }

  const payment = await completedPayment(order);
  const paid = order.state === 'COMPLETED' || Boolean(payment);
  if (!paid) return { http: 200, body: { pending: true } };

  const fromToken = verifyPickupToken(token);
  const tokenMatches =
    fromToken && fromToken.orderId === order.id && sameItems(order, fromToken.items);
  const buyer =
    buyerFromNote(payment?.note) || buyerFromNote(hintNote) || (tokenMatches ? fromToken : null);
  if (!buyer) {
    return {
      http: 502,
      body: { error: 'We could not read the pickup details for this order yet.' },
    };
  }
  const lines = orderLines(order);
  if (!lines.length) return { http: 502, body: { error: MAIL_FAILED } };

  let working = order;
  let emailHttp = null;
  let emailBody = null;
  if (!emailDone) {
    if (!mailConfigured()) {
      emailHttp = 503;
      emailBody = { error: NOT_SETUP };
    } else {
      const claimed = await claim(order);
      if (claimed.state === 'busy') return { http: 200, body: { pending: true } };
      if (claimed.state !== 'sent') {
        try {
          // Email the order fetched before the notice flag, so the message keeps its lines.
          await deliver(order, buyer);
          working = (await setNotice(claimed.order, 'sent')) || claimed.order;
        } catch (err) {
          console.error('Pickup email failed', order.id, err.code || err.message);
          await setNotice(claimed.order, 'retry');
          emailHttp = err.code === 'email_not_configured' ? 503 : 502;
          emailBody = { error: err.code === 'email_not_configured' ? NOT_SETUP : MAIL_FAILED };
          working = claimed.order;
        }
      } else {
        working = claimed.order;
      }
    }
  }

  let sheet = working.metadata?.sheet === 'logged' ? 'logged' : 'skipped';
  if (sheetsConfigured() && sheet !== 'logged') {
    try {
      const total = order.total_money?.amount ?? lines.reduce((sum, line) => sum + line.amount, 0);
      const recorded = await appendPaidOrder({
        orderId: order.id,
        lines,
        totalCents: total,
        buyer,
      });
      const marked = await setMeta(working, { sheet: 'logged' });
      if (!marked) {
        console.error('Order was added to the sheet but the logged flag was not saved', order.id);
        sheet = 'failed';
      } else {
        sheet = recorded === 'already' ? 'logged' : recorded;
      }
    } catch (err) {
      console.error('Order sheet update failed', order.id, err.message);
      sheet = err.code === 'sheet_not_configured' ? 'missing' : 'failed';
    }
  }

  if (emailBody) return { http: emailHttp, body: { ...emailBody, sheet } };
  return { http: 200, body: { sent: true, already: emailDone, sheet } };
}

module.exports = { notifyPaidOrder, orderLines, sameItems, productBlocks };
