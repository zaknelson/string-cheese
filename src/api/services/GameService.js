const _ = require('lodash');
const shortid = require('shortid');
const Game = require('../models/Game');

let games = [];

class GameService {
  createGame(gameOptions) {
    const game = new Game(gameOptions);
    game.id = shortid.generate();
    games.push(game);
    return game;
  }

  getGame(id) {
    return _.find(games, { id });
  }

  getGames() {
    return games;
  }
}

module.exports = new GameService();
