const games = [];


exports.getGames = () => games;

exports.createGame = (name, id, isPublic) => {
    games.push({ name, id, players: [id], isPublic});
}

exports.joinGame = (clientId, gameId) => {
    const game = games.find((game) => game.id === gameId);
    if (game) {
        game.players.push(clientId);
    } else {
        throw new Error('Cannot find game: ', gameId);
    }
}