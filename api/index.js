// eslint-disable-next-line no-unused-vars
const db = require('./db/connection');
const passport = require('./auth/passport');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// App
app.use(morgan('tiny'));

/// ///////////////////////////////
// Router
/// ///////////////////////////////

// Create express router
const router = express.Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

/// ///////////////////////////////
// Passport
/// ///////////////////////////////

// Tell app to use the passport session
app.use(passport.initialize());
app.use(passport.session());

/// ///////////////////////////////
// Routes
/// ///////////////////////////////
const authRoutes = require('./routes/auth-routes.js');
const baseRoutes = require('./routes/base-routes.js');
const adminRoutes = require('./routes/admin-routes.js');

app.use(authRoutes);
app.use(baseRoutes);
app.use(adminRoutes);

/// ///////////////////////////////
// Server
/// ///////////////////////////////
module.exports = {
  path: '/api',
  handler: app
};
