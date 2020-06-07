const _ = require('lodash');
const GameService = require('./GameService');
const Submission = require('../models/Submission');

class SubmissionService {
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
