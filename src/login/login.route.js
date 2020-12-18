const { promisify } = require('util');

const Twig = require('twig');
const renderFilePromisified = promisify(Twig.renderFile);

module.exports = function setLoginRoute(app) {
  app.get('/login', async (req, res) => {
    try {
      const html = await renderFilePromisified('./src/login/login.twig');
      res.send(html);
    } catch (err) {
      console.error(err);
    }
  });

  app.post('/login', (req, res) => {
    if (!req.body.name) {
      return res.redirect('/login');
    }

    const json = JSON.stringify({ name: req.body.name });

    res.cookie('currentUser', json, { maxAge: 1000 * 60 * 60 });

    return res.redirect('/');
  });
};
