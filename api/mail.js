const tls = require('tls');
const { clean } = require('./square.js');

const FROM_NAME_DEFAULT = 'Steamoji North';

function mailConfigured() {
  return Boolean(gmailUser() && gmailPassword());
}

function gmailUser() {
  const user = clean(process.env.email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user) ? user : '';
}

function gmailPassword() {
  return clean(process.env.emailAppPassword).replace(/\s+/g, '');
}

function oneLine(value) {
  return String(value || '').replace(/[\r\n]/g, ' ').trim();
}

function encodeSubject(subject) {
  const text = oneLine(subject);
  if (/^[\x20-\x7E]*$/.test(text)) return text;
  return `=?UTF-8?B?${Buffer.from(text, 'utf8').toString('base64')}?=`;
}

function formatFrom(user) {
  const name = oneLine(process.env.GMAIL_FROM_NAME) || FROM_NAME_DEFAULT;
  const display = /^[\x20-\x7E]*$/.test(name) ? `"${name.replace(/"/g, '')}"` : encodeSubject(name);
  return `${display} <${user}>`;
}

// Gmail accepts the message when MAIL FROM is the account that owns the app password.
function buildData({ from, to, replyTo, subject, text }) {
  const headers = [
    `From: ${from}`,
    `To: ${to.join(', ')}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${encodeSubject(subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ];
  const body = Buffer.from(String(text).replace(/\r?\n/g, '\r\n'), 'utf8')
    .toString('base64')
    .replace(/.{1,76}/g, '$&\r\n');
  return `${headers.join('\r\n')}\r\n\r\n${body}`;
}

function openSmtp() {
  const socket = tls.connect({
    host: 'smtp.gmail.com',
    port: 465,
    servername: 'smtp.gmail.com',
  });
  let buffer = '';
  let waiter = null;
  const queued = [];

  function settle(code, line) {
    const failure = code >= 400 ? Object.assign(new Error(line), { code: 'email_failed' }) : null;
    if (waiter) {
      const pending = waiter;
      waiter = null;
      if (failure) pending.reject(failure);
      else pending.resolve(code);
      return;
    }
    queued.push({ code, line, failure });
  }

  socket.on('data', (chunk) => {
    buffer += chunk.toString('utf8');
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() || '';
    for (const line of lines) {
      if (/^\d{3} /.test(line)) settle(Number(line.slice(0, 3)), line);
    }
  });

  function next() {
    if (queued.length) {
      const item = queued.shift();
      if (item.failure) return Promise.reject(item.failure);
      return Promise.resolve(item.code);
    }
    return new Promise((resolve, reject) => {
      waiter = { resolve, reject };
    });
  }

  function cmd(line) {
    const pending = next();
    socket.write(`${line}\r\n`);
    return pending;
  }

  socket.setTimeout(20000, () => {
    const err = Object.assign(new Error('Gmail timed out.'), { code: 'email_failed' });
    socket.destroy(err);
  });
  socket.on('error', (err) => {
    if (!err.code) err.code = 'email_failed';
    if (waiter) {
      const pending = waiter;
      waiter = null;
      pending.reject(err);
    }
  });

  return { socket, next, cmd };
}

async function sendMail({ to, replyTo, subject, text }) {
  const user = gmailUser();
  const pass = gmailPassword();
  if (!user || !pass) {
    const err = new Error('Pickup email is not set up.');
    err.code = 'email_not_configured';
    throw err;
  }
  const recipients = (Array.isArray(to) ? to : [to]).map(oneLine);
  const reply = oneLine(replyTo);
  for (const email of [...recipients, reply]) {
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
      const err = new Error('The pickup email could not be sent.');
      err.code = 'email_failed';
      throw err;
    }
  }

  const session = openSmtp();
  try {
    await session.next();
    await session.cmd('EHLO steamoji.local');
    await session.cmd('AUTH LOGIN');
    await session.cmd(Buffer.from(user).toString('base64'));
    await session.cmd(Buffer.from(pass).toString('base64'));
    await session.cmd(`MAIL FROM:<${user}>`);
    for (const recipient of recipients) await session.cmd(`RCPT TO:<${recipient}>`);
    await session.cmd('DATA');
    const accepted = session.next();
    const data = buildData({
      from: formatFrom(user),
      to: recipients,
      replyTo: reply,
      subject,
      text,
    });
    session.socket.write(`${data}\r\n.\r\n`);
    await accepted;
    await session.cmd('QUIT');
  } catch (err) {
    console.error('Gmail SMTP failed', oneLine(err.message));
    if (!err.code) err.code = 'email_failed';
    throw err;
  } finally {
    session.socket.end();
  }
}

module.exports = { mailConfigured, gmailUser, sendMail, buildData };
