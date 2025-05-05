const mongoose = require('mongoose');

const temprecordSchema = new mongoose.Schema({
  RC_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
  Temperature: String,
});

module.exports = mongoose.model('TempRecord', temprecordSchema);
