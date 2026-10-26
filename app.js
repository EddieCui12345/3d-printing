// Navigation guide: see CODE_INDEX.md for sections, functions, and debugging steps.
/* ---------- Page setup ---------- */

const page = document.body.dataset.page || 'home';
const album = 'https://photos.app.goo.gl/q1EDAYBUUZpPPJor6';
const nav = [
  ['home', 'Home'],
  ['products', 'Our creations'],
  ['story', 'Stories & memories'],
  ['about', 'About Steamoji'],
];

/* ---------- Content data ---------- */

const celebrationPhotos = [
  {
    src: 'assets/memory-2025-group.jpg',
    alt: 'Apprentices and mentors gather with a fundraising cheque at Steamoji Richmond Central',
    caption: 'The club, together.',
  },
  {
    src: 'assets/memory-2025-cheque.jpg',
    alt: 'Mentors hold a fundraising cheque supporting BC Children’s Hospital',
    caption: 'A gift with a purpose.',
  },
  {
    src: 'assets/memory-2025-certificate.jpg',
    alt: 'An apprentice holds a Steamoji certificate beside two mentors',
    caption: 'A certificate moment.',
  },
  {
    src: 'assets/memory-2025-making.jpg',
    alt: 'Apprentices gather around a laptop at the celebration',
    caption: 'Still making. Still curious.',
  },
  {
    src: 'assets/memory-2025-pink-chess.jpg',
    alt: 'An apprentice holds a pink cylindrical chess set',
    caption: 'Pink chess, ready to share.',
  },
  {
    src: 'assets/memory-2025-orange-chess.jpg',
    alt: 'An apprentice holds an orange cylindrical chess set and a small gift bag',
    caption: 'Orange chess, wrapped for play.',
  },
  {
    src: 'assets/memory-2025-blue-chess.jpg',
    alt: 'An apprentice holds a blue cylindrical chess set and extra pieces',
    caption: 'Blue chess, made to give.',
  },
  {
    src: 'assets/memory-2025-shared-chess.jpg',
    alt: 'Two apprentices and a mentor with colourful cylindrical chess sets',
    caption: 'Creations worth celebrating.',
  },
  {
    src: 'assets/memory-2025-printer.jpg',
    alt: 'A 3D printer on a workshop table at Steamoji Richmond Central',
    caption: 'Where ideas take shape.',
  },
  {
    src: 'assets/memory-2025-workshop.jpg',
    alt: 'A workshop bench with tools, filament spools, and printed parts',
    caption: 'The making table.',
  },
];
const storeMoments = celebrationPhotos.slice(4, 7);

// Add approved memories here as they become available. Keep dates and captions factual.
const memories = [
  {
    year: '2025',
    type: 'Celebration',
    title: '3D Toy Club Celebration',
    description:
      'On December 18, 2025, Richmond Central apprentices marked the year with certificates, shared cylindrical chess creations, and a fundraising moment for BC Children’s Hospital.',
    url: album,
    cover: 'assets/memory-2025-group.jpg',
    photos: celebrationPhotos,
  },
];

const processSteps = [
  ['Imagine', 'Start with a question. What would be fun to play with?'],
  ['Design', 'Sketch the idea, then explore its shape in a digital model.'],
  ['Make & test', 'Print a prototype. Try it out. Notice what could work better.'],
  ['Share', 'Tell the story behind the creation and celebrate what you learned.'],
];

/* ---------- Shared building blocks ---------- */

const arrow = '<span aria-hidden="true">↗</span>';
const button = (href, label, secondary = false) =>
  `<a class="button ${secondary ? 'secondary' : ''}" href="${href}">${label} ${arrow}</a>`;
const money = (cents) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(cents / 100);
const priceLabel = (p) => (p.price == null ? 'Prices & availability coming soon' : money(p.price));

const intro = (eyebrow, title, text) => `
  <section class="page-intro wrap">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
    <p class="lead">${text}</p>
  </section>`;

const coverImage = (p) => (p.colours ? p.colours[0].image : p.image);

