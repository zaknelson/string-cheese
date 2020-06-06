const shortid = require('shortid');

class Game {
  constructor() {
    this.id = shortid.generate();
    this.players = [];
  }
}

module.exports = Game;
