const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  console.log("this is user home router");
  res.send("this is user home router");
});

userRouter.get("/profile", (req, res) => {
  console.log("this is user profile router");
  res.send("this is user profile router");
});

module.exports = userRouter;
