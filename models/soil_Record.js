const mongoose = require('mongoose');

const soilrecordSchema = new mongoose.Schema({
  RC_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
  SoilMoisture: String,
});

module.exports = mongoose.model('SoilRecord', soilrecordSchema);
