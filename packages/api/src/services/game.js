const games = [];


exports.getGames = () => games;

exports.createGame = (name, id, isPublic, playerName) => {
    games.push({ name, id, players: [{ id, name: playerName}], isPublic});
}

exports.joinGame = (clientId, gameId, playerName) => {
    const game = games.find((game) => game.id === gameId);
    if (game) {
        game.players.push({ id: clientId, name: playerName });
    } else {
        throw new Error('Cannot find game: ', gameId);
    }
}