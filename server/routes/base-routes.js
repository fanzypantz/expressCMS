// Requiring path to so we can use relative routes to our HTML files
let path = require("path");

// Models
const user = require('../db/models/user');

// Routes
module.exports = function (app) {
  app.get('/', (req, res) => {
    res.json({
      message: "Nothing to see here!"
    });
  });

  app.get('/users/:userId', (req, res) => {
    user.getUser(req.params.userId).then((user) => {
      res.json(user);
    });
  });

  app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {
      res.json(message);
    }).catch((error) => {
      res.status(500);
      res.json(error);
    });
  });
};