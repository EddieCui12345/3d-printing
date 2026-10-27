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
  {
    src: 'assets/memory-game-time.jpg',
    alt: 'Two apprentices play a game on a blue Steamoji board with crosses and smiley pieces',
    caption: 'Game on, with a board the club designed.',
  },
];
const storeMoments = celebrationPhotos.slice(3, 6);

// Add approved memories here as they become available. Keep dates and captions factual.
const memories = [
  {
    year: '2025',
    type: 'Celebration',
    title: '3D Toy Club Celebration',
    description:
      'On December 18, 2025, Richmond Central apprentices marked the year with certificates, shared cylindrical chess creations, and a fundraising moment for BC Children’s Hospital.',
    url: '#gallery',
    cover: 'assets/memory-2025-club.jpg',
    photos: celebrationPhotos,
  },
];

// Photos for the rotating gallery on the Stories & memories page, stored in assets/gallery/.
const galleryPhotos = [
  ['IMG_7347.jpg', 'An apprentice smiles beside a laptop in the classroom'],
  ['IMG_7354.jpg', 'Apprentices working on laptops at their desks'],
  ['IMG_7355.jpg', 'Two apprentices work together at a laptop'],
  ['IMG_2653.jpg', 'An apprentice works on a design at a laptop'],
  ['IMG_2654.jpg', 'An apprentice at a classroom desk with a laptop'],
  ['IMG_2664.jpg', 'The Steamoji Richmond classroom during a session'],
  ['IMG_2667.jpg', 'Apprentices at work across the classroom'],
  ['IMG_2670.jpg', 'A 3D design open on a laptop screen'],
  ['IMG_2684.jpg', 'Apprentices working at their stations'],
  ['IMG_2690.jpg', 'An apprentice and a mentor at a computer'],
  ['IMG_2692.jpg', 'Two apprentices look at a laptop together'],
  ['IMG_2694.jpg', 'Apprentices and a mentor in the classroom'],
  ['IMG_2695.jpg', 'A mentor helps an apprentice at a laptop'],
  ['IMG_2696.jpg', 'A design project open on a laptop'],
  ['IMG_2831.jpg', 'An apprentice works at a laptop by the window'],
  ['IMG_2834_1.jpg', 'An apprentice builds a design on a laptop'],
  [
    'IMG_4152.jpg',
    'Apprentices and mentors hold a large cheque in front of a Small is Mighty banner',
  ],
  ['IMG_4154.jpg', 'An apprentice and a mentor beside a Small is Mighty banner'],
  ['IMG_4162.jpg', 'An apprentice holds a large cheque and a 3D-printed creation'],
  ['IMG_4166.jpg', 'An apprentice shows a cheque and a 3D-printed creation'],
  ['IMG_4739.jpg', 'The classroom set up for a session'],
  ['IMG_4745.jpg', 'An apprentice works at a laptop'],
  ['IMG_4748.jpg', 'An apprentice works on a laptop beside handwritten notes'],
  ['IMG_5214.jpg', 'An apprentice works on a laptop beside classmates'],
  ['IMG_5216.jpg', 'Apprentices working at their computers'],
  ['P2800165.jpg', 'An apprentice receives a certificate from mentors'],
  ['P2800170.jpg', 'An apprentice proudly holds a certificate with mentors'],
  ['P2800173.jpg', 'An apprentice in a pink jacket holds a certificate'],
  ['P2800179.jpg', 'An apprentice holds a certificate beside mentors'],
  ['P2800184.jpg', 'An apprentice in a WOOF! sweater holds a certificate'],
  ['P2800190.jpg', 'An apprentice in blue holds a certificate'],
  ['P2800195.jpg', 'An apprentice celebrates with a certificate and mentors'],
  ['P2800199.jpg', 'Mentors and staff at the December 2025 celebration'],
  ['P2800201.jpg', 'Mentors and staff together at the celebration'],
  ['P2800205.jpg', 'Mentors hold the fundraising cheque for BC Children’s Hospital'],
  ['P2800222.jpg', 'An apprentice holds a certificate with mentors'],
  ['P2800237.jpg', 'Apprentices and mentors gather with the fundraising cheque'],
  ['P2800250.jpg', 'The whole club cheers with the fundraising cheque'],
  ['P2800256.jpg', 'Apprentices share a laptop at the celebration'],
  ['P2800275.jpg', 'An apprentice holds a cylindrical chess set'],
  ['P2800278.jpg', 'An apprentice and family with a cylindrical chess set'],
  ['P2800288.jpg', 'Two apprentices and a parent with their chess sets'],
  ['P2800293.jpg', 'An apprentice and family hold colourful chess sets'],
  ['P2800317.jpg', 'A family in front of the Steamoji wall'],
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

const intro = (eyebrow, title, text, extra = '') => `
  <section class="page-intro wrap">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
    <p class="lead">${text}</p>
    ${extra}
  </section>`;

const charityBadge = `
  <a class="charity-badge" href="https://www.bcchf.ca/" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.1 5.3 3 1.7-1.9 3.2-3 5.3-3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>
    <span><small>Proudly supporting</small>BC Children’s Hospital Foundation</span>
  </a>`;

const focusStyle = (p) => (p.focus ? ` style="object-position:${p.focus}"` : '');

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
        <img src="${p.image}" alt="${p.name}" loading="lazy"${focusStyle(p)}>
        <span class="maker-badge">Kid-made · tiny quirks included</span>
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
  if (!items.length) {
    return '<p class="empty-note">New creations are on the way. Check back soon.</p>';
  }
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

const gallery = `
  <section class="gallery" id="gallery" aria-roledescription="carousel" aria-label="Photo gallery">
    <div class="section-heading">
      <div>
        <p class="eyebrow">INSIDE THE ACADEMY</p>
        <h2>Our photo gallery.</h2>
      </div>
      <div>
        <p>Classes, projects, and celebrations at Steamoji Richmond. Photos change every few seconds; hover or press pause to stop.</p>
      </div>
    </div>
    <div class="gallery-stage">
      <img class="gallery-image" src="assets/gallery/${galleryPhotos[0][0]}" alt="${galleryPhotos[0][1]}">
      <button class="gallery-nav prev" aria-label="Previous photo">←</button>
      <button class="gallery-nav next" aria-label="Next photo">→</button>
      <div class="gallery-bar">
        <p class="gallery-caption" aria-live="off">${galleryPhotos[0][1]}</p>
        <span class="gallery-count">1 / ${galleryPhotos.length}</span>
        <button class="gallery-pause" aria-pressed="false">Pause</button>
      </div>
    </div>
  </section>`;

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
    <svg class="banner-mark" viewBox="0 0 64 64" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <rect x="6" y="6" width="52" height="52" rx="18"/>
        <circle cx="22" cy="26" r="3.5" fill="currentColor" stroke="none"/>
        <path d="M36 26q4.5-5 9 0"/>
        <path d="M19 37q13 13 26 0"/>
      </g>
    </svg>
  </section>`;

/* ---------- Header and footer ---------- */

const navLinks = nav
  .map(
    ([id, label]) =>
      `<a href="${id}.html" ${page === id ? 'aria-current="page"' : ''}>${label}</a>`,
  )
  .join('');

const brand = `
  <a class="brand" href="index.html" aria-label="Steamoji Richmond Academy home">
    <img class="brand-logo" src="assets/logo-badge-180.png" alt="">
    <span class="brand-text" aria-hidden="true">
      <span class="brand-name">steam<span>oji</span></span>
      <span class="brand-tag">RICHMOND ACADEMY</span>
    </span>
  </a>`;

document.querySelector('header').innerHTML = `
  ${brand}
  <button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu ☰</button>
  <nav id="navigation" aria-label="Main navigation">${navLinks}</nav>
  <div class="header-actions">
    <button class="cart-toggle" aria-haspopup="dialog">Cart <span class="cart-count">0</span></button>
    <a class="header-join" href="join.html">Join the club ${arrow}</a>
  </div>`;

document.querySelector('footer').innerHTML = `
  <div class="footer-main wrap">
    <div>
      ${brand}
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
        <h1>Big ideas.<br>Little hands.<br><span class="accent">Real magic.</span><span class="drawn-star" aria-hidden="true">✳</span></h1>
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
          <img src="assets/gallery/P2800293.jpg" alt="An apprentice and family hold the blue and pink cylindrical chess sets the club designed">
          <figcaption>From a bright idea → to playtime.</figcaption>
        </figure>
        <figure class="mini-polaroid">
          <img src="assets/memory-2025-shared-chess.jpg" alt="Two apprentices hold their orange and black cylindrical chess sets">
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
          <img src="assets/workshop-printers.jpg" alt="Two 3D printers in the Steamoji Richmond maker room, beside a colourful pegboard wall of printed shelves" loading="lazy">
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
      <figure class="memory-snap">
        <img src="assets/gallery/P2800237.jpg" alt="Apprentices and teachers celebrating together on December 18, 2025" loading="lazy">
      </figure>
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
      'Made to play.<br><span class="accent">Made with purpose.</span>',
      'Explore creations from the club’s collection. Every project is a chance to practise design, solve a problem, and share something playful.',
    )}
    <section class="wrap bottom-space">
      <div class="section-heading">
        <div>
          <p class="eyebrow">SHOP THE COLLECTION</p>
          <h2>Toys made by our apprentices.</h2>
        </div>
      </div>
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
      'Curiosity is<br><span class="accent">just the beginning.</span>',
      'Hands-on learning for young makers, builders, innovators, and entrepreneurs.',
    )}
    <section class="wrap split bottom-space">
      <img class="rounded-image" src="assets/workshop-printers.jpg" style="object-position:center 68%" alt="Two 3D printers in the Steamoji Richmond maker room, beside a colourful pegboard wall of printed shelves">
      <div>
        <h2>Learning by making.</h2>
        <p>Steamoji’s project-based STEM learning gives apprentices space to explore ideas, try different solutions, and build confidence through making.</p>
        <p>The Apprentices’ 3D Toy Design Club connects that learning with real creations and a community fundraising initiative.</p>
        ${button('https://www.steamoji.com/canada-bc-richmond-central', 'Visit Steamoji Richmond Central', true)}
        <h3>Find your Richmond community</h3>
        <p>Connect with Richmond Central or Richmond North to ask about programs, schedules, and joining the club.</p>
        <a class="text-link" href="contact.html">Contact a Richmond location ↗</a>
      </div>
    </section>
    ${cta}`,

  story: `
    ${intro(
      'OUR COMMUNITY SCRAPBOOK',
      'Little moments.<br><span class="accent">A story that keeps growing.</span>',
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
      ${gallery}
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
      'From “what if?”<br><span class="accent">to “look what I made!”</span>',
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
      'Every maker has<br><span class="accent">a story to tell.</span>',
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
      'Create something playful.<br><span class="accent">Do something meaningful.</span>',
      'The club’s fundraising initiative supports BC Children’s Hospital, bringing young makers and our community together.',
      charityBadge,
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
      'Good things<br><span class="accent">happen together.</span>',
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
        <figure class="album-art"><img src="assets/memory-2025-club.jpg" alt="The December 2025 3D Toy Club Celebration at Richmond Central"></figure>
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
      'Your order is in.<br><span class="accent">Thanks for playing a part.</span>',
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
        ? 'Your next big idea<br><span class="accent">starts here.</span>'
        : 'Hello, curious minds.',
      'Parents and families: ask about club participation, programs, creations, or upcoming fundraising events.',
    )}
    <section class="wrap split bottom-space">
      <div>
        <h2>Find your people.</h2>
        <p>Choose a Richmond location and tell us what you’d like to know. The team can help with ages, schedules, and availability.</p>
        <address class="location-card">
          <h3>Richmond Central</h3>
          <a href="https://www.google.com/maps/search/?api=1&query=140-8031+Williams+Road+Richmond+BC+V7A+1G4" target="_blank" rel="noopener">140-8031 Williams Road<br>Richmond, BC V7A 1G4</a>
          <a href="tel:+16044478999">(604) 447-8999</a>
          <a href="mailto:richmondcentral@steamoji.com">richmondcentral@steamoji.com</a>
        </address>
        <address class="location-card">
          <h3>Richmond North</h3>
          <a href="https://www.google.com/maps/search/?api=1&query=116-4940+No.+3+Road+Richmond+BC+V6X+3A5" target="_blank" rel="noopener">116-4940 No. 3 Road<br>Richmond, BC V6X 3A5</a>
          <a href="tel:+16042732555">(604) 273-2555</a>
          <a href="mailto:richmondnorth@steamoji.com">richmondnorth@steamoji.com</a>
        </address>
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
      <img src="${p.thumb || p.image}" alt=""${p.thumb ? '' : focusStyle(p)}>
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

