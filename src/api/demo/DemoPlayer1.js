const Card = require('../models/Card');
const Player = require('../models/Player');
const PlayerState = require('../models/PlayerState');

class DemoPlayer1 extends Player {
  constructor() {
    super();
    this.id = 'abc';
    this.name = 'Zak';
    this.state = PlayerState.WAITING_FOR_GUESSES;
    this.points = 100;
    this.cards.push(new Card('Mountains'));
    this.cards.push(new Card('TV'));
    this.cards.push(new Card('Literature'));
    this.cards.push(new Card('Springtime'));
  }
}

module.exports = DemoPlayer1;
