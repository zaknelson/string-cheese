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
      player.role = 'guesser';
      player.isWaiting = false;
      _.times(CONFIG.handSize - player.cards.length, () => {
        const card = game.drawCard();
        player.cards.push(card);
      });
    });

    // Set the new judge
    const newJudge = game.players[game.round % game.players.length];
    newJudge.role = 'judge';
    newJudge.isWaiting = true;

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
    player.isWaiting = true;
    player.playCard(card);
    game.submissions.push(submission);

    // If this is the last submission, the judge isn't waiting anymore
    if (game.submissions.length === game.player.length - 1) {
      _.find(game.players, { role: 'judge' }).isWaiting = false;
    }

    return submission;
  }
}

module.exports = new SubmissionService();
