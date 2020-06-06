const GameService = require('./services/GameService');

const express = require('express');

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

app.post('/games', async (req, res) => {
  res.send(GameService.createGame());
});

app.get('/games/:gameId', async (req, res) => {
  res.send(GameService.getGame(req.params.gameId));
});

app.get('/games/:gameId/cards', async (req, res) => {
  res.send(GameService.getCards(req.params.gameId));
});

app.post('/games/:gameId/cards', async (req, res) => {
  res.send(GameService.playCard(req.params.gameId, req.body.id));
});

app.get('/games/:gameId/judgements', async (req, res) => {
  res.send(GameService.getJudgements(req.params.gameId));
});

app.post('/games/:gameId/judgements', async (req, res) => {
  res.send(GameService.createJudgement(req.params.gameId, req.body.cards));
});

app.post('/games/:gameId/judgements/:judgementId/reveal', async (req, res) => {
  res.send(
    GameService.revealJudgement(req.params.gameId, req.params.judgementId)
  );
});

app.delete('/games/:gameId/cards', async (req, res) => {
  res.send(GameService.clearCards(req.params.gameId));
});

app.get('/games/:gameId/players/:playerId', async (req, res) => {
  res.send(GameService.getPlayer(req.params.gameId, req.params.playerId));
});

app.post('/games/:gameId/players', async (req, res) => {
  res.send(GameService.createPlayer(req.params.gameId, req.body.name));
});

app.listen(port, () =>
  console.log(`String Cheese API listening at http://localhost:${port}`)
);
