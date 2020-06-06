const _ = require('lodash');
const CONFIG = require('../data/config');
const DemoGame = require('../demo/DemoGame');
const Game = require('../models/Game');
const Judgement = require('../models/Judgement');
const Player = require('../models/Player');

let games = [new DemoGame()];

class GameService {
  clearCards(gameId) {
    const game = this.getGame(gameId);
    game.round++;
    game.cards = [];

    // Re-up player cards
    _.forEach(game.players, (player) => {
      _.times(CONFIG.handSize - player.cards.length, () => {
        const card = game.drawCard();
        player.cards.push(card);
      });
    });
    return game.cards;
  }

  createGame() {
    const game = new Game();
    games.push(game);
    return game;
  }

  getCards(gameId) {
    const game = this.getGame(gameId);
    return game.cards;
  }

  getGame(gameId) {
    return _.find(games, { id: gameId });
  }

  getGames() {
    return games;
  }

  playCard(gameId, cardId) {
    const game = this.getGame(gameId);
    const player = _.find(game.players, { cards: [{ id: cardId }] });
    const card = _.find(player.cards, { id: cardId });
    player.playCard(card);
    game.cards.push(card);
    return game.cards;
  }
}

module.exports = new GameService();
