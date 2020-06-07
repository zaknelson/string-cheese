const _ = require('lodash');
const DemoGame = require('../demo/DemoGame');
const Game = require('../models/Game');

let games = [new DemoGame()];

class GameService {
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
