const _ = require('lodash');
const shortid = require('shortid');

class Player {
  constructor(name, isJudge) {
    this.id = shortid.generate();
    this.cards = [];
    this.name = name;
    this.points = 0;
    this.role = isJudge ? 'judge' : 'guesser';
  }

  playCard(card) {
    _.remove(this.cards, card);
    return card;
  }

  setGuesser() {
    this.role = 'guesser';
  }

  setJudge() {
    this.role = 'judge';
  }
}

module.exports = Player;
