const { capitalize } = require('../utilities');

module.exports = {
  getTemplate: (data) => {
    const name = data.name;
    const uppercaseName = capitalize(data.name);

    return `
    // Imports
    const modelConfig = require('../config/config.json');
    const utilities = require('../../../utilities');
    const isAdmin = require('../../../auth/middleware/isAdmin');
    const ${uppercaseName} = require('../model/${name}');
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

      ${uppercaseName}.find({}, excludedValues, function(err, ${name}s) {
        if (err) {
          console.log('errors: ', err);
          res.json({
            errors: err,
            success: false
          });
        }
        res.json({
          ${name}s,
          success: true
        });
      });
    });

    router.post('/admin/collections/:name/getOne', isAdmin, function(
      req,
      res,
      next
    ) {
      const ${name}Id = req.body.${name}Id;
      if (${name}Id) {
        // Exclude columns based on config file
        const excludedValues = utilities.getExcluded(modelConfig);

        ${uppercaseName}.findById(${name}Id, excludedValues, function(err, ${name}) {
          if (err) {
            console.log('errors: ', err);
            res.json({
              errors: err,
              success: false
            });
          } else {
            res.json({
              ${name},
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
      const ${name}Id = req.body.data._id;
      if (${name}Id) {
        ${uppercaseName}.findById(${name}Id, function name(err, ${name}) {
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
              if (${name}[canEdit[i]] !== req.body.data[canEdit[i]]) {
                ${name}[canEdit[i]] = req.body.data[canEdit[i]];
              }
            }

            // Save and return results
            ${name}.save(function(err, ${name}) {
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
      const new${uppercaseName} = new ${uppercaseName}(req.body.data);
      new${uppercaseName}.save((err) => {
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

    `;
  }
};