function photoThumbs(p) {
  const buttons = p.photos.map(
    (src, i) =>
      `<button class="photo-thumb" data-photo="${src}" aria-pressed="${i === 0}" aria-label="Show photo ${i + 1} of ${p.photos.length}"><img src="${src}" alt=""></button>`,
  );
  return `<div class="photo-thumbs" role="group" aria-label="More photos">${buttons.join('')}</div>`;
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
  const image = colour?.photo
    ? `<img src="${colour.photo}" alt="${p.name} in ${colour.name}">`
    : `<img src="${p.image}" alt="${p.colours ? `${p.name} in all ${p.colours.length} colours` : p.name}"${focusStyle(p)}>`;
  const thumbs = p.photos?.length > 1 ? photoThumbs(p) : '';
  return `
    <button class="close-dialog" aria-label="Close product details">×</button>
    ${image}
    ${thumbs}
    <div class="dialog-copy">
      <p class="eyebrow">${p.category} / CLUB COLLECTION</p>
      <h2 id="detail-title">${p.name}</h2>
      <p>${p.desc}</p>
      ${colourPicker(p, colour)}
      <p class="maker-note">Designed and 3D-printed by our young apprentices, so every piece is one of a kind. Small marks, lines, or colour differences are part of the charm.</p>
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
  dialog.innerHTML = productDetail(
    products[Number(trigger.dataset.product)],
    trigger.dataset.colour,
  );
  dialog.querySelector('.close-dialog').onclick = () => dialog.close();
  dialog.showModal();
});

dialog.addEventListener('click', (e) => {
  const thumb = e.target.closest('[data-photo]');
  if (thumb) {
    dialog.querySelector(':scope > img').src = thumb.dataset.photo;
    dialog
      .querySelectorAll('[data-photo]')
      .forEach((t) => t.setAttribute('aria-pressed', String(t === thumb)));
    return;
  }
  const swatch = e.target.closest('[data-colour]');
  if (swatch) {
    const choice = items.find((i) => i.id === swatch.dataset.colour);
    const photo = dialog.querySelector(':scope > img');
    if (choice?.photo && photo) {
      photo.src = choice.photo;
      photo.alt = choice.name;
      photo.removeAttribute('style');
    }
    dialog.querySelector('.colour-name').textContent = swatch.title;
    dialog.querySelector('[data-add]')?.setAttribute('data-add', swatch.dataset.colour);
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

/* ---------- Rotating photo gallery ---------- */

function setupGallery(root) {
  const img = root.querySelector('.gallery-image');
  const caption = root.querySelector('.gallery-caption');
  const count = root.querySelector('.gallery-count');
  const pauseButton = root.querySelector('.gallery-pause');
  const photoUrl = (i) => `assets/gallery/${galleryPhotos[i][0]}`;
  let index = 0;
  let timer = null;
  let held = false;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(i) {
    index = (i + galleryPhotos.length) % galleryPhotos.length;
    const [, alt] = galleryPhotos[index];
    img.classList.add('fading');
    setTimeout(() => {
      img.src = photoUrl(index);
      img.alt = alt;
    }, 200);
    caption.textContent = alt;
    count.textContent = `${index + 1} / ${galleryPhotos.length}`;
    root.style.setProperty('--tilt', index % 2 ? '1.2deg' : '-1.2deg');
    new Image().src = photoUrl((index + 1) % galleryPhotos.length);
  }

  function restart() {
    clearInterval(timer);
    if (!paused && !held) timer = setInterval(() => show(index + 1), 4500);
  }

  function setPaused(value) {
    paused = value;
    pauseButton.textContent = paused ? 'Play' : 'Pause';
    pauseButton.setAttribute('aria-pressed', String(paused));
    caption.setAttribute('aria-live', paused ? 'polite' : 'off');
    restart();
  }

  img.addEventListener('load', () => img.classList.remove('fading'));
  root.querySelector('.prev').addEventListener('click', () => {
    show(index - 1);
    restart();
  });
  root.querySelector('.next').addEventListener('click', () => {
    show(index + 1);
    restart();
  });
  pauseButton.addEventListener('click', () => setPaused(!paused));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  const hold = (value) => () => {
    held = value;
    restart();
  };
  root.addEventListener('mouseenter', hold(true));
  root.addEventListener('mouseleave', hold(false));
  root.addEventListener('focusin', hold(true));
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget)) hold(false)();
  });

  setPaused(paused);
  new Image().src = photoUrl(1);
}

const galleryRoot = document.querySelector('.gallery');
if (galleryRoot) setupGallery(galleryRoot);

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
