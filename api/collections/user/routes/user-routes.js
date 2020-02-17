// Imports
const isAdmin = require('../auth/middleware/isAdmin');
const { Router } = require('express');
const router = Router();

// Routes
router.post('/admin/test', isAdmin, function(req, res, next) {
  res.json({
    message: 'test works, only an auth user can see this',
    success: true,
    path: '/'
  });
});

module.exports = router;
