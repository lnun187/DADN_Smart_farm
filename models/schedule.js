const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    Staff_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    Manager_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    W_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Watering'},
});

module.exports = mongoose.model('Schedule', scheduleSchema);
