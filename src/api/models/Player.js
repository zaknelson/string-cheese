const shortid = require('shortid');

class Player {
  constructor(name) {
    this.id = shortid.generate();
    this.name = name;
    this.cards = [];
  }
}

module.exports = Player;
