const express = require('express');
const session = require("express-session");
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Connect to database
const db = require('./db/connection');
// App
const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());

//////////////////////////////////
// CORS fix
//////////////////////////////////
const whitelist = ['http://localhost:3000', ];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin))
      return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  }
};
app.use(cors(corsOptions));

//////////////////////////////////
// Passport
//////////////////////////////////
// Require passport as we have configured it
const passport = require("./auth/passport");
// Set session
let sessionExpiration = new Date();
//  Add x amount of days to session expiration
sessionExpiration.setDate(sessionExpiration.getDate() + process.env.MAX_SESSION || 30);
app.use(session({
  secret: "multimonitorsetup",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: sessionExpiration.getTime()
  }
}));
// Tell app to use the passport session
app.use(passport.initialize());
app.use(passport.session());

//////////////////////////////////
// Routes
//////////////////////////////////
require("./routes/auth-routes.js")(app);
require("./routes/base-routes.js")(app);

//////////////////////////////////
// Server
//////////////////////////////////
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});