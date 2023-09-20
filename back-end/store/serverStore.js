let socketInstances = new Map();

const getReceiverSocketsInstances = () => {

    let receiverSocketInstances = new Map();

    socketInstances.forEach ((value, key) => {
        if (value === "receiver") {
            receiverSocketInstances.set(key, value)
        }
      })

    return receiverSocketInstances
}

const getSocketInstances = () => {
    return socketInstances
}

const addSenderSocketInstance = (socketId) => {
    try{
        socketInstances.set(socketId, "sender")
        console.log("socket : ", socketId, " ajoutée avec succès");
        return console.log(socketInstances)
    } catch (e) {
        return console.error("erreur lors de l'enregistrement du socket", e)
    }
}

const addReceiverSocketInstance = (socketId) => {
    try{
        socketInstances.set(socketId, "receiver")
        console.log("socket : ", socketId, " ajoutée avec succès");
        return console.log(socketInstances)
    } catch (e) {
        return console.error("erreur lors de l'enregistrement du socket", e)
    }
}

const removeSocketInstance = (socketId) => {
    
    try{
        if (socketInstances.has(socketId)) {
            socketInstances.delete(socketId)
        }
        return console.log("socket restants : ", socketInstances)
    } catch(e) {
        return console.log("Erreur lors de la suppression du socket :",e)
    }

}

module.exports = { getSocketInstances, getReceiverSocketsInstances, addSenderSocketInstance, addReceiverSocketInstance, removeSocketInstance }