const express = require('express');
const route = express();
const port = 3000;

route.get('/games', (req, res) => {
  res.send({ hello: 'Hello World!' });
});

route.listen(port, () =>
  console.log(`String Cheese API listening at http://localhost:${port}`)
);

route.post(
  '/',
  // validators.userSignup,
  async (req, res, next) => {
    // Return a response to client.
    return res.json({});
  }
);
