const socketIO = require('socket.io');

const server = require('./server');

const sockets = require('./app/services/sockets');

const redisService = require('./app/services/redis.service');

const io = socketIO(server);
sockets.setIo(io);

io.on('connection', (socket) => {
    console.log('user connected', socket.handshake.query.userId);
    socket.userId = socket.handshake.query.userId;
    sockets.add(socket)

    socket.on('disconnect', () => {
        console.log('user disconnected');
        sockets.remove(socket)
    })

    socket.on('new-task', async (task) => {
        const tasks = JSON.parse(await redisService.getPromisified('tasks')) || [];
        await redisService.setPromisified(`tasks`, JSON.stringify([...tasks, task]));
    })
})

module.exports = io;