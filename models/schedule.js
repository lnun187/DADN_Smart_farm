const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    Staff_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Staff'},
    Manager_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Manager'},
    W_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Watering'},
});

module.exports = mongoose.model('Schedule', scheduleSchema);
