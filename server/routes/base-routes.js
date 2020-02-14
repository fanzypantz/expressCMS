// Models
const user = require('../db/models/user');

// Routes
module.exports = function(app) {
  app.get('/', (req, res) => {
    res.json({
      message: 'Nothing to see here!'
    });
  });

  app.get('/users/:userId', (req, res) => {
    user.getUser(req.params.userId).then((user) => {
      res.json(user);
    });
  });
};
