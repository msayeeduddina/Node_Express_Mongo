const express = require("express");

const app = express();

const logMiddleware = (req, res, next) => {
  res.send("This is log middleware");
  next();
};

module.exports = logMiddleware;
