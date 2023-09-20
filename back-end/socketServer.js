const webrtcSignalHandler = require ("./socketHandlers/webrtcSignalHandler.js");
const webrtcInitHandler = require ("./socketHandlers/webrtcInitHandler.js");
const disconnectHandler = require ("./socketHandlers/disconnectHandler.js");

const { addReceiverSocketInstance, addSenderSocketInstance } = require("./store/serverStore.js");

const registerSocketServer = (server) => {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    });

    io.on("connection", (socket) => {
        console.log("calling for connection");
        console.log(socket.id);

        socket.on("register", value => {
            if(value  === "receiver") {
                addReceiverSocketInstance(socket.id)
            }; 
            if (value === "sender") {
                addSenderSocketInstance(socket.id)
            }
        })

        //fonctions appelés pour le webrtc
        socket.on("webrtc-init", () => {
            webrtcInitHandler(socket)
        })

        socket.on("init-accepted", ({sender, receiver}) => {
            socket.to(receiver).emit("init-accepted", {
                sender: sender
            })
        })

        socket.on("webrtc-signal", data => {
            webrtcSignalHandler({
                io: io,
                sender: socket.id,
                receiver: data.receiver,
                signal: data.signal
            })
        })

        //----------------recording-------------
        socket.on("start-recording", ({salle, date}) => {
            startRecordingHandler(salle, date);
        })
        
        socket.on("recording", ({dataSize, fragment}) => {
            recordingHandler({dataSize, fragment});
        })

        socket.on("stop-recording", (date) => {
            stopRecordingHandler(date)
        })
        //----------------recording-------------

        //fonction appelé lors de la déconnexion d'un socket user/cams
        socket.on('disconnect', () => {
            disconnectHandler(socket.id);
        })
    });

}

module.exports = {
    registerSocketServer,
}