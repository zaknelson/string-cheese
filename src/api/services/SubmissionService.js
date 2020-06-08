const _ = require('lodash');
const CONFIG = require('../data/config');
const GameService = require('./GameService');
const Submission = require('../models/Submission');
const PlayerState = require('../models/PlayerState');

class SubmissionService {
  deleteSubmissions(gameId) {
    const game = GameService.getGame(gameId);
    game.round++;
    game.submissions = [];

    // Re-up player cards, and reset states
    _.forEach(game.players, (player) => {
      player.state = PlayerState.GUESSING;
      _.times(CONFIG.handSize - player.cards.length, () => {
        const card = game.drawCard();
        player.cards.push(card);
      });
    });

    // Set the new judge
    const newJudge = game.players[game.round % game.players.length];
    newJudge.state = PlayerState.WAITING_FOR_GUESSES;

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
    player.state = PlayerState.WAITING_FOR_JUDGMENT;
    player.playCard(card);
    game.submissions.push(submission);

    // If this is the last submission, the judge isn't waiting anymore
    if (game.submissions.length === game.players.length - 1) {
      _.find(game.players, { state: PlayerState.WAITING_FOR_GUESSES }).state =
        PlayerState.JUDGING;
    }

    return submission;
  }
}

module.exports = new SubmissionService();
