// Imports
const modelConfig = require('../config/config.json');
const isAdmin = require('../../../auth/middleware/isAdmin');
const User = require('../model/user');
const { Router } = require('express');
const router = Router();

// Routes
router.get('/admin/collections/:name/getAll', isAdmin, function(
  req,
  res,
  next
) {
  // Exclude columns based on config file
  const excludedValues = {};
  Object.entries(modelConfig).forEach(([key, val]) => {
    if (!val.show) {
      excludedValues[key] = 0;
    }
  });

  User.find({}, excludedValues, function(err, users) {
    if (err) {
      console.log('errors: ', err);
      res.json({
        errors: err,
        success: false
      });
    }
    res.json({
      users,
      success: true
    });
  });
});

module.exports = router;
