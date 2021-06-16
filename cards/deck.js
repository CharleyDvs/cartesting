class Deck {
  numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  suits = ['♣', '♦', '♥', '♠'];

  cards = [];

  constructor() {
    this.createNewDeck();
  }

  createNewDeck = () => {
    this.suits.forEach((suit) => {
      this.numbers.forEach((face) => {
        this.cards.push(face + suit);
      });
    });
  };

  getNewHand = (size) => {
    return new Array(size)
      .fill()
      .map(
        () =>
          this.cards.splice(parseInt(Math.random() * this.cards.length), 1)[0]
      );
  };

  dispatchCards = (size) => {
    if (this.cards.length > 2) {
      return this.getNewHand(size);
    } else {
      this.cards = [];
      this.createNewDeck();
      return this.getNewHand(size);
    }
  };
}

class Hand {
  cards = [];
  constructor(deck, size) {
    this.cards = deck.dispatchCards(size);
  }
}

module.exports = {
  Deck,
  Hand,
};
