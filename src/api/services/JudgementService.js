const _ = require('lodash');
const GameService = require('./GameService');
const Judgement = require('../models/Judgement');

class JudgementService {
  createJudgement(gameId, cards) {
    const game = GameService.getGame(gameId);
    const judgement = new Judgement(cards);
    game.judgements.push(judgement);
    return judgement;
  }

  getJudgements(gameId) {
    const game = GameService.getGame(gameId);
    return _.map(game.judgements, (judgement) => {
      return {
        id: judgement.id,
        cards: judgement.cards.slice(0, judgement.revealed),
        revealed: judgement.revealed,
      };
    });
  }

  revealJudgement(gameId, judgementId) {
    const game = GameService.getGame(gameId);
    const judgement = _.find(game.judgements, { id: judgementId });
    judgement.revealed++;
    return judgement;
  }
}

module.exports = new JudgementService();
