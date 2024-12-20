const express = require("express");
const {
  logMiddleware1,
  logMiddleware2,
  logMiddleware3,
} = require("./Middleware/logMiddleware");

const app = express();
app.use(logMiddleware1);
app.use(logMiddleware2);
app.use("/logMW3", logMiddleware3);

const port = 3000;

app.listen(port, () => {
  console.log("Listening:", port);
});
