const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    Time: String,
    R_ws: {type: mongoose.Schema.Types.ObjectId, ref: 'Reminder'},
    US_ws: {type: mongoose.Schema.Types.ObjectId, ref: 'Staff'},
    UM_ws: {type: mongoose.Schema.Types.ObjectId, ref: 'Manager'},
});

module.exports = mongoose.model('Schedule', scheduleSchema);
