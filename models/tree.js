const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    name: String,
    plantingTime: Date,
    alive: Boolean,
    greenhouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Greenhouse' }
  });
  
  module.exports = mongoose.model('Tree', treeSchema);