const _ = require('lodash');
const DemoGame = require('../demo/DemoGame');
const Game = require('../models/Game');
const Player = require('../models/Game');

let games = [new DemoGame()];

class GameService {
  createGame() {
    const game = new Game();
    games.push(game);
    return game;
  }

  createPlayer(gameId, name) {
    const game = this.getGame(gameId);
    const player = new Player(name);
    game.players.push(player);
    return player;
  }

  getGame(id) {
    return _.find(games, { id });
  }

  getGames() {
    return games;
  }

  getPlayer(gameId, playerId) {
    const game = this.getGame(gameId);
    return _.find(game.players, { id: playerId });
  }
}

module.exports = new GameService();
