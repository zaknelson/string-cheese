const express = require('express');
const bodyParser = require('body-parser');
const GameService = require('./services/GameService');
const app = express();
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get('/games', async (req, res) => {
  res.send(GameService.getGames());
});

app.get('/games/:gameId', async (req, res) => {
  res.send(GameService.getGame(req.params.gameId));
});

app.post('/games', async (req, res) => {
  res.send(GameService.createGame(req.body));
});

app.listen(port, () =>
  console.log(`String Cheese API listening at http://localhost:${port}`)
);

app.post(
  '/',
  // validators.userSignup,
  async (req, res, next) => {
    // Return a response to client.
    return res.json({});
  }
);
