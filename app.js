// =====================================================
// STEAMOJI APPRENTICES' 3D TOY DESIGN CLUB
// One shared JavaScript file for the entire website
// Pages: home, products, story, about, contact
// =====================================================


// 1. PAGE SETUP

const page = document.body.dataset.page;

const links = [
  ["home", "Home"],
  ["products", "Product Gallery"],
  ["story", "Club Stories"],
  ["about", "About Steamoji"],
  ["contact", "Contact"]
];

const header = document.querySelector("header");
const footer = document.querySelector("footer");
const main = document.querySelector("main");

if (header) {
  header.innerHTML = `
    <a class="brand" href="home.html" aria-label="Steamoji home">
      <span>
        Steamoji
        <small>APPRENTICES' 3D TOY DESIGN CLUB</small>
      </span>
    </a>

    <button class="menu-toggle"
      aria-expanded="false"
      aria-controls="navigation">
      Menu +
    </button>

    <nav id="navigation" aria-label="Main navigation">
      ${links.map(([id, label]) => `
        <a href="${id}.html"
          ${page === id ? 'aria-current="page"' : ""}>
          ${label}
        </a>
      `).join("")}
    </nav>

    <a class="nav-cta" href="contact.html">
      Got a question? <span>↗</span>
    </a>
  `;
}


// 2. STEAMOJI LOCATIONS

const locations = `
  <div>
    <h3>Richmond Central</h3>
    <p>
      140-8031 Williams Road<br>
      Richmond, BC · V7A 1G4
    </p>
    <a href="tel:+16044478999">(604) 447-8999</a>
    <br>
    <a href="mailto:richmondcentral@steamoji.com">
      richmondcentral@steamoji.com
    </a>
  </div>

  <div>
    <h3>Richmond North</h3>
    <p>
      116-4940 No. 3 Road<br>
      Richmond, BC · V6X 3A5
    </p>
    <a href="tel:+16042732555">(604) 273-2555</a>
    <br>
    <a href="mailto:richmondnorth@steamoji.com">
      richmondnorth@steamoji.com
    </a>
  </div>
`;


// 3. SHARED FOOTER

if (footer) {
  footer.innerHTML = `
    <div class="footer-top">
      <div>
        <a class="brand" href="home.html">
          Steamoji
        </a>
        <p>
          Young designers. Real creations.
          Meaningful impact.
        </p>
      </div>

      ${locations}
    </div>

    <div class="footer-bottom">
      <span>
        © ${new Date().getFullYear()} Steamoji
      </span>

      <span>
        Keep learning. Keep making.
      </span>

      <a href="#top">Back to top ↑</a>
    </div>
  `;
}


// 4. PRODUCT DATA

const products = [
  {
    name: "Chess with a Twist",
    category: "Games",
    image: "assets/2024-12-21_6e24a0ff606b38.webp",
    desc: "A cylindrical take on a familiar chess game. Contact Steamoji to learn more."
  },
  {
    name: "Colorful Gonggi Games",
    category: "Games",
    image: "assets/IMG_4502.png",
    desc: "A colorful gonggi set with playful shapes. Ask Steamoji about this design."
  },
  {
    name: "Fidget Toy Keychain",
    category: "Accessories",
    image: "assets/placeholder.jpg",
    desc: "A fun 3D-printed fidget keychain. More details coming soon."
  },
  {
    name: "Tic Tac Toe",
    category: "Games",
    image: "assets/placeholder.jpg",
    desc: "A 3D-printed version of the classic tic-tac-toe game. More details coming soon."
  },
  {
    name: "Connect 4",
    category: "Games",
    image: "assets/placeholder.jpg",
    desc: "A 3D-printed version of Connect 4. More details coming soon."
  }
];


// 5. REUSABLE PRODUCT CARDS

