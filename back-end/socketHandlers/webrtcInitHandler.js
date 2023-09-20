const { getReceiverSocketsInstances } = require("../store/serverStore.js");

const webrtcInitHandler = (socket) => {

    const receiverSockets = getReceiverSocketsInstances().keys();

    for (const socketId of receiverSockets) {

        socket.to(socketId).emit("webrtc-init", {
            sender: socket.id,
        })
    }
}

module.exports = webrtcInitHandler