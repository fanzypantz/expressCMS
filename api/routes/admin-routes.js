// Models
// eslint-disable-next-line no-unused-vars
const User = require('../db/models/user');
// Auth imports
const isAuthenticated = require('../auth/middleware/isAuthenticated');

// Routes
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/test', isAuthenticated, function(req, res, next) {
    res.json({
      success: true,
      path: '/'
    });
  });
};
