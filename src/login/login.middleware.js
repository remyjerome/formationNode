module.exports = function isLogged(req, res, next) {
  if (!req.cookies.currentUser) {
    return res.redirect('/login');
  }
  req.currentUser = JSON.parse(req.cookies.currentUser);

  next();
};