function cardSwatches(p, index) {
  if (!p.colours) return '';
  const dots = p.colours.map(
    (c) =>
      `<button class="swatch small" style="--swatch:${c.swatch}" data-product="${index}" data-colour="${c.id}" aria-label="${p.name} in ${c.name}" title="${c.name}"></button>`,
  );
  return `<div class="card-swatches">${dots.join('')}<span>${p.colours.length} colours</span></div>`;
}

function productCard(p) {
  const index = products.indexOf(p);
  return `
    <article class="product-card">
      <button class="product-photo" data-product="${index}" aria-label="Explore ${p.name}">
        <img src="${coverImage(p)}" alt="${p.name}" loading="lazy">
        <span class="round-arrow">↗</span>
      </button>
      <div class="card-meta">${p.category} <span>Club collection</span></div>
      <h3><button class="text-button" data-product="${index}">${p.name}</button></h3>
      <p>${p.desc}</p>
      ${cardSwatches(p, index)}
      <small>${priceLabel(p)}</small>
    </article>`;
}

function cards(items = products) {
  return `<div class="product-grid">${items.map((p) => productCard(p)).join('')}</div>`;
}

function photoGrid(items) {
  const figures = items.map(
    (p) => `
      <figure>
        <img src="${p.src}" alt="${p.alt}" loading="lazy">
        <figcaption>${p.caption}</figcaption>
      </figure>`,
  );
  return `<div class="memory-grid">${figures.join('')}</div>`;
}

function memoryEntry(m) {
  return `
    <article class="album-card">
      <figure class="album-art"><img src="${m.cover}" alt="${m.title}"></figure>
      <div>
        <p class="eyebrow">COMMUNITY / ${m.type} / ${m.year}</p>
        <h2>${m.title}</h2>
        <p>${m.description}</p>
        ${button(m.url, 'See every photo & video', true)}
      </div>
    </article>
    ${m.photos ? photoGrid(m.photos) : ''}`;
}

const filterButtons = ['All', 'Games', 'Chess']
  .map((c, i) => `<button data-filter="${c}" aria-pressed="${i === 0}">${c}</button>`)
  .join('');

const yearOptions = [...new Set(memories.map((m) => m.year))]
  .map((y) => `<option value="${y}">${y}</option>`)
  .join('');

const stepCards = processSteps
  .map(
    ([title, text], i) => `
      <article>
        <span>0${i + 1}</span>
        <h2>${title}</h2>
        <p>${text}</p>
      </article>`,
  )
  .join('');

const cta = `
  <section class="join-banner wrap">
    <div>
      <p class="eyebrow">There’s a maker in every kid</p>
      <h2>What will you<br>dream up next?</h2>
    </div>
    <div>
      <p>Big ideas start with a little curiosity.<br>Let’s make something together.</p>
      ${button('join.html', 'Explore the club')}
    </div>
    <span class="banner-star" aria-hidden="true">✳</span>
  </section>`;

/* ---------- Header and footer ---------- */

const navLinks = nav
  .map(
    ([id, label]) =>
      `<a href="${id}.html" ${page === id ? 'aria-current="page"' : ''}>${label}</a>`,
  )
  .join('');

document.querySelector('header').innerHTML = `
  <a class="brand" href="index.html" aria-label="Steamoji Toy Club home">
    <span class="brand-mark" aria-hidden="true">s<span>•</span></span>
    <span>steamoji<small>THE 3D TOY DESIGN CLUB</small></span>
  </a>
  <button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu ☰</button>
  <nav id="navigation" aria-label="Main navigation">${navLinks}</nav>
  <button class="cart-toggle" aria-haspopup="dialog">Cart <span class="cart-count">0</span></button>
  <a class="header-join" href="join.html">Join the club ${arrow}</a>`;

document.querySelector('footer').innerHTML = `
  <div class="footer-main wrap">
    <div>
      <a class="brand" href="index.html">steamoji<span class="orange">✳</span></a>
      <p>Small makers. Big possibilities.<br>Made with imagination in Richmond, BC.</p>
    </div>
    <div>
      <strong>Keep exploring</strong>
      <a href="designers.html">Meet the designers</a>
      <a href="process.html">Behind the design</a>
      <a href="impact.html">Fundraising & impact</a>
    </div>
    <div>
      <strong>Stay connected</strong>
      <a href="events.html">News & events</a>
      <a href="contact.html">Contact the club</a>
      <a href="${album}" target="_blank" rel="noopener">Our shared photo album ↗</a>
    </div>
  </div>
  <div class="footer-bottom wrap">
    <span>© ${new Date().getFullYear()} Steamoji · Apprentices’ 3D Toy Design Club</span>
    <span>Dream it. Make it. Share it.</span>
    <a href="#top">Back to top ↑</a>
  </div>`;

