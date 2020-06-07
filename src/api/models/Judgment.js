let id = 0;

class Judgment {
  constructor(submissions) {
    this.id = id++ + '';
    this.submissions = submissions;
    this.revealed = 0;
  }
}

module.exports = Judgment;
