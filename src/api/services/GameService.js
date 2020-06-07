const _ = require('lodash');
const CONFIG = require('../data/config');
const DemoGame = require('../demo/DemoGame');
const Game = require('../models/Game');

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

  getGame(gameId) {
    return _.find(games, { id: gameId });
  }

  getGames() {
    return games;
  }
}

module.exports = new GameService();
