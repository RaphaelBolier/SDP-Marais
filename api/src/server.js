const express = require('express');
const cors = require('cors');
const app = express();
const socketIOHttpServer = require('http').createServer(app);
const { initSocketProvider } = require('./wsapi');
const io = require("socket.io")(socketIOHttpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    }
});
initSocketProvider(io);
socketIOHttpServer.listen(25565);

const game = require('./routes/game');


const port = 3000;
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());

app.use('/game', game);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});