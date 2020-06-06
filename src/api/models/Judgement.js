let id = 0;

class Judgement {
  constructor(cards) {
    this.id = id++ + '';
    this.cards = cards;
    this.revealed = 0;
  }
}

module.exports = Judgement;
