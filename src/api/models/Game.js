const _ = require('lodash');
const Card = require('./Card');
const CARDS = require('../data/cards');
const shortid = require('shortid');

class Game {
  constructor() {
    this.id = shortid.generate();
    this.cards = [];
    this.deck = _.map(CARDS, (name) => new Card(name));
    this.players = [];
    this.state = 'waiting-for-players';
  }

  drawCard() {
    const index = Math.floor(Math.random() * Math.floor(this.deck.length));
    const card = this.deck[index];
    this.deck.splice(index, 1);
    return card;
  }
}

module.exports = Game;
