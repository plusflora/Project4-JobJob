const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  style: {
    type: String,
    enum: ['technical', 'behavioral', 'extra'],
    required: true
  },
  date: {
    type: Date,
  },
  notes: {
    type: String,
  },
});

// Create a Mongoose model using the interview schema
const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;