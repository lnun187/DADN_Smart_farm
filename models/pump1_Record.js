const mongoose = require('mongoose');

const pump1recordSchema = new mongoose.Schema({
  RC_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
  Value: String,
});

module.exports = mongoose.model('Pump1Record', pump1recordSchema);
