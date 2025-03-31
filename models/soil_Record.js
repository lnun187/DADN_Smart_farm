const mongoose = require('mongoose');

const soilrecordSchema = new mongoose.Schema({
  RC_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
  Value: String,
});

module.exports = mongoose.model('SoilRecord', soilrecordSchema);
