let id = 0;

class Judgment {
  constructor() {
    this.id = id++ + '';
    this.submissions = [];
    this.revealed = 0;
  }

  addSubmission(submission) {
    this.submissions.push(submission);
  }
}

module.exports = Judgment;
