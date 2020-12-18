const { promisify } = require('util');
const { nanoid } = require('nanoid');
const Twig = require('twig');

const redis = require('../app/services/redis.service');

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

  app.post('/login', async (req, res) => {
    console.log(req.body);
    if (!req.body.name) {
      return res.redirect('/login');
    }

    let users = JSON.parse(await redis.getPromisified('users'));

    if (!users) {
      users = {};
    }

    // Check if user exist
    let userJson =
      users[req.body.name] &&
      (await redis.getPromisified(`user:${users[req.body.name]}`));

    let user = userJson && JSON.parse(userJson);

    if (!user) {
      // Create new user
      const userId = nanoid();
      user = { name: req.body.name, id: userId };
      userJson = JSON.stringify(user);

      await redis.setPromisified(`user:${userId}`, userJson);

      users[user.name] = user.id;
      await redis.setPromisified(`users`, JSON.stringify(users));
    }

    res.cookie('currentUser', userJson, { maxAge: 1000 * 60 * 60 });

    return res.redirect('/');
  });
};
