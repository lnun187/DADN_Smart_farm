const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Aid: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
});

module.exports = mongoose.model('Device', deviceSchema);
