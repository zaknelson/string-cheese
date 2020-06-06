const _ = require('lodash');
const Card = require('./Card');
const CARDS = require('../data/cards');
const shortid = require('shortid');

class Game {
  constructor() {
    this.id = shortid.generate();
    this.players = [];
    this.state = 'waiting-for-players';
    this.deck = _.map(CARDS, (name) => new Card(name));
  }

  drawCard() {
    const index = Math.floor(Math.random() * Math.floor(this.deck.length));
    const card = this.deck[index];
    this.deck.splice(index, 1);
    return card;
  }
}

module.exports = Game;
