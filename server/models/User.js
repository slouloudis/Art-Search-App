const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoritePaintings: [
    {
      id: String,
      title: String,
      artist: String,
      imageUrl: String,
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
