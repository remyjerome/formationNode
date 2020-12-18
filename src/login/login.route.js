const { promisify } = require('util');
const redis = require("redis");

const Twig = require('twig');

const client = redis.createClient(process.env.REDIS_URL, {
  no_ready_check: true
});

const renderFilePromisified = promisify(Twig.renderFile);
const getPromisfied = promisify(client.get).bind(client);
const setPromisfied = promisify(client.set).bind(client);

client.on("error", function (error) {
  console.error(error);
});

module.exports = async function setLoginRoute(app) {
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

    await setPromisfied('user', json)

    getPromisfied()

    res.cookie('currentUser', json, { maxAge: 1000 * 60 * 60 });

    return res.redirect('/');
  });
};