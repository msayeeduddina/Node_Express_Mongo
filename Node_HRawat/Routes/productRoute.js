const express = require("express");
const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  console.log("this is product home router");
  res.send("this is product home router");
});

productRouter.get("/features", (req, res) => {
  console.log("this is product features router");
  res.send("this is product features router");
});

module.exports = productRouter;