function productCards() {
  return `
    <section class="product-grid" aria-label="Product gallery">

      ${products.map((product, index) => `
        <article class="product"
          data-category="${product.category}">

          <button class="product-image"
            data-product="${index}"
            aria-label="Take a closer look at ${product.name}">

            <img
              src="${product.image}"
              alt="${product.name}"
              loading="lazy">
          </button>

          <div class="product-info">
            <div>
              <h3>${product.name}</h3>
              <p>Explore the idea behind the design.</p>
            </div>

            <button class="round-link"
              data-product="${index}">
              Explore ↗
            </button>
          </div>

        </article>
      `).join("")}

      <article class="product coming-soon">
        <div class="product-info">
          <div>
            <h3>More Coming Soon</h3>
            <p>New apprentice creations are on the way!</p>
          </div>
        </div>
      </article>

    </section>
  `;
}


// 6. REUSABLE CLUB CTA

const clubCTA = `
  <section class="closing">
    <h2>
      Got a Question?<br>
      Just Ask!
    </h2>

    <h3>
      Contact Steamoji to learn more about the
      Apprentices' 3D Toy Design Club.
    </h3>

    <a class="button" href="contact.html">
      Ask a question <span>↗</span>
    </a>
  </section>
`;


// 7. HOMEPAGE

