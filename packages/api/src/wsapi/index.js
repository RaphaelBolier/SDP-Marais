const { getGames } = require('../services/game');

let io = undefined;
const clients = [];
process.on('SIGINT', () => {
    console.log('Arret du serveur');
    process.exit();
    });
exports.initSocketProvider = (socketIO) => {
    io = socketIO;
    io.on("connection", (socket) => {
        console.log("NEW CLIENT: ", socket.id);
        clients.push({
            socket,
            connected: true,
        });
        
        socket.on("playername", (name) => {
            const player = clients.find((client) => client.socket.id === socket.id);
            if (player) player.name = name;
        });

        socket.on("playerposition", ({ id, x, y, direction }) => {
            const game = getGames().find((game) => game.players.find((player) => player.id === id));
            if (game) {
                io.sockets.in(game.id).emit('playerposition', { id, x, y, direction });
            }
        });

        socket.on("playerlist", ({ roomId }) => {
            const game = getGames().find((game) => game.id === roomId);
            if (game) {
                const playerList = game.players.filter((p) => p.id !== socket.id);
                socket.emit('playerlist', { playerList });  
            }
        });

        socket.on("startgame", ({ roomId }) => {
            const game = getGames().find((game) => game.id === roomId);
            if (game) {
                const roleList = game.players.map((player, index) => ({
                    id: player.id,
                    role: index === 0 ? 'impostor' : 'crewmate',
                }));
                io.sockets.in(game.id).emit('rolelist', { roleList });  
            }
        });

        socket.on("kill", ({ roomId, targetId }) => {
            const game = getGames().find((game) => game.id === roomId);
            if (game) {
                io.sockets.in(game.id).emit('playerkilled', { targetId });  
            }
        });

        socket.on("sendmessage", ({roomId, name, msg}) => {
            const game = getGames().find((game) => game.id === roomId);
            if (game) {
                io.sockets.in(game.id).emit('newmessage', { name, msg });  
            }
        });

        socket.on("report", ({roomId, name}) => {
            const game = getGames().find((game) => game.id === roomId);
            if (game) {
                io.sockets.in(game.id).emit('report', { name });  
            }
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