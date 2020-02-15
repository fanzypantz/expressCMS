// Models
const User = require('../db/models/user');
// Auth imports
const passport = require('../auth/passport');
const nodemailer = require('../auth/nodemailer');
const gmailTransport = nodemailer.GmailTransport;
const isAuthenticated = require('../auth/middleware/isAuthenticated');
const hbs = require('nodemailer-express-handlebars');
const jwt = require('jwt-simple');

// Routes
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      console.log('info: ', info);
      if (err) {
        return next(err);
      }
      // No user found
      if (!user) {
        return res.json({
          success: false,
          error: info
        });
      }
      // User found, logging in
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.json({
          success: true,
          path: '/',
          user: {
            username: req.user.username,
            email: req.user.email,
            id: req.user.id
          }
        });
      });
    })(req, res, next);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/signup', function(req, res) {
    console.log(req.body);

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    newUser.save((err) => {
      console.log('saving');
      if (err) {
        console.log('err: ', err.errors);
        res.json({
          errors: err.errors
        });
        return;
      }
      console.log('User Created!');

      res.json({
        success: true,
        user: {
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          id: newUser.id
        },
        path: '/auth/login'
      });
    });
  });

  // Route for logging user out
  app.get('/logout', isAuthenticated, function(req, res) {
    req.logout();
    res.json({
      success: true,
      path: '/'
    });
  });

  // Route for requesting password reset
  app.post('/forgot_password', function(req, res) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({
        success: false
      });
    }

    User.findOne(
      {
        email: req.body.email
      },
      function name(err, user) {
        if (err) {
          console.log('errors: ', err);
        }
        if (user) {
          const timeNow = new Date();
          timeNow.setHours(timeNow.getHours() + 1);
          const payload = {
            userId: user.id,
            exp: timeNow.getTime()
          };
          const token = jwt.encode(payload, secret);
          user.password_token = token;
          user.save();

          nodemailer.ViewOption(gmailTransport, hbs);
          const data = {
            from: process.env.GMAIL_USER_NAME || 'auth_email_address@gmail.com',
            to: user.email,
            subject: 'Password reset requested!',
            template: 'forgot-password-email',
            context: {
              url:
                process.env.APP_URL + '/api/auth/reset_password?token=' + token,
              name: user.name
            }
          };
          console.log('data: ', data);
          gmailTransport.sendMail(data, function(err, info) {
            if (!err) {
              console.log('info: ', info);
              return res.json({
                success: true,
                message: 'Password reset request has been sent to your email.'
              });
            } else {
              console.log('errors: ', err);
              return res.json({
                success: false,
                errors: err
              });
            }
          });
        } else {
          return res.json({
            success: false,
            userError: 'User with that email does not exist.'
          });
        }
      }
    );
  });

  // Route to reset password
  app.post('/reset_password', function(req, res) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({
        success: false
      });
    }
    const payload = jwt.decode(req.body.token, secret);

    User.findOne(
      {
        id: payload.id
      },
      function name(err, user) {
        if (err) {
          console.log('errors: ', err);
        }
        if (user) {
          if (user.password_token === req.body.token) {
            user.password = req.body.password;
            user.password_token = '';
            user.save(function(err, user) {
              if (err) {
                console.log('error: ', err);

                return res.json({
                  success: false,
                  userError: err.errors.password.message
                });
              } else {
                nodemailer.ViewOption(gmailTransport, hbs);
                const data = {
                  from:
                    process.env.GMAIL_USER_NAME ||
                    'auth_email_address@gmail.com',
                  to: user.email,
                  subject: 'Password reset has been successful!',
                  template: 'reset-password-email',
                  context: {
                    name: user.name
                  }
                };
                gmailTransport.sendMail(data, function(err, info) {
                  if (!err) {
                    console.log('info: ', info);
                    return res.json({
                      success: true,
                      path: '/auth/login'
                    });
                  } else {
                    console.log('errors: ', err);
                    return res.json({
                      success: false,
                      errors: err
                    });
                  }
                });
              }
            });
          } else {
            return res.json({
              success: false,
              userError: 'Token does not match'
            });
          }
        } else {
          return res.json({
            success: false,
            userError: 'Could not find user.'
          });
        }
      }
    );
  });

  // Route for getting some data about our user to be used client side
  app.get('/user_data', isAuthenticated, function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username
      });
    }
  });
};