if (page === "home") {
  main.innerHTML = `

    <section class="hero">

      <div class="hero-copy">

        <div class="eyebrow">
          <span class="dot"></span>
          APPRENTICE-LED · JANUARY–DECEMBER
        </div>

        <h1>
          Young Designers.<br>
          Real Creations.<br>
          <em>Meaningful Impact.</em>
        </h1>

        <p class="intro">
          From imagination to innovation, Steamoji apprentices
          design and manufacture toys while developing teamwork,
          leadership, entrepreneurship, and a passion for giving
          back to the community.
        </p>

        <div class="hero-actions">
          <a class="button primary" href="story.html">
            Explore the Club <span>↗</span>
          </a>

          <a class="text-link" href="#about-club">
            Discover the program ↓
          </a>
        </div>

        <p class="form-note">
          Registration opens every January.
        </p>


      </div>

      <div class="hero-art">

        <span class="maker-sticker" aria-hidden="true">
          DREAM<br>
          DESIGN<br>
          <i>MAKE!</i>
        </span>

        <canvas id="sculpture"
          role="img"
          aria-label="Interactive layered sculpture. Choose a color using the buttons below.">
        </canvas>

        <div class="art-tag">
          IMAGINATION BECOMES REAL<br>
          One idea at a time.
        </div>

        <div class="art-caption">
          <span>PICK A COLOR →</span>

          <div class="swatches" aria-label="Sculpture color">

            <button class="swatch"
              style="--swatch:#e85527"
              data-color="orange"
              aria-label="Terracotta"
              aria-pressed="true">
            </button>

            <button class="swatch"
              style="--swatch:#747e59"
              data-color="sage"
              aria-label="Sage"
              aria-pressed="false">
            </button>

            <button class="swatch"
              style="--swatch:#657f92"
              data-color="blue"
              aria-label="Slate blue"
              aria-pressed="false">
            </button>

          </div>
        </div>

      </div>

      <div class="hero-foot">
        <span>IMAGINE IT. DESIGN IT. MAKE IT REAL.</span>
        <a href="#about-club">MEET THE CLUB ↓</a>
      </div>

    </section>


    <div class="ticker">
      <span>MAKERS</span>
      <span>BUILDERS</span>
      <span>INNOVATORS</span>
      <span>ENTREPRENEURS</span>
    </div>


    <section class="section" id="about-club">

      <div class="eyebrow">
        MORE THAN MAKING TOYS
      </div>

      <div class="section-heading">
        <h2>
          Big ideas.<br>
          Real-world skills.
        </h2>
      </div>

      <p class="intro">
        The Apprentices' 3D Toy Design Club is a year-long,
        apprentice-led program at Steamoji. Apprentices work
        together to turn their own ideas into real products,
        learning how to design, build, test, and improve their
        creations along the way.
      </p>

      <div class="steps">

        <article class="step">
          <span>01 / IMAGINE</span>
          <h3>Start with an idea.</h3>
          <p>
            Apprentices brainstorm, explore possibilities,
            and develop original toy ideas that solve problems
            or bring something fun to life.
          </p>
        </article>

        <article class="step">
          <span>02 / CREATE</span>
          <h3>Build it together.</h3>
          <p>
            Teams design, prototype, test, and refine their
            toys. They learn to share ideas, solve problems,
            and work through challenges.
          </p>
        </article>

        <article class="step">
          <span>03 / MAKE AN IMPACT</span>
          <h3>Give back.</h3>
          <p>
            Apprentices explore entrepreneurship and fundraising,
            with the goal of supporting BC Children's Hospital
            and contributing positively to the community.
          </p>
        </article>

      </div>

    </section>


    <section class="feature">

      <img class="feature-image"
        src="assets/3d printing img.webp"
        alt="A geometric form being created through 3D printing"
        loading="lazy">

      <div class="feature-copy">

        <div class="eyebrow">
          APPRENTICES LEAD THE WAY
        </div>

        <h2>
          From first sketch<br>
          to finished toy.
        </h2>

        <p>
          Apprentices take the lead in designing, developing,
          and manufacturing toys. Steamoji coaches provide
          guidance and technical support, helping apprentices
          improve their designs and bring their ideas to life.
        </p>

        <a class="text-link" href="story.html">
          Discover how the club works ↗
        </a>

      </div>

    </section>


    <section class="section">

      <div class="eyebrow">
        FOUR WAYS TO GROW
      </div>

      <div class="section-heading">
        <h2>
          More than a<br>
          finished product.
        </h2>
      </div>

      <div class="steps">

        <article class="step">
          <span>01 / MAKERS</span>
          <h3>Make something real.</h3>
          <p>
            Learn through designing, prototyping, testing,
            and manufacturing original toys.
          </p>
        </article>

        <article class="step">
          <span>02 / BUILDERS</span>
          <h3>Work as a team.</h3>
          <p>
            Practise collaboration, communication,
            and solving problems together.
          </p>
        </article>

        <article class="step">
          <span>03 / INNOVATORS</span>
          <h3>Think differently.</h3>
          <p>
            Explore new ideas, learn from mistakes,
            and improve designs through testing.
          </p>
        </article>

      </div>

      <div class="section-heading">
        <h2>Become an entrepreneur.</h2>
      </div>

      <p class="intro">
        Apprentices also explore how products reach people,
        how fundraising works, and how creative ideas can
        make a meaningful difference.
      </p>

    </section>


    <section class="section">

      <div class="eyebrow">
        A YEAR OF CREATIVITY AND GROWTH
      </div>

      <div class="section-heading">
        <h2>
          One year.<br>
          Many possibilities.
        </h2>
      </div>

      <div class="steps">

        <article class="step">
          <span>JANUARY</span>
          <h3>Register and kick off.</h3>
          <p>
            Meet the club, share ideas, and begin planning
            the year's projects.
          </p>
        </article>

        <article class="step">
          <span>FEBRUARY – OCTOBER</span>
          <h3>Design and build.</h3>
          <p>
            Work in teams through brainstorming, prototyping,
            testing, refining, and manufacturing.
          </p>
        </article>

        <article class="step">
          <span>NOVEMBER – DECEMBER</span>
          <h3>Share and celebrate.</h3>
          <p>
            November focuses on fundraising. December is
            a time for celebration, recognition, and
            community giving.
          </p>
        </article>

      </div>

      <p class="form-note">
        Toy donations depend on the receiving organization's
        requirements and acceptance.
      </p>

    </section>




    <section class="section">

      <div class="eyebrow">
        CREATIVITY WITH A PURPOSE
      </div>

      <div class="section-heading">
        <h2>
          Making a difference<br>
          beyond the workshop.
        </h2>
      </div>

      <p class="intro">
        The club aims to support BC Children's Hospital
        through fundraising and community giving. Along the
        way, apprentices develop leadership, communication,
        collaboration, and entrepreneurial skills while
        discovering how their ideas can help others.
      </p>

      <a class="text-link" href="story.html#community-impact">
        Learn about the club's impact ↗
      </a>

    </section>


    <section class="closing">
      <h2>
        Ready to turn<br>
        ideas into action?
      </h2>

      <p>
        Join Steamoji's Apprentices' 3D Toy Design Club!
      </p>

      <p>
        Registration opens every January.<br>
        January–December program.
      </p>

      <a class="button" href="contact.html">
        Ask about the club <span>↗</span>
      </a>
    </section>

  `;
}


