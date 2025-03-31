const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Manager', managerSchema);