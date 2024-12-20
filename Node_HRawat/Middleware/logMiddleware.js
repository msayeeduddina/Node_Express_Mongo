const express = require("express");

const app = express();

const logMiddleware1 = (req, res, next) => {
  res.send("This is log middleware1");
  console.log("This is log middleware1");
  next();
};

const logMiddleware2 = (req, res, next) => {
  res.send("This is log middleware2");
  console.log("This is log middleware2");
  next();
};

const logMiddleware3 = (req, res, next) => {
  res.send("This is log middleware3");
  console.log("This is log middleware3");
  next();
};

const authentication = (req, res, next) => {
  if ((req.headers, authentication === "Bearer my token")) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

const route3 = (req, res, next) => {
  console.log("This is log middleware3");
  next();
};

const route4 = (req, res, next) => {
  console.log("This is log middleware4");
  next();
};

module.exports = {
  logMiddleware1,
  logMiddleware2,
  logMiddleware3,
  authentication,
  route3,
  route4,
};