// 8. PRODUCT GALLERY PAGE

if (page === "products") {
  main.innerHTML = `

    <section class="page-head">

      <div class="eyebrow">
        APPRENTICE CREATIONS
      </div>

      <h1>
        Ideas made<br>
        <em>real.</em>
      </h1>

      <p class="intro">
        Explore toy designs and creative projects connected
        to Steamoji. Each idea begins with imagination and
        develops through designing, building, and testing.
      </p>

    </section>

    <section class="section" style="padding-top:20px">

      <div class="eyebrow">
        THE PRODUCT GALLERY
      </div>

      ${productCards()}

      <p class="form-note">
        Some images and project details are still being added.
        Contact Steamoji for more information.
      </p>

    </section>

    ${clubCTA}

  `;
}


// 9. CLUB STORIES PAGE
// Combines designers, impact, fundraising, and news/events.

// 9. CLUB STORIES PAGE
// Combines designers, impact, fundraising, and news/events.

if (page === "story") {
  main.innerHTML = `

    <section class="page-head">

      <div class="story-hero">

        <div class="story-hero-text">
          <div class="eyebrow">
            INSIDE THE CLUB
          </div>

          <h1>
            Young minds.<br>
            <em>Big possibilities.</em>
          </h1>

          <p class="intro">
            Discover the people, projects, and ideas behind
            Steamoji's Apprentices' 3D Toy Design Club.
            Apprentices learn by creating together and finding
            ways to contribute to their community.
          </p>
        </div>

        <div class="story-hero-image">
          <img
            src="./Screenshot%202026-10-18%20at%2011.51.28%E2%80%AFAM.png"
            alt="Apprentices' 3D Toy Design Club">
        </div>

      </div>

    </section>


    <section class="section">

      <div class="story-hero">

        <div class="story-hero-text">
          <div class="eyebrow">
            MEET THE DESIGNERS
          </div>

          <div class="section-heading" style="margin-bottom: 20px;">
            <h2>
              Apprentice ideas<br>
              take the lead.
            </h2>
          </div>

          <p class="intro">
            Apprentices are the designers, builders, and problem
            solvers behind the club's creations. They brainstorm
            ideas, collaborate with teammates, test prototypes,
            and help turn designs into finished products.
          </p>
        </
      </div>

      <div class="steps" style="margin-top: 45px;">

        <article class="step">
          <span>THE IDEAS</span>
          <h3>Every project starts somewhere.</h3>
          <p>
            Apprentices share ideas, explore possibilities,
            and decide how their designs could become
            useful, playful, or interesting toys.
          </p>
        </article>

        <article class="step">
          <span>THE PROCESS</span>
          <h3>Learning by doing.</h3>
          <p>
            Teams build prototypes, test how they work,
            solve problems, and make improvements.
            Steamoji coaches help with technical skills.
          </p>
        </article>

        <article class="step">
          <span>THE RESULTS</span>
          <h3>Ideas become real.</h3>
          <p>
            The finished designs reflect creativity,
            teamwork, persistence, and the effort that
            goes into making something from scratch.
          </p>
        </article>

      </div>

      <p class="form-note">
        Apprentice names, photographs, and individual project
        stories can be added here when permission has been
        provided. No individual profiles are invented.
      </p>

      <a class="text-link" href="products.html">
        Explore the product gallery ↗
      </a>

    </section>


    <section class="feature" id="community-impact">

      <img class="feature-image"
        src="assets/3d printing img.webp"
        alt="A 3D-printed object created from a digital design"
        loading="lazy">

      <div class="feature-copy">

        <div class="eyebrow">
          COMMUNITY IMPACT
        </div>

        <h2>
          Create something.<br>
          Give something back.
        </h2>

        <p>
          The club aims to support BC Children's Hospital
          through fundraising and community giving.
          Apprentices learn how a creative project can
          connect design, teamwork, and a larger purpose.
        </p>

        <p>
          Toy donations are subject to the hospital's
          requirements and acceptance. Fundraising and
          donation details should be confirmed before
          specific amounts or outcomes are announced.
        </p>

      </div>

    </section>


    <section class="section" id="fundraising">

      <div class="eyebrow">
        FUNDRAISING AND ENTREPRENEURSHIP
      </div>

      <div class="section-heading">
        <h2>
          From a good idea<br>
          to a bigger goal.
        </h2>
      </div>

      <p class="intro">
        Designing a toy is only one part of the experience.
        Apprentices also explore how products are developed,
        how fundraising can work, and how teams organize
        projects to reach a shared goal.
      </p>

      <div class="steps">

        <article class="step">
          <span>PLAN</span>
          <h3>Think it through.</h3>
          <p>
            Set goals, share responsibilities, and work
            together to plan a project.
          </p>
        </article>

        <article class="step">
          <span>DEVELOP</span>
          <h3>Improve the idea.</h3>
          <p>
            Consider feedback, solve challenges, and
            refine a product through testing.
          </p>
        </article>

        <article class="step">
          <span>CONTRIBUTE</span>
          <h3>Think beyond the product.</h3>
          <p>
            Learn about fundraising and community giving
            while developing leadership and communication.
          </p>
        </article>

      </div>

    </section>


    <section class="section" id="news-events">

      <div class="eyebrow">
        CLUB NEWS AND EVENTS
      </div>

      <div class="section-heading">
        <h2>
          Follow the journey.
        </h2>
      </div>

      <p class="intro">
        From the January kickoff to the end-of-year
        celebration, the club follows a year-long journey
        of designing, building, teamwork, and community
        involvement.
      </p>

      <div class="steps">

        <article class="step">
          <span>JANUARY</span>
          <h3>Registration and kickoff</h3>
          <p>
            The program begins with registration, introductions,
            and the first round of ideas.
          </p>
        </article>

        <article class="step">
          <span>FEBRUARY – OCTOBER</span>
          <h3>Project development</h3>
          <p>
            Apprentices collaborate through design,
            prototyping, testing, and manufacturing.
          </p>
        </article>

        <article class="step">
          <span>NOVEMBER – DECEMBER</span>
          <h3>Fundraising and celebration</h3>
          <p>
            The year moves toward fundraising, recognition,
            celebration, and community giving.
          </p>
        </article>

      </div>

      <p class="form-note">
        Specific event dates, fundraising totals, and
        announcements can be added when confirmed.
      </p>

    </section>


    ${clubCTA}

  `;
}


