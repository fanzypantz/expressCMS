// eslint-disable-next-line import/order
const { Router } = require('express');
const router = Router();
// Models
const user = require('../db/models/user');

// Routes

router.get('/', (req, res) => {
  // check database connectivity and any other staff you want here
  // add any errors in an array
  const errors = [];
  if (errors.length > 0) {
    return res.status(500).json({ health: false, errors });
  }
  return res.status(200).send({ health: true });
});

router.get('/users/:userId', (req, res) => {
  user.getUser(req.params.userId).then((user) => {
    res.json(user);
  });
});

module.exports = router;
