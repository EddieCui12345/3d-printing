// 1. PAGE SETUP
// Each HTML file sets data-page on <body>. This selects the content below.
const page = document.body.dataset.page;

// Shared navigation links: [HTML filename without extension, visible label].
const links = [
  ['home', 'Home'],
  ['products', 'Explore prints'],
  ['story', 'How it works'],
  ['about', 'Visit us']
];

// Build the shared header. aria-current identifies the active page.
// Backticks create HTML templates; ${...} inserts a JavaScript value.
document.querySelector('header').innerHTML = `<a class="brand" href="home.html" aria-label="Steamoji home">
    <span class="brand-icon" aria-hidden="true">✳</span>
    <span>steamoji<small>3D PRINT LAB</small>
    </span>
  </a>
  <button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu +</button>
  <nav id="navigation" aria-label="Main navigation">${links.map(([id, label]) => `<a href="${id}.html" ${page === id ? 'aria-current="page"' : ''}>${label}</a>`).join('')}<a href="contact.html" ${page === 'contact' ? 'aria-current="page"' : ''}>Contact</a>
  </nav>
  <a class="nav-cta" href="contact.html">Got an idea? <span>↗</span>
  </a>`;

// Location details are reused on the contact page and in the footer.
const locations = `<div>
    <h3>Richmond Central</h3>
    <p>140-8031 Williams Road<br>Richmond, BC · V7A 1G4</p>
    <a href="tel:+16044478999">(604) 447-8999</a>
    <br>
    <a href="mailto:richmondcentral@steamoji.com">richmondcentral@steamoji.com</a>
  </div>
  <div>
    <h3>Richmond North</h3>
    <p>116-4940 No. 3 Road<br>Richmond, BC · V6X 3A5</p>
    <a href="tel:+16042732555">(604) 273-2555</a>
    <br>
    <a href="mailto:richmondnorth@steamoji.com">richmondnorth@steamoji.com</a>
  </div>`;

// Keep the footer consistent across pages, with the current year.
document.querySelector('footer').innerHTML = `<div class="footer-top">
    <div>
      <a class="brand" href="home.html">✳ steamoji</a>
      <p style="margin-top:16px">Made with curiosity (and a few do-overs).</p>
    </div>${locations}</div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} Steamoji 3D Print Studio</span>
    <span>Keep learning. Keep making.</span>
    <a href="#top">Back to top ↑</a>
  </div>`;

// 2. PRODUCT DATA AND REUSABLE SECTIONS
// Edit these objects to change the names, images, categories, and descriptions.
const products = [{
  name: 'Chess with a twist',
  category: 'Play',
  image: '2024-12-21_6e24a0ff606b38.webp',
  desc: 'A cylindrical take on a familiar game. Explore the chess design and contact the studio to discuss availability and options.'
}, {
  name: 'Colorful gonggi games',
  category: 'Play',
  image: 'IMG_4502.png',
  desc: 'A colorful gonggi set that brings playful forms into the palm of your hand. Ask the studio about this design.'
}, {
  name: 'Imagine the possibilities',
  category: 'Explore',
  image: 'assets/form-studies.png',
  desc: 'AI-generated concept artwork exploring texture, color, and sculptural form. These imagined objects are inspiration, not products offered for sale. Bring your own idea to the studio to explore what could be made.'
}];

