//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

//We will need the models folder to check passport agains
const User = require("../db/models/user");

// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function (email, password, done) {
    // When a user tries to sign in this code runs
    User.findOne({
      email: email
    }, function (err, user) {
      if (err) {
        return done(null, false, {
          message: "Could not find an user with this email."

        });
      }
      if (User.validatePassword(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;