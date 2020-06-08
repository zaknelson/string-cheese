let id = 0;

class Judgment {
  constructor() {
    this.id = id++ + '';
    this.submissions = [];
    this.revealed = 0;
  }
}

module.exports = Judgment;
