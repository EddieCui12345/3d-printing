// Local preview with working checkout: `npm run dev`, then open http://localhost:3000.
// Serves the site, loads .env, and runs the api the way Vercel does.
// Not deployed (see .vercelignore); Vercel runs the API itself.
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT) || 3000;

if (fs.existsSync(path.join(root, '.env'))) {
  for (const line of fs.readFileSync(path.join(root, '.env'), 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && match[2] && !(match[1] in process.env)) process.env[match[1]] = match[2];
  }
}

// Node 16 has no global fetch; Vercel's Node does.
if (typeof fetch === 'undefined') {
  global.fetch = (url, { method = 'GET', headers = {}, body } = {}) =>
    new Promise((resolve, reject) => {
      const req = https.request(url, { method, headers }, (res) => {
        let text = '';
        res.on('data', (chunk) => (text += chunk));
        res.on('end', () =>
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: async () => JSON.parse(text),
          }),
        );
      });
      req.on('error', reject);
      if (body) req.write(body);
      req.end();
    });
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
};

function runApi(req, res, handler) {
  let raw = '';
  req.on('data', (chunk) => (raw += chunk));
  req.on('end', async () => {
    req.rawBody = raw;
    try {
      req.body = raw ? JSON.parse(raw) : {};
    } catch {
      req.body = {};
    }
    res.status = (code) => ((res.statusCode = code), res);
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };
    await handler(req, res);
  });
}

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const apis = {
      '/api/checkout': './api/checkout.js',
      '/api/order-notice': './api/order-notice.js',
      '/api/square-webhook': './api/square-webhook.js',
    };
    if (apis[url.pathname]) {
      for (const key of Object.keys(require.cache)) {
        if (key.startsWith(root) && path.basename(key) !== 'dev-server.js') {
          delete require.cache[key];
        }
      }
      req.headers['x-forwarded-proto'] = 'http';
      return runApi(req, res, require(apis[url.pathname]));
    }
    const file = path.join(
      root,
      decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname),
    );
    if (!file.startsWith(root) || path.basename(file).startsWith('.')) {
      res.statusCode = 403;
      return res.end('Forbidden');
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.statusCode = 404;
        return res.end('Not found');
      }
      res.setHeader(
        'Content-Type',
        types[path.extname(file).toLowerCase()] || 'application/octet-stream',
      );
      res.setHeader('Cache-Control', 'no-store');
      res.end(data);
    });
  })
  .listen(port, () => {
    const env = process.env.SQUARE_ENVIRONMENT || 'sandbox';
    const ready = process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID;
    console.log(
      `Site: http://localhost:${port}  (Square ${ready ? env : 'NOT configured, check .env'})`,
    );
  });
