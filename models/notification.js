const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['note', 'warning', 'system'], default: 'note' },
  title: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);
