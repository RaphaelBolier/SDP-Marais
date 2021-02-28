const { Router } = require('express');
const { getGames, createGame, joinGame } = require('../services/game');
const { joinRoom } = require('../wsapi');

const router = Router();

router.get('/', (req, res) => res.send(JSON.stringify(getGames())));

router.post('/:id', (req, res) => {
    const { id } = req.params;
    const { clientId } = req.body;

    const game = getGames().find((game) => game.id === id);

    if (game) {
        joinRoom(clientId, id);
        joinGame(clientId, id);
        res.send({ gameId: id });
        console.log(`Client ${clientId} joined game ${id}`);
    } else {
        res.send({
            error: true,
            msg: 'Failed to join the game.',
            gameId: id,
            clientId,
        });
    }
});

router.post('/', (req, res) => {
    const { gameName, id } = req.body;
    
    const game = getGames().find((game) => game.id === id);
    if (game) {
        res.send({
            error: true,
            msg: 'You can\'t create another game',
            gameId: id,
        });
    } else {
        joinRoom(id, id);
        createGame(gameName, id);        

        res.send({ gameId: id });
    }
});


module.exports = router;