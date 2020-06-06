let id = 0;

class Card {
  constructor(name) {
    this.id = id++ + '';
    this.name = name;
  }
}

module.exports = Card;
