// Imports
const modelConfig = require('../config/config.json');
const utilities = require('../../../utilities');
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
  const excludedValues = utilities.getExcluded(modelConfig);

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

router.post('/admin/collections/:name/getOne', isAdmin, function(
  req,
  res,
  next
) {
  const userId = req.body.userId;
  if (userId) {
    // Exclude columns based on config file
    const excludedValues = utilities.getExcluded(modelConfig);

    User.findById(userId, excludedValues, function(err, user) {
      if (err) {
        console.log('errors: ', err);
        res.json({
          errors: err,
          success: false
        });
      }
      res.json({
        user,
        success: true
      });
    });
  }
});

module.exports = router;
