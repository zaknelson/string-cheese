const GameService = require('./services/GameService');
const JudgmentService = require('./services/JudgmentService');
const PlayerService = require('./services/PlayerService');
const SubmissionService = require('./services/SubmissionService');

const express = require('express');

const app = express();
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//
// games
//

app.get('/games', async (req, res) => {
  res.send(GameService.getGames());
});

app.post('/games', async (req, res) => {
  res.send(GameService.createGame());
});

app.get('/games/:gameId', async (req, res) => {
  res.send(GameService.getGame(req.params.gameId));
});

//
// judgments
//

app.get('/games/:gameId/judgments', async (req, res) => {
  res.send(JudgmentService.getJudgments(req.params.gameId));
});

app.post('/games/:gameId/judgments', async (req, res) => {
  res.send(
    JudgmentService.createJudgment(req.params.gameId, req.body.submissions)
  );
});

app.post('/games/:gameId/judgments/:judgmentId/reveal', async (req, res) => {
  res.send(
    JudgmentService.revealJudgment(req.params.gameId, req.params.judgmentId)
  );
});

//
// players
//

app.get('/games/:gameId/players', async (req, res) => {
  res.send(PlayerService.getPlayers(req.params.gameId));
});

app.get('/games/:gameId/players/:playerId', async (req, res) => {
  res.send(PlayerService.getPlayer(req.params.gameId, req.params.playerId));
});

app.post('/games/:gameId/players', async (req, res) => {
  res.send(PlayerService.createPlayer(req.params.gameId, req.body.name));
});

//
// submissions
//

app.get('/games/:gameId/submissions', async (req, res) => {
  res.send(SubmissionService.getSubmissions(req.params.gameId));
});

app.delete('/games/:gameId/submissions', async (req, res) => {
  res.send(SubmissionService.deleteSubmissions(req.params.gameId));
});

app.post('/games/:gameId/submissions', async (req, res) => {
  res.send(
    SubmissionService.createSubmission(req.params.gameId, req.body.card.id)
  );
});

app.listen(port, () =>
  console.log(`String Cheese API listening at http://localhost:${port}`)
);
