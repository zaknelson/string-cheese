const _ = require('lodash');
const CONFIG = require('../data/config');
const GameService = require('./GameService');
const Judgment = require('../models/Judgment');

class JudgmentService {
  createJudgment(gameId, submissions) {
    const game = GameService.getGame(gameId);
    const judgment = new Judgment();
    _.map(submissions, (submission) =>
      judgment.addSubmission(_.find(game.submissions, { id: submission.id }))
    );
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
