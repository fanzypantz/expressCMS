const isAdmin = require('../auth/middleware/isAdmin');
const modelTemplate = require('../templates/model');
const routesTemplate = require('../templates/routes');
const methodsTemplate = require('../templates/privateMethods');
const schemaTemplate = require('../templates/schema');
const collectionList = require('../collections/collections.json');
const utilities = require('../utilities');
const { Router } = require('express');
const router = Router();

// Routes
router.post('/admin/addCollection', isAdmin, function(req, res, next) {
  console.log('Writing templates to disk');
  if (!collectionList.names.includes(req.body.name)) {
    utilities
      .writeToFile(
        `./api/collections/${req.body.name}/model/${req.body.name}.js`,
        modelTemplate.getTemplate({ name: req.body.name })
      )
      .catch((err) => {
        console.log('errors: ', err);
      });
    utilities
      .writeToFile(
        `./api/collections/${req.body.name}/routes/routes.js`,
        routesTemplate.getTemplate({ name: req.body.name })
      )
      .catch((err) => {
        console.log('errors: ', err);
      });
    utilities
      .writeToFile(
        `./api/collections/${req.body.name}/methods/privateMethods.js`,
        methodsTemplate.getTemplate({ name: req.body.name })
      )
      .catch((err) => {
        console.log('errors: ', err);
      });
    utilities
      .writeToFile(
        `./api/collections/${req.body.name}/config/config.json`,
        JSON.stringify(req.body.defaultConfig)
      )
      .catch((err) => {
        console.log('errors: ', err);
      });
    utilities
      .writeToFile(
        `./api/collections/${req.body.name}/config/schema.json`,
        JSON.stringify(req.body.defaultSchema)
      )
      .catch((err) => {
        console.log('errors: ', err);
      });
    utilities
      .writeToFile(
        `./api/collections/${req.body.name}/config/schema.js`,
        schemaTemplate.getTemplate(
          req.body.defaultSchema,
          req.body.defaultConfig
        )
      )
      .catch((err) => {
        console.log('errors: ', err);
      });

    // Add the new collection to the list
    collectionList.names.push(req.body.name);
    utilities
      .writeToFile(
        `./api/collections/collections.json`,
        JSON.stringify(collectionList)
      )
      .catch((err) => {
        console.log('errors: ', err);
      });

    res.json({
      message: 'Collection was created.',
      success: true
    });
  } else {
    res.json({
      message: 'A collection of that name already exists!',
      success: false
    });
  }
});

module.exports = router;
