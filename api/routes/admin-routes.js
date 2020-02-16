// eslint-disable-next-line import/order
const { Router } = require('express');
const router = Router();
// Models
// eslint-disable-next-line no-unused-vars
const User = require('../db/models/user');
// Auth imports
const isAdmin = require('../auth/middleware/isAdmin');

// Routes

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post('/test', isAdmin, function(req, res, next) {
  res.json({
    success: true,
    path: '/'
  });
});

module.exports = router;
