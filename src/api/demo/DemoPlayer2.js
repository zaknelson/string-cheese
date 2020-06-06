const Card = require('../models/Card');
const Player = require('../models/Player');

class DemoPlayer2 extends Player {
  constructor() {
    super();
    this.id = 'def';
    this.name = 'Max';
    this.cards.push(new Card('Clowns'));
    this.cards.push(new Card('Poptarts'));
    this.cards.push(new Card('Shoelaces'));
    this.cards.push(new Card('Running a marathon'));
  }
}

module.exports = DemoPlayer2;