/* ---------- Pages ---------- */

const pages = {
  home: `
    <section class="hero wrap">
      <div class="hero-copy">
        <p class="eyebrow"><span class="live-dot"></span> LITTLE MAKERS. BIG IMAGINATIONS.</p>
        <h1>Big ideas.<br>Little hands.<br><span class="orange">Real magic.</span><span class="drawn-star" aria-hidden="true">✳</span></h1>
        <p class="lead">Welcome to the Apprentices’ 3D Toy Design Club. A place where kids turn “what if?” into toys you can hold — and kindness you can share.</p>
        <div class="actions">
          ${button('products.html', 'Explore our creations')}
          ${button('join.html', 'Meet the club', true)}
        </div>
        <div class="hero-note"><span aria-hidden="true">♡</span> Young creators supporting BC Children’s Hospital</div>
      </div>
      <div class="hero-art">
        <div class="orbit" aria-hidden="true"></div>
        <span class="sticker sticker-top">100% imagination</span>
        <figure class="main-polaroid">
          <img src="assets/IMG_4502.png" alt="Colourful 3D-printed gonggi game pieces in a handmade set">
          <figcaption>From a bright idea → to playtime.</figcaption>
        </figure>
        <figure class="mini-polaroid">
          <img src="assets/2024-12-21_6e24a0ff606b38.webp" alt="Creative cylindrical chess boards">
          <figcaption>A new spin on chess ↗</figcaption>
        </figure>
        <span class="sticker sticker-bottom">Dream it.<br>Make it.</span>
        <span class="art-spark" aria-hidden="true">✧</span>
        <span class="art-dots" aria-hidden="true">···</span>
      </div>
    </section>
    <div class="marquee" aria-label="Imagine, design, make, play, give back"><span>IMAGINE</span>✳<span>DESIGN</span>✳<span>MAKE</span>✳<span>PLAY</span>✳<span>GIVE BACK</span>✳</div>
    <section class="section wrap">
      <div class="section-heading">
        <div>
          <p class="eyebrow">01 / MADE BY CURIOUS MINDS</p>
          <h2>Small toys.<br>Big “I made that!” energy.</h2>
        </div>
        <div>
          <p>Explore the club’s toy collection, inspired by apprentice creativity and made for a little more play.</p>
          <a class="text-link" href="products.html">See all creations ${arrow}</a>
        </div>
      </div>
      ${cards(products.slice(0, 2))}
    </section>
    <section class="about-section">
      <div class="wrap about-layout">
        <div class="workshop-photo">
          <img src="assets/memory-2025-printer.jpg" alt="A 3D printer ready for the next print at Steamoji Richmond Central" loading="lazy">
          <span class="photo-label">IDEAS BECOME REAL HERE.</span>
        </div>
        <div>
          <p class="eyebrow">02 / HELLO, WE’RE STEAMOJI</p>
          <h2>A little curiosity.<br>A world of possibility.</h2>
          <p class="lead">Steamoji helps young makers learn by doing. Through hands-on STEM projects, apprentices explore, build, solve problems, and discover what they can create.</p>
          <p>Our toy club brings that spirit to life — connecting imagination, design, and a chance to give back.</p>
          ${button('about.html', 'Get to know Steamoji', true)}
        </div>
      </div>
    </section>
    <section class="memory-teaser wrap">
      <span class="memory-symbol" aria-hidden="true">✷</span>
      <div>
        <p class="eyebrow">MORE THAN THE THINGS WE MAKE</p>
        <h2>The memories we make together.</h2>
        <p>Certificates, shared creations, and a fundraising moment from December 18, 2025. A growing scrapbook for our community, year after year.</p>
      </div>
      <a class="text-link" href="story.html">Open the scrapbook ${arrow}</a>
    </section>
    ${cta}`,

  products: `
    ${intro(
      'THE APPRENTICE COLLECTION',
      'Made to play.<br><span class="orange">Made with purpose.</span>',
      'Explore creations from the club’s collection. Every project is a chance to practise design, solve a problem, and share something playful.',
    )}
    <section class="wrap bottom-space">
      <div class="filter-bar" aria-label="Filter creations">${filterButtons}</div>
      <div id="collection">${cards()}</div>
      <div class="section-heading">
        <div>
          <p class="eyebrow">FROM THE CELEBRATION</p>
          <h2>The same creations, shared in the room.</h2>
        </div>
        <div>
          <p>Pictures from the December 18, 2025 celebration at Richmond Central, when apprentices took their cylindrical chess sets home.</p>
          <a class="text-link" href="story.html">Open the scrapbook ${arrow}</a>
        </div>
      </div>
      ${photoGrid(storeMoments)}
      <aside class="notice">
        <strong>A little play can make a difference.</strong>
        <p>The club’s fundraising initiative supports BC Children’s Hospital. Prices, stock, and purchasing details will be shared when the collection is ready for sale.</p>
        <a href="impact.html" class="text-link">Learn about the initiative ↗</a>
      </aside>
    </section>
    ${cta}`,

  about: `
    ${intro(
      'HELLO, WE’RE STEAMOJI',
      'Curiosity is<br><span class="orange">just the beginning.</span>',
      'Hands-on learning for young makers, builders, innovators, and entrepreneurs.',
    )}
    <section class="wrap split bottom-space">
      <img class="rounded-image" src="assets/memory-2025-printer.jpg" alt="A 3D printer in the Steamoji Richmond Central workshop">
      <div>
        <h2>Learning by making.</h2>
        <p>Steamoji’s project-based STEM learning gives apprentices space to explore ideas, try different solutions, and build confidence through making.</p>
        <p>The Apprentices’ 3D Toy Design Club connects that learning with real creations and a community fundraising initiative.</p>
        ${button('https://www.steamoji.com/', 'Visit the official Steamoji website', true)}
        <h3>Find your Richmond community</h3>
        <p>Connect with Richmond Central or Richmond North to ask about programs, schedules, and joining the club.</p>
        <a class="text-link" href="contact.html">Contact a Richmond location ↗</a>
      </div>
    </section>
    ${cta}`,

  story: `
    ${intro(
      'OUR COMMUNITY SCRAPBOOK',
      'Little moments.<br><span class="orange">A story that keeps growing.</span>',
      'A home for apprentice creations, fundraising events, celebrations, and the memories we make together.',
    )}
    <section class="wrap bottom-space">
      <div class="filter-bar">
        <label for="memory-year">Explore by year</label>
        <select id="memory-year">
          <option value="all">All memories</option>
          ${yearOptions}
        </select>
      </div>
      <div id="memories"></div>
      <div class="link-grid">
        <a href="designers.html">
          <span>01 / THE PEOPLE</span>
          <h3>Meet the designers ↗</h3>
          <p>Curious minds behind the creations.</p>
        </a>
        <a href="process.html">
          <span>02 / THE PROCESS</span>
          <h3>Behind the design ↗</h3>
          <p>From a first sketch to the final print.</p>
        </a>
        <a href="events.html">
          <span>03 / TOGETHER</span>
          <h3>News & events ↗</h3>
          <p>A space for celebrations and what’s next.</p>
        </a>
      </div>
    </section>
    ${cta}`,

  process: `
    ${intro(
      'BEHIND THE DESIGN',
      'From “what if?”<br><span class="orange">to “look what I made!”</span>',
      'A simple guide to how a toy idea can become something real.',
    )}
    <section class="wrap bottom-space">
      <div class="steps">${stepCards}</div>
      <aside class="notice">Workshop photos from the December 2025 celebration are in the scrapbook. Project stories and edited event videos will be added as they are ready to share.</aside>
    </section>
    ${cta}`,

  designers: `
    ${intro(
      'MEET THE DESIGNERS',
      'Every maker has<br><span class="orange">a story to tell.</span>',
      'Behind every creation is a curious apprentice with an idea worth exploring.',
    )}
    <section class="wrap bottom-space">
      <div class="notice">
        <h2>Our next chapter: the makers.</h2>
        <p>Apprentice profiles and their individual creation stories are being gathered. Come back to discover their ideas, experiments, and proudest moments.</p>
        ${button('products.html', 'Explore the creations')}
      </div>
    </section>
    ${cta}`,

  impact: `
    ${intro(
      'FUNDRAISING & IMPACT',
      'Create something playful.<br><span class="orange">Do something meaningful.</span>',
      'The club’s fundraising initiative supports BC Children’s Hospital, bringing young makers and our community together.',
    )}
    <section class="wrap split bottom-space">
      <div>
        <h2>Small creations. Shared purpose.</h2>
        <p>Apprentices can see how their creativity reaches beyond the workshop. Families and visitors can discover their work and support the initiative when sales open.</p>
        ${button('products.html', 'Browse the collection')}
      </div>
      <aside class="notice">
        <h3>Fundraising updates</h3>
        <p>Event dates, the fundraising goal, verified totals, and purchasing details will be added when confirmed.</p>
        <p>Have a question about supporting the event?</p>
        <a class="text-link" href="contact.html">Talk to the club ↗</a>
      </aside>
    </section>`,

  events: `
    ${intro(
      'NEWS & EVENTS',
      'Good things<br><span class="orange">happen together.</span>',
      'Fundraisers, celebrations, and moments worth remembering.',
    )}
    <section class="wrap bottom-space">
      <aside class="notice">
        <h2>The next gathering</h2>
        <p>New event dates and details will appear here once confirmed. Contact the club for the latest information.</p>
        ${button('contact.html', 'Ask about upcoming events', true)}
      </aside>
      <div class="section-heading">
        <h2>A look back</h2>
        <a href="story.html" class="text-link">Explore our memories ↗</a>
      </div>
      <article class="album-card">
        <figure class="album-art"><img src="assets/memory-2025-group.jpg" alt="The December 2025 3D Toy Club Celebration at Richmond Central"></figure>
        <div>
          <p class="eyebrow">18 DECEMBER 2025</p>
          <h2>3D Toy Club Celebration</h2>
          <p>Certificates, shared creations, and a fundraising moment for BC Children’s Hospital. Photos and videos from the day live in the scrapbook and the shared album.</p>
          ${button('story.html', 'See the celebration photos')}
        </div>
      </article>
    </section>`,

  thanks: `
    ${intro(
      'THANK YOU',
      'Your order is in.<br><span class="orange">Thanks for playing a part.</span>',
      'Square will email your receipt. Your purchase supports the club’s fundraising for BC Children’s Hospital.',
    )}
    <section class="wrap bottom-space">
      <aside class="notice">
        <h2>Questions about your order?</h2>
        <p>Contact the club and include the name and email you used at checkout.</p>
        <div class="actions">
          ${button('contact.html', 'Contact the club')}
          ${button('products.html', 'Back to the collection', true)}
        </div>
      </aside>
    </section>
    ${cta}`,
};

