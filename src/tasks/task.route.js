const isLogged = require('../login/login.middleware');
const { nanoid } = require('nanoid');

const redis = require('../app/services/redis.service');

const sockets = require('../app/services/sockets');


module.exports = function setTaskRoute(app) {
  app.post('/task', isLogged, async (req, res) => {
    const taskId = nanoid();

    const task = {
      id: taskId,
      label: req.body.taskLabel
    };

    const tasks = JSON.parse(await redis.getPromisified('tasks')) || [];

    await redis.setPromisified(`tasks`, JSON.stringify([...tasks, task]));

    const socket = sockets.getByUserId(req.currentUser.id)

    console.log(socket)
    if (socket) {
      console.log('sssss')
      socket.broadcast.emit('new-task', task)
      console.log('eeee')
    } else {
      console.log('else')
      sockets.io.emit('new-task', task)
    }

    if (req.headers['accept'].includes('text/html')) {
      return res.redirect('/');
    }

    return res.json({ task });
  });

  app.get('/tasks', async (req, res) => {
    const tasks = JSON.parse(await redis.getPromisified('tasks')) || [];

    if (req.headers['accept'].includes('text/html')) {
      return res.send('html');
    }
    return res.json({ tasks });
  });
};
