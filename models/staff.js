const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  UM_Staff: {type: mongoose.Schema.Types.ObjectId, ref: 'Manager'},
});

module.exports = mongoose.model('Staff', staffSchema);