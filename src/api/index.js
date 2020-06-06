const express = require("express");
const app = express();
const port = 3000;

app.get("/games", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`String Cheese API listening at http://localhost:${port}`)
);
