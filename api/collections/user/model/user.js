// Default Imports
const userConfig = require('../config/shema');
const privateMethods = require('../methods/privateMethods.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema(userConfig.schema);

// Instance Methods

// Static Methods
const bcrypt = require('bcryptjs');
userSchema.statics.validatePassword = function(password, storedPassword) {
  return bcrypt.compareSync(password, storedPassword);
};

// Path Methods
// Check if the password has changed between save
// If it is, hash the new password and add it
userSchema.path('password').set(function(newVal) {
  if (newVal !== this.password) {
    return privateMethods.hashPassword(newVal);
  }
});

// Pre Methods
userSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Export model
const User = mongoose.model('User', userSchema);
// Fix indexing issues
User.createIndexes();
module.exports = User;