// Return the collection HTML. Each data-product holds an index into products.
// Both the image and its Explore button open the same product details.
function cards() {
  return `
    <section class="carousel" aria-label="Print gallery" aria-roledescription="carousel">
      <div class="collection">${products.map((p, i) => `<article class="product" data-category="${p.category}" aria-roledescription="slide" aria-label="${i + 1} of ${products.length}" ${i > 0 ? 'hidden' : ''}>
    <button class="product-image" data-product="${i}" aria-label="Take a closer look at ${p.name}">
      <img src="${p.image}" alt="${['Cylindrical chess boards in cream and black', 'Colorful printed gonggi game pieces', 'Concept artwork of orange, sage, and ivory printed sculptures'][i]}" loading="lazy">
    </button>
    <div class="product-info">
      <div>
        <h3>${p.name}</h3>
        <p>${i === 2 ? 'Dream shapes · AI concept art' : 'Take a closer look together'}</p>
      </div>
      <button class="round-link" data-product="${i}" aria-label="Explore ${p.name}">Explore ↗</button>
    </div>
  </article>`).join('')}</div>
      <div class="carousel-controls">
        <button class="carousel-arrow" data-direction="-1" aria-label="Previous image">←</button>
        <p class="carousel-status" aria-live="polite" aria-atomic="true">1 / ${products.length}</p>
        <button class="carousel-arrow" data-direction="1" aria-label="Next image">→</button>
      </div>
    </section>`;
}

// These HTML sections are reused by several pages.
const steps = `<section class="section">
    <div class="eyebrow">HOW DOES 3D PRINTING WORK?</div>
    <div class="section-heading">
      <h2>A little idea.<br>A big adventure.</h2>
      <span class="eyebrow">ONE LAYER AT A TIME</span>
    </div>
    <div class="steps">
      <article class="step">
        <span>01 / IMAGINE</span>
        <h3>Imagine it.</h3>
        <p>A game? A funny shape? Start with a drawing or something you would love to make.</p>
      </article>
      <article class="step">
        <span>02 / EXPLORE</span>
        <h3>Design it.</h3>
        <p>Turn the idea into a shape on a screen. Think about its size, color, and all the little details.</p>
      </article>
      <article class="step">
        <span>03 / MAKE</span>
        <h3>Watch it grow!</h3>
        <p>The printer adds one tiny layer at a time. Together, those layers become a real object!</p>
      </article>
    </div>
  </section>`;
const closing = `<section class="closing">
    <h2>Got a big idea?<br>Let’s talk!</h2>
    <a class="button" href="contact.html">Ask us a question <span>↗</span>
    </a>
  </section>`;
const feature = `<section class="feature">
    <img class="feature-image" src="3d printing img.webp" alt="An orange geometric form being 3D printed" loading="lazy">
    <div class="feature-copy">
      <div class="eyebrow">A LITTLE WONDER FOR THE WHOLE FAMILY</div>
      <h2>“Wow! How did<br>it make that?”</h2>
      <p>A 3D printer turns a digital design into something you can hold. For kids, it’s a world of “what if?” For parents, it’s a fun way to explore creativity and problem-solving together.</p>
      <a class="text-link" href="story.html">See how it works ↗</a>
    </div>
  </section>`;

// 3. PAGE CONTENT
// Only the branch matching body data-page fills the <main> element.
const main = document.querySelector('main');
if (page === 'home') main.innerHTML = `<section class="hero">
    <div class="hero-copy">
      <div class="eyebrow">
        <span class="dot">
        </span> FOR CURIOUS KIDS & GROWN-UPS</div>
      <h1>Big ideas.<br>Real things.<br>
        <em>More fun.</em>
      </h1>
      <p class="intro">Discover colorful games and amazing shapes. Explore the world of 3D printing together—one fun idea at a time.</p>
      <div class="hero-actions">
        <a class="button primary" href="products.html">Find your favorite <span>↗</span>
        </a>
        <a class="text-link" href="#process">How does it work? ↘</a>
      </div>
    </div>
    <div class="hero-art">
      <span class="maker-sticker" aria-hidden="true">100%<br>curiosity!<i>✦</i>
      </span>
      <canvas id="sculpture" role="img" aria-label="Interactive layered sculpture. Choose a color using the buttons below.">
      </canvas>
      <div class="art-tag">A SHAPE YOU CAN CHANGE!<br>Try the colors below.</div>
      <div class="art-caption">
        <span>PICK A COLOR →</span>
        <div class="swatches" aria-label="Sculpture color">
          <button class="swatch" style="--swatch:#e85527" data-color="orange" aria-label="Terracotta" aria-pressed="true">
          </button>
          <button class="swatch" style="--swatch:#747e59" data-color="sage" aria-label="Sage" aria-pressed="false">
          </button>
          <button class="swatch" style="--swatch:#657f92" data-color="blue" aria-label="Slate blue" aria-pressed="false">
          </button>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <span>BIG CURIOSITY STARTS HERE.</span>
      <a href="#collection">MORE COOL STUFF ↓</a>
    </div>
  </section>
  <div class="ticker">
    <span>IMAGINE IT</span>
    <span>SHAPE IT</span>
    <span>MAKE IT REAL</span>
    <span>REPEAT</span>
  </div>
  <section class="section" id="collection">
    <div class="eyebrow">PICK SOMETHING THAT MAKES YOU SMILE</div>
    <div class="section-heading">
      <h2>Little things.<br>Big smiles.</h2>
      <a class="text-link" href="products.html">See everything ↗</a>
    </div>${cards()}</section>${feature}<div id="process">${steps}</div>${closing}`;
