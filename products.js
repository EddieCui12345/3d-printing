// Prices are in cents (CAD), e.g. 2500 = $25.00. A null price shows "coming soon" and blocks checkout.
// Add a `colours` list (id, name, swatch, thumb, photo) to sell one product in several colours.
// `photo` is shown in the product dialog when that colour is picked; `thumb` is used in the cart.
// `photos` (optional) lists extra pictures, shown as thumbnails in the product dialog.
// `focus` sets which part of the photo stays visible when it is cropped (CSS object-position).
// Only use photos of toys the apprentices actually made.
// api/checkout.js charges from this list, so it is the only place prices need to change.
const products = [
  {
    id: 'chess',
    name: 'Roll-Up Chess Set',
    category: 'Chess',
    price: 3000,
    image: 'assets/chess-lineup.jpg',
    focus: 'center 72%',
    desc: 'Designed in 2025: Enjoy a classic game of chess wherever you go! Our specially designed chess set features a flexible, roll-up board that makes it easy to store and carry. Perfect for family game nights, friendly competitions, or taking on your next adventure. <br> Available in a variety of colours to suit your style.',
    colours: [
      {
        id: 'chess-black',
        name: 'Black',
        swatch: '#1f2026',
        thumb: 'assets/chess-colours/black.jpg',
        photo: 'assets/chess-colours/black-full.jpg',
      },
      {
        id: 'chess-red',
        name: 'Red',
        swatch: '#d32f3c',
        thumb: 'assets/chess-colours/red.jpg',
        photo: 'assets/chess-colours/red-full.jpg',
      },
      {
        id: 'chess-blue',
        name: 'Blue',
        swatch: '#2438b8',
        thumb: 'assets/chess-colours/blue.jpg',
        photo: 'assets/chess-colours/blue-full.jpg',
      },
      {
        id: 'chess-green',
        name: 'Green',
        swatch: '#0ac900',
        thumb: 'assets/chess-colours/green.jpg',
        photo: 'assets/chess-colours/green-full.jpg',
      },
      {
        id: 'chess-orange',
        name: 'Orange',
        swatch: '#f39a1e',
        thumb: 'assets/chess-colours/orange.jpg',
        photo: 'assets/chess-colours/orange-full.jpg',
      },
    ],
  },
  {
    id: 'gonggi',
    name: 'Gonggi Game',
    category: 'Games',
    price: 800,
    image: 'assets/products/gonggi.jpg',
    desc: 'Designed in 2025: Discover the fun of Gonggi, a traditional Korean game that challenges hand-eye coordination, concentration, and quick reflexes! Players toss and catch small game pieces while completing increasingly challenging levels. Simple to learn, fun to master, and perfect for playing with friends and family! <br> Please Note: Colours are randomly selected based on available stock. Specific colours cannot be guaranteed.',
  },
  {
    id: 'tic-tac-toe',
    name: 'Steamoji Tic Tac Toe',
    category: 'Games',
    price: 2500,
    image: 'assets/products/tic-tac-toe.jpg',
    photos: ['assets/products/tic-tac-toe.jpg', 'assets/products/tic-tac-toe-board.jpg'],
    desc: 'A classic game with a creative twist! Our handmade Tic-Tac-Toe set brings this timeless strategy game to life with colourful, 3D-printed pieces. Challenge your friends or family, think ahead, and see who can get four in a row! Fun, easy to play, and perfect for all ages.',
  },
  {
    id: 'bingo',
    name: 'Connect 3',
    category: 'Games',
    price: 2500,
    image: 'assets/products/bingo-board.jpg',
    photos: ['assets/products/bingo-board.jpg', 'assets/products/bingo-tiles.jpg'],
    desc: 'Bring everyone together for a fun-filled game of Connect 3! Our creatively designed 5×5 game board adds a playful twist to this classic-style game. It is a fun way to spend quality time with family and friends while practising strategy, problem-solving, and critical thinking. Perfect for family game nights, parties, and friendly competitions!',
  },
  {
    id: 'clicky-fidgets',
    name: '3D Printed Clicky Fidget Toys',
    category: 'Toys',
    price: 1900,
    image: 'assets/products/clicky-fidgets.jpg',
    photos: ['assets/products/clicky-fidgets.jpg', 'assets/products/clicky-fidgets-angle.jpg'],
    desc: 'Click, play, and enjoy! Our Clicky Fidget Toys come in a variety of fun and creative designs, each offering a satisfying clicking experience. These small, playful toys are perfect for keeping your hands busy and make wonderful little gifts for friends and family. <br> Each set includes 4 randomly selected, different designs.',
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
