const { promisify } = require('util');

const Twig = require('twig');
const isLogged = require('../login/login.middleware');

const renderFilePromisified = promisify(Twig.renderFile);

module.exports = function setHomeRoute(app) {
  app.get('/', isLogged, async (req, res) => {

    try {
      const html = await renderFilePromisified('./src/home/home.twig', {
        currentUser: req.currentUser
      });
      console.log(req.currentUser);
      res.send(html);
    } catch (err) {
      console.error(err);
    }
  });

  app.get('/coucou', (req, res) => {
    res.send('Orange!');
  });
};
