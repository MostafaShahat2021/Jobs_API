const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please Provide username'],
      minlength: [3, 'Username must be at least 3 characters long'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please Provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please Provide valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please Provide password'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
