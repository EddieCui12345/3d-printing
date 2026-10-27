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
    name: 'Chess with a twist',
    category: 'Chess',
    price: 1500,
    image: 'assets/chess-lineup.jpg',
    focus: 'center 72%',
    desc: 'A familiar game, with a whole new shape. Our apprentices designed and 3D-printed this cylindrical chess set. Pick your favourite colour.',
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
        id: 'chess-pink',
        name: 'Pink',
        swatch: '#ec5d93',
        thumb: 'assets/chess-colours/pink.jpg',
        photo: 'assets/chess-colours/pink-full.jpg',
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
    name: 'A handful of colour',
    category: 'Games',
    price: 1500,
    image: 'assets/products/gonggi.jpg',
    desc: 'Small pieces. Big possibilities. A colourful gonggi set our apprentices designed and 3D-printed, with flower-shaped pieces that sit in their own carry bars.',
  },
  {
    id: 'tic-tac-toe',
    name: 'Steamoji Tic Tac Toe',
    category: 'Games',
    price: 1500,
    image: 'assets/products/tic-tac-toe.jpg',
    photos: ['assets/products/tic-tac-toe.jpg', 'assets/products/tic-tac-toe-board.jpg'],
    desc: 'Crosses versus Steamoji smiles. A big-grid twist on tic tac toe, designed and printed by the club to raise funds for BC Children’s Hospital.',
  },
  {
    id: 'bingo',
    name: 'Steamoji Bingo',
    category: 'Games',
    price: 1500,
    image: 'assets/products/bingo-board.jpg',
    photos: ['assets/products/bingo-board.jpg', 'assets/products/bingo-tiles.jpg'],
    desc: 'A standing bingo board filled with Steamoji tiles. Designed and 3D-printed by our apprentices.',
  },
  {
    id: 'clicky-fidgets',
    name: '3D Printed Clicky Fidget Toys',
    category: 'Toys',
    price: 1500,
    image: 'assets/products/clicky-fidgets.jpg',
    photos: ['assets/products/clicky-fidgets.jpg', 'assets/products/clicky-fidgets-angle.jpg'],
    desc: 'Press, click, repeat. Pocket-sized fidget clickers in playful designs, from Steamoji smiles and suns to ghosts and pixel hands. Many have a loop for a keychain.',
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
