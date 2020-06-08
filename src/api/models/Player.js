const _ = require('lodash');
const shortid = require('shortid');
const PlayerState = require('./PlayerState');

class Player {
  constructor(name, isJudge) {
    this.id = shortid.generate();
    this.cards = [];
    this.name = name;
    this.points = 0;
    this.state = isJudge
      ? PlayerState.WAITING_FOR_GUESSES
      : PlayerState.GUESSING;
  }

  playCard(card) {
    _.remove(this.cards, card);
    return card;
  }
}

module.exports = Player;
