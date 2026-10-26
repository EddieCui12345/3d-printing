// Prices are in cents (CAD), e.g. 2500 = $25.00. A null price shows "coming soon" and blocks checkout.
// Add a `colours` list (id, name, swatch, image) to sell one product in several colours.
// api/checkout.js charges from this list, so it is the only place prices need to change.
const products = [
  {
    id: 'chess-twist',
    name: 'Chess with a twist',
    category: 'Games',
    price: 1500,
    image: 'assets/2024-12-21_6e24a0ff606b38.webp',
    desc: 'A familiar game, with a whole new shape. Explore a cylindrical chess design from the club’s collection.',
  },
  {
    id: 'gonggi',
    name: 'A handful of colour',
    category: 'Games',
    price: 1500,
    image: 'assets/IMG_4502.png',
    desc: 'Small pieces. Big possibilities. This colourful gonggi set brings playful shapes to a classic game.',
  },
  {
    id: 'chess',
    name: 'Two-tone chess',
    category: 'Chess',
    price: 1500,
    desc: 'Friendly sculpted pieces on a bright two-tone board. Pick the colour that suits your next match.',
    colours: [
      { id: 'chess-blue', name: 'Blue', swatch: '#2f6fd0', image: 'assets/chess-blue.jpg' },
      { id: 'chess-orange', name: 'Orange', swatch: '#f08a24', image: 'assets/chess-orange.jpg' },
      { id: 'chess-green', name: 'Green', swatch: '#3e9b4f', image: 'assets/chess-green.png' },
      { id: 'chess-red', name: 'Red', swatch: '#d33a3a', image: 'assets/chess-red.jpg' },
      { id: 'chess-black', name: 'Black', swatch: '#222222', image: 'assets/chess-black.jpg' },
    ],
  },
];

// Everything that can go in the cart: plain products, plus one entry per colour.
// Colour ids stay stable so saved carts and checkout keep working.
const items = products.flatMap((p) =>
  p.colours
    ? p.colours.map((c) => ({ ...p, ...c, name: `${p.name} · ${c.name}`, colourOf: p.id }))
    : [p],
);
if (typeof module !== 'undefined') module.exports = { products, items };
