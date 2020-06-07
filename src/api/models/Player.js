const _ = require('lodash');
const shortid = require('shortid');

class Player {
  constructor(name) {
    this.id = shortid.generate();
    this.cards = [];
    this.name = name;
    this.points = 0;
    this.state = 'waiting-for-players';
  }

  playCard(card) {
    _.remove(this.cards, card);
    return card;
  }
}

module.exports = Player;
