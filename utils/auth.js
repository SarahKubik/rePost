const withAuth = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else if (req.params.id && req.params.id != req.session.user_id) {
    res.status(400).json({message: "You cannot modify other user's account"})
  } else {
    next();
  }
};

module.exports = withAuth;
