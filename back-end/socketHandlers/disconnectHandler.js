const { removeSocketInstance } = require("../store/serverStore.js")

const disconnectHandler = (socketId) => {
    removeSocketInstance(socketId)
}

module.exports = disconnectHandler