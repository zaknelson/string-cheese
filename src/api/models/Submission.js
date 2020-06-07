let id = 0;

class Submission {
  constructor(player, card) {
    this.id = id++ + '';
    this.card = card;
    this.player = player;
  }
}

module.exports = Submission;
