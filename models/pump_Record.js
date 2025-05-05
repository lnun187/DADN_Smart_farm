const mongoose = require('mongoose');

const pumprecordSchema = new mongoose.Schema({
  RC_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
  Pump: String,
});

module.exports = mongoose.model('PumpRecord', pumprecordSchema);