// The join and contact pages share one layout.
function contactPage() {
  const join = page === 'join';
  return `
    ${intro(
      join ? 'COME MAKE WITH US' : 'LET’S TALK',
      join
        ? 'Your next big idea<br><span class="orange">starts here.</span>'
        : 'Hello, curious minds.',
      'Parents and families: ask about club participation, programs, creations, or upcoming fundraising events.',
    )}
    <section class="wrap split bottom-space">
      <div>
        <h2>Find your people.</h2>
        <p>Choose a Richmond location and tell us what you’d like to know. The team can help with ages, schedules, and availability.</p>
        <h3>Richmond Central</h3>
        <a href="mailto:richmondcentral@steamoji.com">richmondcentral@steamoji.com</a>
        <h3>Richmond North</h3>
        <a href="mailto:richmondnorth@steamoji.com">richmondnorth@steamoji.com</a>
      </div>
      <form class="contact-form">
        <label>Your name<input name="name" required autocomplete="name"></label>
        <label>Your email<input name="email" type="email" required autocomplete="email"></label>
        <label>Location<select name="location">
          <option value="richmondcentral">Richmond Central</option>
          <option value="richmondnorth">Richmond North</option>
        </select></label>
        <label>What would you like to know?<textarea name="message" rows="4" required></textarea></label>
        <button class="button" type="submit">Prepare an email ↗</button>
        <p class="form-note">Opens a draft in your email app. Nothing is sent or stored by this website.</p>
        <p role="status"></p>
      </form>
    </section>`;
}

