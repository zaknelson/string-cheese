const shortid = require('shortid');

class Player {
  constructor() {
    this.id = shortid.generate();
    this.cards = [];
  }
}

module.exports = Player;
