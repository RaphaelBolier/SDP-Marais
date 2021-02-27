const games = [];


exports.getGames = () => games;

exports.createGame = (name, id) => {
    games.push({ name, id });
}