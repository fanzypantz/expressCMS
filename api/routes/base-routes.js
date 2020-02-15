// Models
const user = require('../db/models/user');

// Routes
module.exports = function(app) {
  app.get('/', (req, res) => {
    // check database connectivity and any other staff you want here
    // add any errors in an array
    const errors = [];
    if (errors.length > 0) {
      return res.status(500).json({ health: false, errors });
    }
    return res.status(200).send({ health: true });
  });

  app.get('/users/:userId', (req, res) => {
    user.getUser(req.params.userId).then((user) => {
      res.json(user);
    });
  });
};
