# Steamoji website

A local front-end concept built with HTML, CSS, and vanilla JavaScript. No framework, package installation, or build step is needed.

## Open the site

Open `index.html` in your browser, or run `python -m http.server 4173 --bind 127.0.0.1` from this folder and visit `http://127.0.0.1:4173`.

## Files

- `index.html` and `home.html`: homepage entry points.
- `products.html`, `story.html`, `about.html`, `contact.html`: other page entry points.
- `styles.css`: shared styling and mobile layouts.
- `app.js`: page content, navigation, collection filters, details dialogs, email draft, and canvas sculpture.
- `assets/form-studies.png`: original AI-generated conceptual artwork. It is explicitly labeled as a concept in the collection.

The other photographs came from the original project. Google Fonts is optional; system fonts are used if it is unavailable.

## Front-end behavior

The contact form prepares a draft in the visitor's email app. It does not send messages or store submissions. The site has no checkout, backend, or inventory system.

The business contact details are retained from the original homepage. Final maker biography and positioning still need the project owner's wording.

## Verification

JavaScript syntax and local HTTP response checked. Browser checks covered desktop and narrow mobile layouts, collection filtering, opening a details dialog, mobile menu expansion, and sculpture color selection.
