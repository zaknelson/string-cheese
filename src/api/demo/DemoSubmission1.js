const Card = require('../models/Card');
const Submission = require('../models/Submission');
const DemoPlayer1 = require('./DemoPlayer1');

class DemoSubmission1 extends Submission {
  constructor() {
    super();
    this.card = new Card('Sherlock Holmes');
    this.player = new DemoPlayer1();
  }
}

module.exports = DemoSubmission1;
