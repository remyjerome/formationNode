const isLogged = require('../login/login.middleware');
const { nanoid } = require('nanoid');

const redis = require('../app/services/redis.service');

module.exports = function setTaskRoute(app) {
    app.post('/task', isLogged, async (req, res) => {

        const taskId = nanoid();

        const task = {
            id: taskId,
            label: req.body.taskLabel,
        }

        let tasks = JSON.parse(await redis.getPromisified('tasks')) || [];

        await redis.setPromisified(`tasks`, JSON.stringify([...tasks, task]));

        res.redirect('/')

    });
};
