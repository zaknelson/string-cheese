const _ = require('lodash');
const CONFIG = require('../data/config');
const GameService = require('./GameService');
const Judgement = require('../models/Judgement');

class JudgementService {
  createJudgement(gameId, submissions) {
    const game = GameService.getGame(gameId);
    const judgement = new Judgement(
      _.map(submissions, (submission) =>
        _.find(game.submissions, { id: submission.id })
      )
    );
    game.judgements.push(judgement);
    return judgement;
  }

  getJudgements(gameId) {
    const game = GameService.getGame(gameId);
    return _.map(game.judgements, (judgement) => {
      return {
        id: judgement.id,
        submissions: judgement.submissions.slice(0, judgement.revealed),
        revealed: judgement.revealed,
      };
    });
  }

  revealJudgement(gameId, judgementId) {
    const game = GameService.getGame(gameId);
    const judgement = _.find(game.judgements, { id: judgementId });
    const player = judgement.submissions[judgement.revealed].player;
    const points = CONFIG.pointValues[judgement.revealed];
    player.points += points;
    judgement.revealed++;
    return judgement;
  }
}

module.exports = new JudgementService();