if (page === 'products') main.innerHTML = `<section class="page-head">
    <div class="eyebrow">THE PRINT SHELF</div>
    <h1>Find your next<br>
      <em>favorite thing.</em>
    </h1>
    <p class="intro">Games to discover. Shapes to wonder about. Pick a picture and take a closer look together.</p>
  </section>
  <section class="section" style="padding-top:20px">
    <div class="filters" aria-label="Filter collection">${['All objects', 'Play', 'Explore'].map((s, i) => `<button class="filter" aria-pressed="${i === 0}" data-filter="${s}">${s}</button>`).join('')}</div>${cards()}<p class="form-note">A showcase of print possibilities. Contact the studio for availability and project details.</p>
  </section>${closing}`;
if (page === 'story') main.innerHTML = `<section class="page-head">
    <div class="eyebrow">BEHIND THE PRINTS</div>
    <h1>It starts with<br>
      <em>“what if?”</em>
    </h1>
    <p class="intro">What if an idea could leave the page? What if a familiar object could become something unexpected?</p>
  </section>${feature}${steps}${closing}`;
if (page === 'about') main.innerHTML = `<section class="page-head">
    <div class="eyebrow">THE LAB / STEAMOJI</div>
    <h1>Curiosity<br>
      <em>lives here.</em>
    </h1>
    <p class="intro">Explore 3D printing with Steamoji in Richmond. Bring your curiosity and start a conversation about what you want to make.</p>
  </section>${steps}<section class="section feature">
    <div>
      <div class="eyebrow">FIND US IN RICHMOND</div>
      <h2 style="margin-top:20px">Two locations.<br>One curious spirit.</h2>
    </div>
    <div class="contact-details">${locations}</div>
  </section>${closing}`;
if (page === 'contact') main.innerHTML = `<section class="page-head">
    <div class="eyebrow">GOT A “WHAT IF”?</div>
    <h1>Let’s talk<br>
      <em>cool ideas.</em>
    </h1>
  </section>
  <section class="contact-layout">
    <div class="contact-details">
      <p>Parents and curious makers: ask about a print, share an idea, or contact your nearest Steamoji location.</p>${locations}</div>
    <form class="contact-form">
      <label>Your name<input name="name" autocomplete="name" required placeholder="Alex Chen">
      </label>
      <label>Email address<input name="email" type="email" autocomplete="email" required placeholder="you@example.com">
      </label>
      <label>Studio<select name="studio">
          <option value="richmondcentral">Richmond Central</option>
          <option value="richmondnorth">Richmond North</option>
        </select>
      </label>
      <label>What are you imagining?<textarea name="idea" required placeholder="A playful object, a new prototype, a question…">
        </textarea>
      </label>
      <button class="button primary" type="submit">Prepare email <span>↗</span>
      </button>
      <p class="form-note" role="status">This opens your email app with a draft. Nothing is sent from this website.</p>
    </form>
  </section>`;

