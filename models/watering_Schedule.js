const mongoose = require('mongoose');

const wateringScheduleSchema = new mongoose.Schema({
    time: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    trees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tree' }]
  });
  
  module.exports = mongoose.model('WateringSchedule', wateringScheduleSchema);
  