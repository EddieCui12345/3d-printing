// Prices are in cents (CAD), e.g. 2500 = $25.00. A null price shows "coming soon" and blocks checkout.
// api/checkout.js charges from this list, so it is the only place prices need to change.
const products = [
  {
    id: 'chess-twist',
    name: 'Chess with a twist',
    category: 'Games',
    price: null,
    image: 'assets/2024-12-21_6e24a0ff606b38.webp',
    desc: 'A familiar game, with a whole new shape. Explore a cylindrical chess design from the club’s collection.',
  },
  {
    id: 'gonggi',
    name: 'A handful of colour',
    category: 'Games',
    price: null,
    image: 'assets/IMG_4502.png',
    desc: 'Small pieces. Big possibilities. This colourful gonggi set brings playful shapes to a classic game.',
  },
  {
    id: 'chess-blue',
    name: 'Blue & white chess',
    category: 'Chess',
    price: null,
    image: 'assets/chess-blue.jpg',
    desc: 'A bright blue chess set from the club’s collection, with friendly sculpted pieces ready for the next match.',
  },
  {
    id: 'chess-orange',
    name: 'Orange & white chess',
    category: 'Chess',
    price: null,
    image: 'assets/chess-orange.jpg',
    desc: 'Warm orange squares and rounded pieces. Another colourful chess creation made for play.',
  },
  {
    id: 'chess-green',
    name: 'Green & white chess',
    category: 'Chess',
    price: null,
    image: 'assets/chess-green.png',
    desc: 'A fresh green board with the same playful piece designs from the apprentice collection.',
  },
  {
    id: 'chess-red',
    name: 'Red & white chess',
    category: 'Chess',
    price: null,
    image: 'assets/chess-red.jpg',
    desc: 'Bold red and white squares, ready for a lively game around the table.',
  },
  {
    id: 'chess-black',
    name: 'Classic black & white chess',
    category: 'Chess',
    price: null,
    image: 'assets/chess-black.jpg',
    desc: 'A familiar colour pairing, with the club’s friendly sculpted pieces standing ready.',
  },
];
if (typeof module !== 'undefined') module.exports = products;
