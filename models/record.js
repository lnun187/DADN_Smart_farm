const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    Time: String,
    Did: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
});

module.exports = mongoose.model('Record', recordSchema);
