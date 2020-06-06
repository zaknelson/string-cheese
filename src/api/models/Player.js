const _ = require('lodash');
const shortid = require('shortid');

class Player {
  constructor(name) {
    this.id = shortid.generate();
    this.cards = [];
    this.name = name;
    this.state = 'waiting-for-players';
  }

  playCard(cardId) {
    const card = _.find(this.cards, { id: cardId });
    _.remove(this.cards, { id: cardId });
    return card;
  }
}

module.exports = Player;
