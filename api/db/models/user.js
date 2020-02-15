// Imports
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Private functions
const validateUsername = (username) => {
  const re = /^[a-z0-9_-]{3,45}$/;
  return re.test(username);
};

const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  const re = /^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/;
  return re.test(password);
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: [true, 'Please provide an username'],
    validate: [validateUsername, 'Please fill in a valid username']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    validate: [
      validatePassword,
      'Please fill in a password with at least 8 characters, one uppercase, one number one special character.'
    ]
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    validate: [validateEmail, 'Please fill in a valid email address.']
  },
  admin: { type: Boolean, default: false },
  location: String,
  meta: {
    age: Number,
    website: String
  },
  password_token: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

userSchema.statics.validatePassword = function(password, storedPassword) {
  return bcrypt.compareSync(password, storedPassword);
};

userSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.password = hashPassword(this.password);
  this.updated_at = currentDate;
  next();
});

// Export model
const User = mongoose.model('User', userSchema);
// Fix indexing issues
User.createIndexes();
module.exports = User;
