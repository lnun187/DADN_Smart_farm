const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    Name: String,
    Planting_Time: String,
    Alive: Boolean,
    Temp_Min: Number,
    Temp_Max: Number,
    Humidity_Min: Number,
    Humidity_Max: Number,
    Light_Min: Number,
    Light_Max: Number,
    SoildMoisture_Min: Number,
    SoildMoisture_Max: Number,
    Aid: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
});

module.exports = mongoose.model('Tree', treeSchema);
