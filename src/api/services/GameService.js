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

  createJudgement(gameId, cards) {
    const game = this.getGame(gameId);
    const judgement = new Judgement(cards);
    game.judgements.push(judgement);
    return judgement;
  }

  createPlayer(gameId, name) {
    const game = this.getGame(gameId);
    const player = new Player(name);
    game.players.push(player);

    // Deal cards to new player
    _.times(CONFIG.handSize, () => {
      const card = game.drawCard();
      player.cards.push(card);
    });

    return player;
  }

  getCards(gameId) {
    const game = this.getGame(gameId);
    return game.cards;
  }

  getJudgements(gameId) {
    const game = this.getGame(gameId);
    return _.map(game.judgements, (judgement) => {
      return {
        id: judgement.id,
        cards: judgement.cards.slice(0, judgement.revealed),
        revealed: judgement.revealed,
      };
    });
  }

  getGame(gameId) {
    return _.find(games, { id: gameId });
  }

  getGames() {
    return games;
  }

  getPlayer(gameId, playerId) {
    const game = this.getGame(gameId);
    return _.find(game.players, { id: playerId });
  }

  playCard(gameId, cardId) {
    const game = this.getGame(gameId);
    const player = _.find(game.players, { cards: [{ id: cardId }] });
    const card = _.find(player.cards, { id: cardId });
    player.playCard(card);
    game.cards.push(card);
    return game.cards;
  }

  revealJudgement(gameId, judgementId) {
    const game = this.getGame(gameId);
    const judgement = _.find(game.judgements, { id: judgementId });
    judgement.revealed++;
    return judgement;
  }
}

module.exports = new GameService();
