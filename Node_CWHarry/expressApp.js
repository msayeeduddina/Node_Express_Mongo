const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World Home");
});

app.get("/about", (req, res) => {
  res.send("Hello World About");
});

app.listen(port, () => {
  console.log(`Listening: ${port}`);
});
