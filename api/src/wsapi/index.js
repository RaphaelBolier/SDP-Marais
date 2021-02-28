let io = undefined;
const clients = [];

exports.initSocketProvider = (socketIO) => {
    io = socketIO;
    io.on("connection", (socket) => {
        console.log("New client connected");
        clients.push({
            socket,
            connected: true,
        });
    });
}

exports.socketIO = () => io;

exports.joinRoom = (clientId, roomId) => {
    const socket = clients.find((client) => client.socket.id === clientId)?.socket;
    if(socket) {        
        console.log(socket);
        socket.rooms.forEach((room) => {
            if (room != roomId) {
                socket.leave(room);
            }
        });
        console.log(`Client ${clientId} joined room ${roomId}`);
        socket.join(roomId);
        setInterval(() => {
            io.sockets.in(roomId).emit('message', `room n°${roomId}`);
        }, 1000);
    } else {
        throw new Error('Client ' + clientId + ' not found.');
    }
}