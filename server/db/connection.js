const mongoose = require('mongoose');
const connectionString =
  'mongodb://localhost/' + process.env.MONGODB_URI || 'mevnStack';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

module.exports = db;
