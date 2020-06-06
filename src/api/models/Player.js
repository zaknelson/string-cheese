const shortid = require('shortid');

class Player {
  constructor(name) {
    this.id = shortid.generate();
    this.cards = [];
    this.name = name;
    this.state = 'waiting-for-players';
  }
}

module.exports = Player;
