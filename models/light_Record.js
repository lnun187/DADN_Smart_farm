const mongoose = require('mongoose');

const lightrecordSchema = new mongoose.Schema({
  RC_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
  Value: String,
});

module.exports = mongoose.model('LightRecord', lightrecordSchema);
