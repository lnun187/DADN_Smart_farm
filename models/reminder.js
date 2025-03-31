const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    Time: String,
    Decription: String,
    Isdone: String,
    U_Reminder: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    RC_reminder: {type: mongoose.Schema.Types.ObjectId, ref: 'Record'},
});

module.exports = mongoose.model('Reminder', reminderSchema);
