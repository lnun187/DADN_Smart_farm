const mongoose = require('mongoose');

const humrecordSchema = new mongoose.Schema({
  RC_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
  Humidity: String,
});

module.exports = mongoose.model('HumRecord', humrecordSchema);