// 4. MOBILE MENU
// Update both the visible menu and its expanded state for screen readers.
document.querySelector('.menu-toggle').addEventListener('click', e => {
  const open = e.currentTarget.getAttribute('aria-expanded') !== 'true';
  e.currentTarget.setAttribute('aria-expanded', open);
  e.currentTarget.textContent = open ? 'Close −' : 'Menu +';
  document.querySelector('nav').classList.toggle('open', open);
});

// 5. IMAGE CAROUSEL AND COLLECTION FILTERS
// Show one large picture at a time. No automatic movement: visitors set the pace.
const carousel = document.querySelector('.carousel');

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll('.product'));
  const arrows = carousel.querySelectorAll('[data-direction]');
  const status = carousel.querySelector('.carousel-status');
  let matchingSlides = slides;
  let currentSlide = 0;

  // Wrap around at either end, and hide inactive slides from keyboard navigation.
  function showSlide(index) {
    currentSlide = (index + matchingSlides.length) % matchingSlides.length;
    slides.forEach(slide => {
      slide.hidden = slide !== matchingSlides[currentSlide];
    });
    matchingSlides[currentSlide].setAttribute(
      'aria-label',
      `${currentSlide + 1} of ${matchingSlides.length}`
    );
    status.textContent = `${currentSlide + 1} / ${matchingSlides.length}`;
    arrows.forEach(arrow => {
      arrow.disabled = matchingSlides.length < 2;
    });
  }

  arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      showSlide(currentSlide + Number(arrow.dataset.direction));
    });
  });

  // Arrow keys work while focus is on an image or a control inside the gallery.
  carousel.addEventListener('keydown', event => {
    if (matchingSlides.length < 2) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      showSlide(currentSlide + direction);
      // Keep focus on a visible control if the focused slide has just disappeared.
      carousel.querySelector(`[data-direction="${direction}"]`).focus();
    }
  });

  // On the collection page, filters limit the pictures available in the carousel.
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(filter => {
        filter.setAttribute('aria-pressed', filter === button);
      });
      matchingSlides = slides.filter(slide => {
        return button.dataset.filter === 'All objects' ||
          slide.dataset.category === button.dataset.filter;
      });
      showSlide(0);
    });
  });
}

// 6. PRODUCT DETAILS
// Reuse one native dialog. showModal() handles focus and the Escape key.
const dialog = document.createElement('dialog');
document.body.append(dialog);
document.querySelectorAll('[data-product]').forEach(b => b.addEventListener('click', () => {
  const p = products[+b.dataset.product];
  dialog.innerHTML = `<button class="close" aria-label="Close details">×</button>
  <div class="eyebrow">${p.category} / PRINT POSSIBILITIES</div>
  <img src="${p.image}" alt="${p.name}">
  <h2 id="detail-title">${p.name}</h2>
  <p>${p.desc}</p>
  <a class="button primary" href="contact.html">Ask the studio ↗</a>`;
  dialog.setAttribute('aria-labelledby', 'detail-title');
  dialog.querySelector('.close').onclick = () => dialog.close();
  dialog.showModal();
}));

// Close on a click outside the dialog box, but not on its empty interior.
dialog.addEventListener('click', e => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  }
});

// 7. CONTACT FORM
// Optional chaining (?.) skips this on pages without a form.
// Prepare a mailto draft; this website does not send or store submissions.
document.querySelector('form')?.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const body = `Hello Steamoji,\n\n${data.get('idea')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`;
  location.href = `mailto:${data.get('studio')}@steamoji.com?subject=${encodeURIComponent('A new 3D printing idea')}&body=${encodeURIComponent(body)}`;
  document.querySelector('[role=status]').textContent = 'Your email draft is ready in your email app. Review it there and send when ready.';
});

