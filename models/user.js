const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     User_Name: String,
//     HashPassword: String,
//     User_Role: String,
// });

// module.exports = mongoose.model('User', userSchema);
const userSchema = new mongoose.Schema({
    id : String,
    email: String,
    phone: String,
    hashPassword: String,
    role: { type: String, enum: ['Manager', 'Staff'] }
  });
  
  module.exports = mongoose.model('User', userSchema);