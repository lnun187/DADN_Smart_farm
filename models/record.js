const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    Time: String,
});

module.exports = mongoose.model('Record', recordSchema);
