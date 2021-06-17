const express = require('express');
const path = require('path');
const { Deck, Hand } = require('./cards/deck');

const app = express();

const PORT = 4040;

app.use(express.json());

const deck = new Deck();
// const tableHand = deck.getNewHand(5);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/get-table-hand', (req, res) => {
  res.json({
    tableHand,
  });
});

app.get('/get-hand/:size', (req, res) => {
  const { size } = req.params;
  const playerHand = new Hand(deck, parseInt(size));
  res.json({
    playerHand,
    tableHand,
  });
});

app.post('/player', (req, res) => {
  const {
    body: { user },
  } = req;
  res.json({
    user,
  });
});

app.get('/play', (req, res) => {
  const currentHands = {};
  for (let i = 1; i <= 5; i++) {
    const hand = new Hand(deck, 5);
    currentHands[`player${i}`] = hand;
  }
  res.send({
    remainingCards: deck.cards,
    currentHands,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
