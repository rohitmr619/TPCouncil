const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  playerTag: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  trophyCount: {
    type: Number,
    default: 0
  },
  gameTags: {
    clashRoyale: {
      type: String,
      default: ''
    },
    clashOfClans: {
      type: String,
      default: ''
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema); 