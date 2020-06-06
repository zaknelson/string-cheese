const DemoGame = require('../demo/DemoGame');
const Game = require('../models/Game');

const _ = require('lodash');

let games = [new DemoGame()];

class GameService {
  createGame(gameOptions) {
    const game = new Game(gameOptions);
    games.push(game);
    return game;
  }

  getGame(id) {
    return _.find(games, { id });
  }

  getGames() {
    return games;
  }

  getPlayer(gameId, playerId) {
    const game = getGame(gameId);
    return _.find(game.players, { id: playerId });
  }
}

module.exports = new GameService();
