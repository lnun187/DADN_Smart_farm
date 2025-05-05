const mongoose = require('mongoose');

const fanrecordSchema = new mongoose.Schema({
  RC_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
  Fan: String,
});

module.exports = mongoose.model('FanRecord', fanrecordSchema);
