const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    User_Name: String,
    HashPassword: String,
    User_Role: String,
});

module.exports = mongoose.model('User', userSchema);
