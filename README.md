# Steamoji Apprentices’ 3D Toy Design Club

A responsive static website using HTML, CSS, and vanilla JavaScript. No build or package installation is required.

## Preview

Run `npm run dev` in this folder and open http://localhost:3000. It serves the site and runs the Square checkout using the keys in `.env` (copy `.env.example`), so the cart can be tested end to end with sandbox payments.

After changing `app.js`, `products.js`, or `styles.css`, bump the `?v=` number on their links in every HTML page so browsers load the new files.

## Content and maintenance

See [CODE_INDEX.md](CODE_INDEX.md) for a file and function index, editor navigation shortcuts, and debugging instructions. Run `npm run check` to check application JavaScript syntax without installing packages.

- `app.js` contains shared navigation, page content, the cart, and memory records. `products.js` holds the product list and prices.
- Add products to `products.js` with a unique `id`, name, category, `price` in cents (CAD), image path, and description. A `null` price shows "coming soon" and disables "Add to cart". To sell one product in several colours, keep one `image` that shows every colour and add a `colours` list (each with its own `id`, `name`, `swatch` hex colour, and a small `thumb` used in the cart). An optional `focus` (for example `center 72%`) keeps the important part of a photo visible when it is cropped. Only use photos of toys the apprentices made. Update the filter choices if introducing new categories.

## Cart and Square checkout

The cart is saved in the visitor's browser. "Checkout with Square" calls `api/checkout.js`, a Vercel serverless function that looks up prices in `products.js`, creates a Square payment link for the whole order, and sends the shopper to Square's hosted checkout. After paying, Square returns them to `thanks.html`, which empties the cart.

1. In the [Square Developer Dashboard](https://developer.squareup.com/apps), create an application and copy its access token and location ID. Start with the sandbox values to test with fake cards.
2. In Vercel, open Project Settings > Environment Variables and add the variables listed in `.env.example`.
3. Redeploy. Switch `SQUARE_ENVIRONMENT` to `production` and use production credentials when ready to take real payments.

Checkout works on Vercel and with `npm run dev`. A plain static server (such as `python -m http.server`) shows the cart but cannot run `/api/checkout`, so checkout reports it is unavailable.
- Add approved community entries to `memories` with `year`, `type`, `title`, `description`, `url`, `cover`, and optional `photos`. The year filter updates automatically.
- Store new approved images in `assets/`. Use factual captions and accessible image descriptions. Keep original media backups.
- The rotating gallery on the Stories & memories page shows every photo listed in `galleryPhotos` in `app.js`. To add one, put the photo in `assets/gallery/` (about 1400px on the long side keeps pages fast) and add its file name and a short description to the list.
- Dedicated pages cover creations, memories, designers, process, impact, events, about, joining, and contact. `index.html` and `home.html` both show the homepage.
- Selected photos from the December 18, 2025 Richmond Central celebration are stored in `assets/` and shown on the creations and memories pages. The full album, including videos, remains linked. Prices, availability, fundraising totals, apprentice profiles, and edited videos still await confirmed content.

The contact form prepares a draft in the visitor’s email application. It does not send or store submissions. There is no inventory tracking, CMS, or automatic album synchronization. Future years and entries are added by editing the data in `app.js`.

Google Fonts is optional; fallback fonts work offline. Reduced-motion preferences are respected. The site is intended for Vercel: static pages are served as-is and `api/` holds the checkout function.
