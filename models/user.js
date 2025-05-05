const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Email: String,
    Name: String,
    HashPassword: String,
    Role: String,
    Phone: String
});

module.exports = mongoose.model('User', userSchema);
