let io = undefined;
const clients = [];

exports.initSocketProvider = (socketIO) => {
    io = socketIO;
    io.on("connection", (socket) => {
        console.log("NEW CLIENT: ", socket.id)

        clients.push({
            socket,
            connected: true,
        });

        socket.on("playername", (name) => {
            const player = clients.find((client) => client.socket.id === socket.id);
            if (player) player.name = name;
        });
    });
}

exports.socketIO = () => io;

exports.joinRoom = (clientId, roomId) => {
    const player = clients.find((client) => client.socket.id === clientId);
    const socket = player?.socket;
    if(socket) {        
        socket.rooms.forEach((room) => {
            if (room != roomId) {
                socket.leave(room);
            }
        });
        console.log(`Client ${clientId} joined room ${roomId}`);
        io.sockets.in(roomId).emit('newplayer', { name: player.name, id: socket.id });
        socket.join(roomId);
    } else {
        throw new Error('Client ' + clientId + ' not found.');
    }
}