// 8. INTERACTIVE HOMEPAGE SCULPTURE
// The canvas exists only on the homepage. Its 2D ellipses mimic print layers.
const canvas = document.querySelector('canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let color = [232, 85, 39],
    angle = 0,
    target = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  // Redraw at the displayed size. Cap pixel density at 2 for performance.
  function draw() {
    const rect = canvas.getBoundingClientRect(),
      dpr = Math.min(devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }
    // Reset the drawing transform before clearing and scaling the canvas.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    const scale = Math.min(rect.width / 650, rect.height / 600);
    ctx.save();
    ctx.translate(rect.width * .51, rect.height * .49);
    ctx.scale(scale, scale);
    ctx.rotate(-.22 + angle * .08);
    // Paint a soft ground shadow underneath the sculpture.
    const shadow = ctx.createRadialGradient(0, 225, 10, 0, 225, 205);
    shadow.addColorStop(0, '#55583d35');
    shadow.addColorStop(1, '#55583d00');
    ctx.fillStyle = shadow;
    ctx.save();
    ctx.scale(1, .28);
    ctx.fillRect(-260, 530, 520, 650);
    ctx.restore();
    // Draw 100 stacked ellipses, from the bottom to the top.
    // t is the layer progress (0 to 1); y, r, and dx set height, radius, and offset.
    for (let i = 0; i < 100; i++) {
      const t = i / 99,
        y = 190 - t * 365,
        r = 105 + 55 * Math.sin(t * Math.PI * 2 - .7) + 25 * t,
        dx = Math.sin(t * Math.PI * 2 + angle) * 24;
      ctx.beginPath();
      ctx.ellipse(dx, y, r, r * .31, 0, 0, Math.PI * 2);
      // Shade each layer from dark to light to suggest a curved surface.
      const grad = ctx.createLinearGradient(dx - r, 0, dx + r, 0);
      grad.addColorStop(0, `rgb(${color.map(v => Math.round(v * .65)).join(',')})`);
      grad.addColorStop(.38, `rgb(${color.map(v => Math.min(255, Math.round(v * 1.13))).join(',')})`);
      grad.addColorStop(1, `rgb(${color.map(v => Math.round(v * .8)).join(',')})`);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(85,36,13,.35)';
      ctx.lineWidth = 1.1;
      ctx.stroke();
      // The top layer has a dark inset to suggest a hollow opening.
      if (i === 99) {
        ctx.beginPath();
        ctx.ellipse(dx, y, r - 12, (r - 12) * .31, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${color.map(v => Math.round(v * .36)).join(',')})`;
        ctx.fill();
      }
    }
    ctx.restore();
  }

  // Ease toward the pointer angle, then stop requesting frames when settled.
  let frame = 0;
  function animate() {
    angle += (target - angle) * .07;
    draw();
    if (Math.abs(target - angle) > .001) {
      frame = requestAnimationFrame(animate);
    } else {
      frame = 0;
    }
  }
  // Respect reduced-motion preferences when responding to pointer movement.
  canvas.addEventListener('pointermove', e => {
    if (reduced.matches) return;
    target = (e.clientX / canvas.getBoundingClientRect().width - .5) * 1.8;
    if (!frame) frame = requestAnimationFrame(animate);
  });
  canvas.addEventListener('pointerleave', () => {
    target = 0;
    if (!frame) frame = requestAnimationFrame(animate);
  });
  // Redraw when the layout changes, including mobile orientation changes.
  new ResizeObserver(draw).observe(canvas);
  // Switch the RGB color and update the selected state of each swatch.
  document.querySelectorAll('[data-color]').forEach(b => b.addEventListener('click', () => {
    color = {
      orange: [232, 85, 39],
      sage: [116, 126, 89],
      blue: [101, 127, 146]
    }[b.dataset.color];
    document.querySelectorAll('[data-color]').forEach(x => x.setAttribute('aria-pressed', x === b));
    draw();
  }));
  draw();
}
