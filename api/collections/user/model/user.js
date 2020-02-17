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

// Pre Methods
userSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.password = privateMethods.hashPassword(this.password);
  this.updated_at = currentDate;
  next();
});

// Export model
const User = mongoose.model('User', userSchema);
// Fix indexing issues
User.createIndexes();
module.exports = User;
