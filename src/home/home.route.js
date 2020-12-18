const { promisify } = require('util');

const Twig = require('twig');

const renderFilePromisified = promisify(Twig.renderFile);

module.exports = function setHomeRoute(app) {
  app.get('/', async (req, res) => {
    if (!req.cookies.currentUser) {
      return res.redirect('/login');
    }

    try {
      const html = await renderFilePromisified('./src/home/home.twig', {
        message: 'Hello world'
      });
      res.send(html);
    } catch (err) {
      console.error(err);
    }
  });

  app.get('/coucou', (req, res) => {
    res.send('Orange!');
  });
};
