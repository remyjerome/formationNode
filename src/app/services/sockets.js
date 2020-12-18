class Sockets {
    constructor() {
        this._sockets = {}
    }

    setIo(io) {
        this.io = io
    }

    add(socket) {
        this._sockets[socket.userId] = socket
    }

    remove(socket) {
        delete this._sockets[socket.userId]
    }

    get all() {
        return Object.keys(this._sockets).map(userId => this._sockets[userId])
    }

    getAllBut(userId) {
        return Object.keys(this._sockets).filter(id => id !== userId).map(id => this._sockets[id])
    }

    getByUserId(userId) {
        return this._sockets[userId]
    }
}

module.exports = new Sockets()