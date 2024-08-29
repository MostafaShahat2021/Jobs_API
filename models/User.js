const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

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
      minlength: [6, 'Password must be at least 8 characters long'],
    },
  },
  { timestamps: true }
);

// Middleware to hash the user's password before saving it to the database
UserSchema.pre("save", async function () {
  // Generate a salt with a cost factor of 10
  const salt = await bcrypt.genSalt(10)
  // Hash the user's password with the generated salt
  this.password = await bcrypt.hash(this.password, salt)
});

// Method to create a JSON Web Token (JWT) for the user
UserSchema.methods.createJWT = function () {
  // Sign a new JWT with the user's ID and name, using a secret key and setting an expiration time of 30 days
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

// Compare the candidate password with the stored password hash
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema);
