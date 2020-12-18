const { promisify } = require('util');
const redis = require('redis');
const { nanoid } = require('nanoid');
const Twig = require('twig');

const client = redis.createClient(process.env.REDIS_URL, {
  no_ready_check: true
});

const renderFilePromisified = promisify(Twig.renderFile);
const getPromisfied = promisify(client.get).bind(client);
const setPromisfied = promisify(client.set).bind(client);

client.on('error', function(error) {
  console.error(error);
});

module.exports = function setLoginRoute(app) {
  app.get('/login', async (req, res) => {
    try {
      const html = await renderFilePromisified('./src/login/login.twig');
      res.send(html);
    } catch (err) {
      console.error(err);
    }
  });

  app.post('/login', async (req, res) => {
    if (!req.body.name) {
      return res.redirect('/login');
    }

    let users = JSON.parse(await getPromisfied(`users`));

    if (!users) {
      users = {};
    }

    // Check if user exist
    let userJson =
      users[req.body.name] &&
      (await getPromisfied(`user:${users[req.body.name]}`));

    let user = userJson && JSON.parse(userJson);

    if (!user) {
      // Create new user
      const userId = nanoid();
      user = { name: req.body.name, id: userId };
      userJson = JSON.stringify(user);

      await setPromisfied(`user:${userId}`, userJson);

      users[user.name] = user.id;
      await setPromisfied(`users`, JSON.stringify(users));
    }

    res.cookie('currentUser', userJson, { maxAge: 1000 * 60 * 60 });

    return res.redirect('/');
  });
};