document.querySelector('main').innerHTML = pages[page] || contactPage();

/* ---------- Mobile menu ---------- */

const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  document.querySelector('nav').classList.toggle('open', open);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menu.setAttribute('aria-expanded', 'false');
    document.querySelector('nav').classList.remove('open');
  }
});

/* ---------- Product details and cart ---------- */

const dialog = document.createElement('dialog');
dialog.setAttribute('aria-labelledby', 'detail-title');
document.body.append(dialog);

const cartDialog = document.createElement('dialog');
cartDialog.className = 'cart-dialog';
cartDialog.setAttribute('aria-labelledby', 'cart-title');
document.body.append(cartDialog);

const cartKey = 'steamoji-cart';
const sellable = (id) => items.find((p) => p.id === id && p.price != null);

let cart = {};
try {
  cart = JSON.parse(localStorage.getItem(cartKey)) || {};
} catch {}
cart = Object.fromEntries(
  Object.entries(cart).filter(([id, qty]) => sellable(id) && Number.isInteger(qty) && qty > 0),
);

function saveCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  document.querySelector('.cart-count').textContent = count;
}

function setQty(id, qty) {
  if (qty > 0) cart[id] = Math.min(qty, 20);
  else delete cart[id];
  saveCart();
  renderCart();
}

function cartLine({ p, qty }) {
  return `
    <div class="cart-line">
      <img src="${p.image}" alt="">
      <div>
        <h3>${p.name}</h3>
        <p>${money(p.price)} each</p>
        <button class="remove-line" data-qty="${p.id}" data-value="0">Remove</button>
      </div>
      <div class="qty">
        <button data-qty="${p.id}" data-value="${qty - 1}" aria-label="One fewer ${p.name}">−</button>
        <span>${qty}</span>
        <button data-qty="${p.id}" data-value="${qty + 1}" aria-label="One more ${p.name}">+</button>
      </div>
    </div>`;
}

