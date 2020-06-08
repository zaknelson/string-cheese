const _ = require('lodash');
const CONFIG = require('../data/config');
const GameService = require('./GameService');
const Judgment = require('../models/Judgment');
const PlayerState = require('../models/PlayerState');

class JudgmentService {
  createJudgment(gameId, submissions) {
    const game = GameService.getGame(gameId);
    const judgment = new Judgment();
    const submissionPlayers = [];
    _.forEach(submissions, (submissionData) => {
      const submission = _.find(game.submissions, { id: submissionData.id });
      judgment.submissions.push(submission);
      submissionPlayers.push(submission.player);
      submission.player.state = PlayerState.WAITING_FOR_REVEALS;
    });
    _.difference(game.players, submissionPlayers)[0].state =
      PlayerState.REVEALING;
    game.judgments.push(judgment);
    return judgment;
  }

  getJudgments(gameId) {
    const game = GameService.getGame(gameId);
    return _.map(game.judgments, (judgment) => {
      return {
        id: judgment.id,
        submissions: judgment.submissions.slice(0, judgment.revealed),
        revealed: judgment.revealed,
      };
    });
  }

  updateJudgment(gameId, judgmentId) {
    const game = GameService.getGame(gameId);
    const judgment = _.find(game.judgments, { id: judgmentId });
    const player = judgment.submissions[judgment.revealed].player;
    const points = CONFIG.pointValues[judgment.revealed];
    player.points += points;
    judgment.revealed++;
    return judgment;
  }
}

module.exports = new JudgmentService();
