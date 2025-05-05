const mongoose = require('mongoose');

const wateringSchema = new mongoose.Schema({
    Time: String,
    Description: String,
    Area_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
});

module.exports = mongoose.model('Watering', wateringSchema);
