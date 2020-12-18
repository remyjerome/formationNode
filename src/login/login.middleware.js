module.exports = function isLogged(req, res, next) {
  if (req.headers['accept'].includes('text/html')) {
    if (!req.cookies.currentUser) {
      return res.redirect('/login');
    }
    req.currentUser = JSON.parse(req.cookies.currentUser);

    return next();
  }

  if (!req.headers.api) {
    return res.json({ error: 'Need to be logged though api' });
  }

  req.currentUser = JSON.parse(req.headers.api).user;

  return next();
};
