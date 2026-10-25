# Steamoji Apprentices’ 3D Toy Design Club

A responsive static website using HTML, CSS, and vanilla JavaScript. No build or package installation is required.

## Preview

Run `python -m http.server 4173 --bind 127.0.0.1` in this folder and open http://127.0.0.1:4173.

## Content and maintenance

- `app.js` contains shared navigation, page content, product records, and memory records.
- Add products to `products` with a name, category, image path, and description. Update the filter choices if introducing new categories.
- Add approved community entries to `memories` with `year`, `type`, `title`, `description`, `url`, `cover`, and optional `photos`. The year filter updates automatically.
- Store new approved images in `assets/`. Use factual captions and accessible image descriptions. Keep original media backups.
- Dedicated pages cover creations, memories, designers, process, impact, events, about, joining, and contact. `index.html` and `home.html` both show the homepage.
- Selected photos from the December 18, 2025 Richmond Central celebration are stored in `assets/` and shown on the creations and memories pages. The full album, including videos, remains linked. Prices, availability, fundraising totals, apprentice profiles, and edited videos still await confirmed content.

The contact form prepares a draft in the visitor’s email application. It does not send or store submissions. There is no checkout, inventory, CMS, or automatic album synchronization. Future years and entries are added by editing the data in `app.js`.

Google Fonts is optional; fallback fonts work offline. Reduced-motion preferences are respected. No deployment is configured in this repository.
