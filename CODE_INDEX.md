# Code index

Use this map to find the code you want to edit. Search for the named function or section in your editor; these names remain useful when line numbers change.

| File | Responsibility | Where to look |
| --- | --- | --- |
| `index.html`, `home.html` | Home page shell and script loading | `<head>` and `data-page="home"` |
| Other `.html` pages | Page title, metadata, and page selection | `<title>` and the body's `data-page` attribute |
| `products.js` | Product IDs, descriptions, photos, prices | Product records; prices are in CAD cents |
| `app.js` | Page content and browser interactions | Section index below |
| `styles.css` | Colours, layout, components, responsive rules | Section comments and CSS selectors |
| `api/checkout.js` | Server-side order validation and Square checkout | Exported request handler |
| `.env.example` | Required checkout configuration | Environment variable names |
| `.prettierrc` | Formatting preferences | Two-space indentation by default; single quotes; 100-column target |
| `.editorconfig` | Shared indentation and whitespace rules | Applies in editors with EditorConfig support |
| `.vscode/settings.json` | VS Code readability and syntax validation | Line numbers, indentation guides, language modes |

## app.js sections

1. **Page setup** — selected page, album URL, and navigation entries.
2. **Content data** — `celebrationPhotos`, `memories`, `galleryPhotos`, and `processSteps`.
3. **Shared building blocks** — `money`, `productCard`, `cards`, `photoGrid`, `memoryEntry`, and the `gallery` markup.
4. **Header and footer** — shared navigation and footer HTML.
5. **Pages** — `pages` contains page templates; `contactPage` serves joining and contact.
6. **Mobile menu** — menu toggle and Escape key handling.
7. **Product details and cart** — `setQty`, `renderCart`, `productDetail`, and `checkout`.
8. **Product filters** — category button click handlers.
9. **Rotating photo gallery** — `setupGallery` handles auto-rotation, arrows, pause, and keyboard.
10. **Memories** — `renderMemories` and year selection.
11. **Contact form** — prepares an email draft on submit.

## Debugging

- Run `npm run check` to check the three application JavaScript files for syntax errors. Node.js is required; no package installation is needed. This does not check runtime behavior, HTML, or CSS.
- In VS Code, use **Ctrl+P** to open a file, **Ctrl+Shift+O** to find a function, and **Ctrl+G** to jump to a reported line number. HTML, CSS, and JavaScript use the editor's built-in syntax highlighting.
- Preview with `python -m http.server 4173 --bind 127.0.0.1`, then open `http://127.0.0.1:4173`.
- Open browser developer tools with **F12**. The **Console** shows runtime errors; click an error's file and line number to inspect it. Use the **Sources** panel to place breakpoints.
- For checkout failures, inspect `/api/checkout` in the **Network** panel and the server logs. Checkout requires Vercel or `vercel dev`; the Python preview does not run the API.
