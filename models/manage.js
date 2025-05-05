const mongoose = require('mongoose');

const manageSchema = new mongoose.Schema({
    Manager_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
    Staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
});

module.exports = mongoose.model('Manage', manageSchema);