function renderCart() {
  const lines = Object.entries(cart).map(([id, qty]) => ({ p: sellable(id), qty }));
  const total = lines.reduce((sum, l) => sum + l.p.price * l.qty, 0);
  const contents = lines.length
    ? `
      ${lines.map(cartLine).join('')}
      <div class="cart-total"><span>Total</span><span>${money(total)}</span></div>
      <button class="button checkout">Checkout with Square ${arrow}</button>
      <p class="cart-note">You’ll pay on Square’s secure checkout page. Your purchase supports the club’s fundraising for BC Children’s Hospital.</p>
      <p class="cart-note" role="status"></p>`
    : `
      <p>Your cart is empty.</p>
      ${button('products.html', 'Browse the collection')}`;
  cartDialog.innerHTML = `
    <button class="close-dialog" aria-label="Close cart">×</button>
    <div class="cart-body">
      <h2 id="cart-title">Your cart</h2>
      ${contents}
    </div>`;
}

function colourPicker(p, colour) {
  if (!p.colours) return '';
  const swatches = p.colours.map(
    (c) =>
      `<button class="swatch" style="--swatch:${c.swatch}" data-colour="${c.id}" aria-pressed="${c === colour}" aria-label="${c.name}" title="${c.name}"></button>`,
  );
  return `
    <div class="colour-picker">
      <p>Colour: <strong class="colour-name">${colour.name}</strong></p>
      <div class="swatches" role="group" aria-label="Choose a colour">${swatches.join('')}</div>
    </div>`;
}

function productDetail(p, colourId) {
  const colour = p.colours && (p.colours.find((c) => c.id === colourId) || p.colours[0]);
  const item = colour ? items.find((i) => i.id === colour.id) : p;
  const priced = p.price != null;
  const price = priced
    ? `<strong class="dialog-price">${money(p.price)}</strong> · Pay securely with Square.`
    : 'Price and availability will be announced when sales open.';
  const addButton = priced
    ? `<button class="button" data-add="${item.id}">Add to cart ${arrow}</button>`
    : '<button class="button" disabled>Add to cart · coming soon</button>';
  return `
    <button class="close-dialog" aria-label="Close product details">×</button>
    <img src="${item.image}" alt="${item.name}">
    <div class="dialog-copy">
      <p class="eyebrow">${p.category} / CLUB COLLECTION</p>
      <h2 id="detail-title">${p.name}</h2>
      <p>${p.desc}</p>
      ${colourPicker(p, colour)}
      <p>${price}</p>
      <div class="actions">
        ${addButton}
        ${button('contact.html', 'Ask about this creation', true)}
      </div>
    </div>`;
}

