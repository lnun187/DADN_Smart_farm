const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    Address: String,
    Name: String,
    Uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Area', areaSchema);
