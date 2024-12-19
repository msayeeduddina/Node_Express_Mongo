const express = require("express");
const logMiddleware = require(".//logMiddleware");

const app = express();
app.use(logMiddleware);

const port = 3000;

app.listen(port, () => {
  console.log("Listening:", port);
});
