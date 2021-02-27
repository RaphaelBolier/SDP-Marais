const express = require('express');
const app = express();
const game = require('./routes/game');

const port = 3000;

app.use('/game', game);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});