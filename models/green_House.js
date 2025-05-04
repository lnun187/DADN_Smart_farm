const mongoose = require('mongoose');

const greenhouseSchema = new mongoose.Schema({
    address: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  
  module.exports = mongoose.model('Greenhouse', greenhouseSchema);