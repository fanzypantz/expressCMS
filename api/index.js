// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const db = require('./db/connection');
const passport = require('./auth/passport');
const utilities = require('./utilities');
const express = require('express');
const app = express();
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
// Dynamic Routes
/// ///////////////////////////////

// read the routes folder and require the different routes
fs.readdir('./api/routes', (err, files) => {
  if (err) {
    console.log('errors: ', err);
  }
  files.forEach((file) => {
    app.use(require('./routes/' + file));
  });
});

const collectionDirs = utilities.getDirectories('./api/collections');
collectionDirs.forEach((folder) => {
  console.log('folder: ', folder);
  app.use(require('./collections/' + folder + '/routes/routes'));
});

/// ///////////////////////////////
// Server
/// ///////////////////////////////
module.exports = {
  path: '/api',
  handler: app
};
