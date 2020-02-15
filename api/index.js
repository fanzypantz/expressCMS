// eslint-disable-next-line no-unused-vars
const db = require('./db/connection');
const passport = require('./auth/passport');
const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// App
app.use(morgan('tiny'));
app.use(bodyParser.json());

/// ///////////////////////////////
// CORS fix
/// ///////////////////////////////

// const whitelist = ['http://localhost:3000'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) return callback(null, true);
//     callback(new Error('Not allowed by CORS'));
//   }
// };
//
// app.use(cors(corsOptions));

/// ///////////////////////////////
// Passport
/// ///////////////////////////////

// Set session
const sessionExpiration = new Date();
// Add x amount of days to session expiration
sessionExpiration.setDate(
  sessionExpiration.getDate() + process.env.MAX_SESSION || 30
);
app.use(
  session({
    secret: 'multimonitorsetup',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: sessionExpiration.getTime()
    }
  })
);
// Tell app to use the passport session
app.use(passport.initialize());
app.use(passport.session());

/// ///////////////////////////////
// Routes
/// ///////////////////////////////
require('./routes/auth-routes.js')(app);
require('./routes/base-routes.js')(app);
require('./routes/admin-routes.js')(app);

/// ///////////////////////////////
// Server
/// ///////////////////////////////
module.exports = {
  path: '/api',
  handler: app
};
