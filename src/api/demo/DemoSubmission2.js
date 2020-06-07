const Card = require('../models/Card');
const Submission = require('../models/Submission');
const DemoPlayer2 = require('./DemoPlayer2');

class DemoSubmission2 extends Submission {
  constructor() {
    super();
    this.card = new Card('Cap Screws');
    this.player = new DemoPlayer2();
  }
}

module.exports = DemoSubmission2;