// 10. ABOUT STEAMOJI PAGE

if (page === "about") {
  main.innerHTML = `

    <section class="page-head">

      <div class="eyebrow">
        ABOUT STEAMOJI
      </div>

      <h1>
        Curiosity.<br>
        Creativity.<br>
        <em>Possibility.</em>
      </h1>

      <p class="intro">
        Steamoji provides a space for young learners to
        explore ideas, develop practical skills, and learn
        through hands-on projects.
      </p>

    </section>


    <section class="section">

      <div class="eyebrow">
        LEARNING THROUGH MAKING
      </div>

      <div class="section-heading">
        <h2>
          Build skills<br>
          by building things.
        </h2>
      </div>

      <p class="intro">
        The Apprentices' 3D Toy Design Club brings creative
        thinking and hands-on making together. Apprentices
        lead their projects, while Steamoji coaches help
        them strengthen their technical skills and refine
        their designs.
      </p>

      <div class="steps">

        <article class="step">
          <span>CREATIVITY</span>
          <h3>Explore new ideas.</h3>
          <p>
            Turn imagination into designs and original
            product concepts.
          </p>
        </article>

        <article class="step">
          <span>COLLABORATION</span>
          <h3>Learn together.</h3>
          <p>
            Share responsibilities, communicate, and
            work through challenges as a team.
          </p>
        </article>

        <article class="step">
          <span>INNOVATION</span>
          <h3>Keep improving.</h3>
          <p>
            Test ideas, learn from results, and refine
            designs to make them better.
          </p>
        </article>

      </div>

    </section>


    <section class="section feature">

      <div>
        <div class="eyebrow">
          FIND STEAMOJI IN RICHMOND
        </div>

        <h2 style="margin-top:20px">
          Two locations.<br>
          Many possibilities.
        </h2>
      </div>

      <div class="contact-details">
        ${locations}
      </div>

    </section>


    ${clubCTA}

  `;
}


