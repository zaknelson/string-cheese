const Judgment = require('../models/Judgment');
const DemoSubmission1 = require('./DemoSubmission1');
const DemoSubmission2 = require('./DemoSubmission2');

class DemoJudgment extends Judgment {
  constructor() {
    super();
    this.submissions.push(new DemoSubmission1());
    this.submissions.push(new DemoSubmission2());
    this.revealed = 2;
  }
}

module.exports = DemoJudgment;
