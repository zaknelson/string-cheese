const Game = require('../models/Game');
const DemoJudgment = require('./DemoJudgment');
const DemoPlayer1 = require('./DemoPlayer1');
const DemoPlayer2 = require('./DemoPlayer2');

class DemoGame extends Game {
  constructor() {
    super();
    this.id = '123';
    this.players.push(new DemoPlayer1());
    this.players.push(new DemoPlayer2());
    this.judgments.push(new DemoJudgment());
  }
}

module.exports = DemoGame;
