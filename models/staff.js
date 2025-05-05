const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Status: Boolean,
});

module.exports = mongoose.model('Staff', staffSchema);