// Shared Square client for checkout and the paid-order emails.
const SQUARE_HOSTS = {
  production: 'https://connect.squareup.com',
  sandbox: 'https://connect.squareupsandbox.com',
};

// Pasted dashboard values often include a newline or quotes. Square then rejects the token.
const clean = (value) => String(value || '').trim().replace(/^['"]|['"]$/g, '');

// Vercel Production should charge the live Square account. Sandbox stays the default
// for local preview and for branch deployments, unless SQUARE_ENVIRONMENT is set.
function squareEnvironment() {
  const configured = clean(process.env.SQUARE_ENVIRONMENT).toLowerCase();
  if (configured === 'production' || configured === 'sandbox') return configured;
  return process.env.VERCEL_ENV === 'production' ? 'production' : 'sandbox';
}

function squareReady() {
  return Boolean(clean(process.env.SQUARE_ACCESS_TOKEN) && clean(process.env.SQUARE_LOCATION_ID));
}

async function squareFetch(apiPath, { method = 'GET', body } = {}) {
  const host = SQUARE_HOSTS[squareEnvironment()];
  return fetch(`${host}${apiPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${clean(process.env.SQUARE_ACCESS_TOKEN)}`,
      'Content-Type': 'application/json',
      'Square-Version': clean(process.env.SQUARE_VERSION) || '2024-01-18',
    },
    body,
  });
}

module.exports = { clean, squareEnvironment, squareReady, squareFetch };
