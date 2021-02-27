const { Router } = require('express');
const { getGames } = require('../services/game');

const router = Router();

router.get('/', (req, res) => res.send(JSON.stringify(getGames())));


module.exports = router;