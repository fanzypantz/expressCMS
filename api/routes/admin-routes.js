const fs = require('fs-extra');
const isAdmin = require('../auth/middleware/isAdmin');
const modelTemplate = require('../templates/model');
// const utilities = require('../utilities');
const { Router } = require('express');
const router = Router();
// Models
// eslint-disable-next-line no-unused-vars
const User = require('../collections/user/model/user');

// Routes
router.post('/admin/addCollection', isAdmin, function(req, res, next) {
  console.log('writing this file now: ');
  fs.outputFile(
    `./api/collections/${req.body.name}/model/${req.body.name}.js`,
    modelTemplate.getTemplate({ name: 'user' }),
    function(err) {
      if (err) {
        console.log('errors: ', err);
      } else {
        console.log('file was saved');
      }
    }
  );

  res.json({
    message: 'test works, only an auth user can see this',
    success: true,
    path: '/'
  });
});

module.exports = router;
