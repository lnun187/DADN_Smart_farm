const mongoose = require('mongoose');

const wateringSchema = new mongoose.Schema({
    Time: String,
    Area_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    Status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    Note: String,
});

module.exports = mongoose.model('Watering', wateringSchema);
