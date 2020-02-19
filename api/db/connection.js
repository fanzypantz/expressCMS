const mongoose = require('mongoose');
const connectionString =
  'mongodb://localhost/' + process.env.MONGODB_URI || 'mevnStack';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

module.exports = db;