// 11. CONTACT PAGE
// Keeps the original contact page layout and form format.

if (page === "contact") {
  main.innerHTML = `

    <section class="page-head">

      <div class="eyebrow">
        GOT A QUESTION?
      </div>

      <h1>
        Any Questions?<br>
        <em>Feel free to ask!</em>
      </h1>

    </section>


    <section class="contact-layout">

      <div class="contact-details">

        <p>
          Parents and curious makers: ask about a print,
          share an idea, or contact your nearest Steamoji
          location to learn more about the Apprentices'
          3D Toy Design Club.
        </p>

        ${locations}

      </div>


      <form class="contact-form">

        <label>
          Your name
          <input
            name="name"
            autocomplete="name"
            required
            placeholder="Alex Chen">
        </label>


        <label>
          Email address
          <input
            name="email"
            type="email"
            autocomplete="email"
            required
            placeholder="you@example.com">
        </label>


        <label>
          Studio
          <select name="studio">
            <option value="richmondcentral">
              Richmond Central
            </option>

            <option value="richmondnorth">
              Richmond North
            </option>
          </select>
        </label>


        <label>
          What is your question?
          <textarea
            name="idea"
            required
            placeholder="Ask about the club, share an idea, or leave a question..."></textarea>
        </label>


        <button class="button primary" type="submit">
          Prepare email <span>↗</span>
        </button>

        <p class="form-note" role="status">
          This opens your email app with a draft.
          Nothing is sent from this website.
        </p>

      </form>

    </section>

  `;
}


// 12. MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") !== "true";

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "Close −" : "Menu +";
    navigation.classList.toggle("open", isOpen);
  });
}


// 13. PRODUCT DETAILS POP-UP

const dialog = document.createElement("dialog");
document.body.appendChild(dialog);

document.querySelectorAll("[data-product]").forEach(button => {
  button.addEventListener("click", () => {
    const product = products[Number(button.dataset.product)];

    if (!product) return;

    dialog.innerHTML = `
      <button class="close" aria-label="Close details">
        ×
      </button>

      <div class="eyebrow">
        ${product.category} / PRODUCT GALLERY
      </div>

      <img
        src="${product.image}"
        alt="${product.name}">

      <h2 id="detail-title">
        ${product.name}
      </h2>

      <p>
        ${product.desc}
      </p>

      <a class="button primary" href="contact.html">
        Ask Steamoji ↗
      </a>
    `;

    dialog.setAttribute("aria-labelledby", "detail-title");

    dialog.querySelector(".close").addEventListener("click", () => {
      dialog.close();
    });

    dialog.showModal();
  });
});

dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();

    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      dialog.close();
    }
  }
});


