module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    if (req.user.admin) {
      return next();
    }
  }
  // If the user isn't' logged in, return early
  return res.json({
    success: false
  });
};
