const express = require("express");
const http = require("http");
const socketServer = require("./socketServer.js");
const cors = require("cors"); //pour permettre d'echanger des iformations entre les domaines 'PORTS' du même origine
// const mongoose = require("mongoose");

const app = express();
const port = 4000

// Active le middleware CORS, pas de sécuritée garantie
app.use(cors());

// Middleware pour parser les données en JSON
app.use(express.json());

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erreur serveur" });
});

const server = http.createServer(app);
socketServer.registerSocketServer(server);

// Démarrage du serveur
server.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
