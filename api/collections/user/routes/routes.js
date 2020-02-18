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
      } else {
        res.json({
          user,
          success: true
        });
      }
    });
  }
});

router.post('/admin/collections/:name/saveOne', isAdmin, async function(
  req,
  res,
  next
) {
  const userId = req.body.data._id;
  if (userId) {
    User.findById(userId, function name(err, user) {
      if (err) {
        console.log('errors: ', err);
        res.json({
          errors: err,
          success: false
        });
      } else {
        // Exclude columns based on config file
        const canEdit = utilities.getEditable(modelConfig);

        // Dynamically assign the new variables
        for (let i = 0; i < canEdit.length; i++) {
          if (user[canEdit[i]] !== req.body.data[canEdit[i]]) {
            user[canEdit[i]] = req.body.data[canEdit[i]];
          }
        }

        // Save and return results
        user.save(function(err, user) {
          if (err) {
            res.json({
              errors: err,
              success: false
            });
          } else {
            res.json({
              success: true
            });
          }
        });
      }
    });
  }
});

router.post('/admin/collections/:name/create', isAdmin, function(req, res) {
  const newUser = new User(req.body.data);
  newUser.save((err) => {
    if (err) {
      console.log('err: ', err.errors);
      res.json({
        errors: err.errors
      });
      return;
    }
    res.json({
      success: true
    });
  });
});

module.exports = router;