// 14. CONTACT FORM
// Opens an email draft. It does not send or save the form.

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(contactForm);

    const studio = data.get("studio");

    const emailAddress = {
      richmondcentral: "richmondcentral@steamoji.com",
      richmondnorth: "richmondnorth@steamoji.com"
    }[studio];

    const subject = "";

    const body =
      `Hello Steamoji,\n\n` +
      `${data.get("idea")}\n\n` +
      `From: ${data.get("name")}\n` +
      `Email: ${data.get("email")}`;

    const mailto =
      `mailto:${emailAddress}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    const status = contactForm.querySelector('[role="status"]');

    if (status) {
      status.textContent =
        "Your email draft should open in your email app. Review it there and send when ready.";
    }
  });
}


// 15. INTERACTIVE HOMEPAGE SCULPTURE

const canvas = document.querySelector("#sculpture");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let color = [232, 85, 39];
  let angle = 0;
  let target = 0;
  let frame = 0;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function drawSculpture() {
    const rect = canvas.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (
      canvas.width !== Math.round(rect.width * dpr) ||
      canvas.height !== Math.round(rect.height * dpr)
    ) {
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const scale = Math.min(
      rect.width / 650,
      rect.height / 600
    );

    ctx.save();

    ctx.translate(
      rect.width * 0.51,
      rect.height * 0.49
    );

    ctx.scale(scale, scale);
    ctx.rotate(-0.22 + angle * 0.08);

    const shadow = ctx.createRadialGradient(
      0, 225, 10,
      0, 225, 205
    );

    shadow.addColorStop(0, "#55583d35");
    shadow.addColorStop(1, "#55583d00");

    ctx.fillStyle = shadow;

    ctx.save();
    ctx.scale(1, 0.28);
    ctx.fillRect(-260, 530, 520, 650);
    ctx.restore();

    for (let i = 0; i < 100; i++) {
      const t = i / 99;

      const y = 190 - t * 365;

      const radius =
        105 +
        55 * Math.sin(t * Math.PI * 2 - 0.7) +
        25 * t;

      const dx =
        Math.sin(t * Math.PI * 2 + angle) * 24;

      ctx.beginPath();

      ctx.ellipse(
        dx,
        y,
        radius,
        radius * 0.31,
        0,
        0,
        Math.PI * 2
      );

      const gradient = ctx.createLinearGradient(
        dx - radius,
        0,
        dx + radius,
        0
      );

      gradient.addColorStop(
        0,
        `rgb(${color.map(v => Math.round(v * 0.65)).join(",")})`
      );

      gradient.addColorStop(
        0.38,
        `rgb(${color.map(v => Math.min(255, Math.round(v * 1.13))).join(",")})`
      );

      gradient.addColorStop(
        1,
        `rgb(${color.map(v => Math.round(v * 0.8)).join(",")})`
      );

      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = "rgba(85,36,13,.35)";
      ctx.lineWidth = 1.1;
      ctx.stroke();

      if (i === 99) {
        ctx.beginPath();

        ctx.ellipse(
          dx,
          y,
          radius - 12,
          (radius - 12) * 0.31,
          0,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          `rgb(${color.map(v => Math.round(v * 0.36)).join(",")})`;

        ctx.fill();
      }
    }

    ctx.restore();
  }


  function animateSculpture() {
    angle += (target - angle) * 0.07;

    drawSculpture();

    if (Math.abs(target - angle) > 0.001) {
      frame = requestAnimationFrame(animateSculpture);
    } else {
      frame = 0;
    }
  }


  canvas.addEventListener("pointermove", event => {
    if (reducedMotion.matches) return;

    const rect = canvas.getBoundingClientRect();

    target =
      (event.clientX / rect.width - 0.5) * 1.8;

    if (!frame) {
      frame = requestAnimationFrame(animateSculpture);
    }
  });


  canvas.addEventListener("pointerleave", () => {
    target = 0;

    if (!frame) {
      frame = requestAnimationFrame(animateSculpture);
    }
  });


  // Change the sculpture's color.

  document.querySelectorAll("[data-color]").forEach(button => {
    button.addEventListener("click", () => {
      const colors = {
        orange: [232, 85, 39],
        sage: [116, 126, 89],
        blue: [101, 127, 146]
      };

      color = colors[button.dataset.color];

      document.querySelectorAll("[data-color]").forEach(item => {
        item.setAttribute(
          "aria-pressed",
          item === button ? "true" : "false"
        );
      });

      drawSculpture();
    });
  });


  // Redraw the sculpture when its size changes.

  if ("ResizeObserver" in window) {
    new ResizeObserver(drawSculpture).observe(canvas);
  } else {
    window.addEventListener("resize", drawSculpture);
  }

  drawSculpture();
}