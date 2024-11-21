const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: { type: String, unique: true },
  userId: String,
  timestamp: { type: Date, default: Date.now },
  payload: Object,
  metrics: Object,
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
});

module.exports = mongoose.model('Event', eventSchema);
