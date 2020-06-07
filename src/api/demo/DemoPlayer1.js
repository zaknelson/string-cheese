const Card = require('../models/Card');
const Player = require('../models/Player');

class DemoPlayer1 extends Player {
  constructor() {
    super();
    this.id = 'abc';
    this.name = 'Zak';
    this.role = 'judge';
    this.isWaiting = true;
    this.points = 100;
    this.cards.push(new Card('Mountains'));
    this.cards.push(new Card('TV'));
    this.cards.push(new Card('Literature'));
    this.cards.push(new Card('Springtime'));
  }
}

module.exports = DemoPlayer1;
