const mongoose = require('mongoose');

const pump2recordSchema = new mongoose.Schema({
  RC_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
  Value: String,
});

module.exports = mongoose.model('Pump2Record', pump2recordSchema);
