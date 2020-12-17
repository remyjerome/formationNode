const { promisify } = require('util')

const Twig = require('twig')

const renderFilePromisified = promisify(Twig.renderFile)

module.exports = function setHomeRoute(app) {
  app.get('/', async (req, res) => {

    try {
      const html = await renderFilePromisified('./src/home/home.twig', { message: 'bar' });
      res.send(html)
    } catch (err) {
      console.error(err)
    }
  })

  app.get('/coucou', (req, res) => {
    res.send('Orange!');
  })
}
