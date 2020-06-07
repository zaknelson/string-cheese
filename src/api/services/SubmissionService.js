const _ = require('lodash');
const CONFIG = require('../data/config');
const GameService = require('./GameService');
const Submission = require('../models/Submission');

class SubmissionService {
  deleteSubmissions(gameId) {
    const game = GameService.getGame(gameId);
    game.round++;
    game.submissions = [];

    // Re-up player cards, and reset roles
    _.forEach(game.players, (player) => {
      player.setGuesser();
      _.times(CONFIG.handSize - player.cards.length, () => {
        const card = game.drawCard();
        player.cards.push(card);
      });
    });

    // Set the new judge
    game.players[game.round % game.players.length].setJudge();

    return game.submissions;
  }

  getSubmissions(gameId) {
    const game = GameService.getGame(gameId);
    return game.submissions;
  }

  createSubmission(gameId, cardId) {
    const game = GameService.getGame(gameId);
    const player = _.find(game.players, { cards: [{ id: cardId }] });
    const card = _.find(player.cards, { id: cardId });
    const submission = new Submission(player, card);
    player.playCard(card);
    game.submissions.push(submission);
    return submission;
  }
}

module.exports = new SubmissionService();
