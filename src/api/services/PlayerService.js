const _ = require('lodash');
const CONFIG = require('../data/config');
const GameService = require('./GameService');
const Player = require('../models/Player');

class PlayerService {
  createPlayer(gameId, name) {
    const game = GameService.getGame(gameId);
    const player = new Player(name);
    game.players.push(player);

    // Deal cards to new player
    _.times(CONFIG.handSize, () => {
      const card = game.drawCard();
      player.cards.push(card);
    });

    return player;
  }

  getPlayer(gameId, playerId) {
    const game = GameService.getGame(gameId);
    return _.find(game.players, { id: playerId });
  }
}

module.exports = new PlayerService();