async function checkout(checkoutButton) {
  const status = cartDialog.querySelector('[role="status"]');
  checkoutButton.disabled = true;
  status.textContent = 'Opening Square checkout…';
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: Object.entries(cart).map(([id, qty]) => ({ id, qty })) }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.url) throw new Error(data.error);
    location.href = data.url;
  } catch (err) {
    checkoutButton.disabled = false;
    status.textContent =
      err.message || 'Checkout is unavailable right now. Please try again or contact the club.';
  }
}

if (page === 'thanks') cart = {};
saveCart();

document.querySelector('.cart-toggle').addEventListener('click', () => {
  renderCart();
  cartDialog.showModal();
});

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-product]');
  if (!trigger) return;
  dialog.innerHTML = productDetail(products[Number(trigger.dataset.product)], trigger.dataset.colour);
  dialog.querySelector('.close-dialog').onclick = () => dialog.close();
  dialog.showModal();
});

dialog.addEventListener('click', (e) => {
  const swatch = e.target.closest('[data-colour]');
  if (swatch) {
    const item = items.find((i) => i.id === swatch.dataset.colour);
    const img = dialog.querySelector(':scope > img');
    img.src = item.image;
    img.alt = item.name;
    dialog.querySelector('.colour-name').textContent = swatch.title;
    dialog.querySelector('[data-add]')?.setAttribute('data-add', item.id);
    dialog
      .querySelectorAll('[data-colour]')
      .forEach((s) => s.setAttribute('aria-pressed', String(s === swatch)));
    return;
  }
  const add = e.target.closest('[data-add]');
  if (!add) return;
  setQty(add.dataset.add, (cart[add.dataset.add] || 0) + 1);
  dialog.close();
  cartDialog.showModal();
});

cartDialog.addEventListener('click', (e) => {
  if (e.target.closest('.close-dialog')) return cartDialog.close();
  const qtyButton = e.target.closest('[data-qty]');
  if (qtyButton) return setQty(qtyButton.dataset.qty, Number(qtyButton.dataset.value));
  const checkoutButton = e.target.closest('.checkout');
  if (checkoutButton) checkout(checkoutButton);
});

// Close either dialog when the backdrop outside it is clicked.
[dialog, cartDialog].forEach((d) =>
  d.addEventListener('click', (e) => {
    if (e.target !== d) return;
    const r = d.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      d.close();
    }
  }),
);

/* ---------- Product filters ---------- */

document.querySelectorAll('[data-filter]').forEach((b) =>
  b.addEventListener('click', () => {
    document
      .querySelectorAll('[data-filter]')
      .forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    document.querySelector('#collection').innerHTML = cards(
      products.filter((p) => b.dataset.filter === 'All' || p.category === b.dataset.filter),
    );
  }),
);

/* ---------- Memories ---------- */

function renderMemories(year = 'all') {
  document.querySelector('#memories').innerHTML = memories
    .filter((m) => year === 'all' || m.year === year)
    .map(memoryEntry)
    .join('');
}

if (page === 'story') {
  renderMemories();
  document
    .querySelector('#memory-year')
    .addEventListener('change', (e) => renderMemories(e.target.value));
}

/* ---------- Contact form ---------- */

document.querySelector('form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const recipient =
    data.get('location') === 'richmondnorth'
      ? 'richmondnorth@steamoji.com'
      : 'richmondcentral@steamoji.com';
  const body = `Hello Steamoji,\n\n${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`;
  const subject = encodeURIComponent('3D Toy Design Club enquiry');
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(body)}`;
  e.target.querySelector('[role="status"]').textContent =
    'Your email draft is ready to open. If no email app opens, use the contact address on this page.';
});
