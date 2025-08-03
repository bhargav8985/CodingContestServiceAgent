const mongoose = require('mongoose');

const ContestSettingSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  minRating: { type: Number, default: 0 }
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: String,
  picture: String,
  googleId: String,
  provider: String,

  platforms: [{ type: String }],
  contestSettings: [ContestSettingSchema],
  notificationTime: String, // e.g., "08:00"
  notificationsEnabled: { type: Boolean, default: true },

  // ✅ NEW FIELD
  lastNotified: { type: Date, default: null }
});

module.exports = mongoose.model('User', UserSchema);
