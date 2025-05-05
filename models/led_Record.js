const mongoose = require('mongoose');

const ledrecordSchema = new mongoose.Schema({
  RC_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
  Led: String,
});

module.exports = mongoose.model('LedRecord', ledrecordSchema);
