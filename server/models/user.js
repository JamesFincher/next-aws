const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
    trim: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
});
