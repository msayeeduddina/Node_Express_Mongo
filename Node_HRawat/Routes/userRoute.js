// Importing the Express module
const express = require("express");

// Creating a new router instance for user-related routes
const userRouter = express.Router();

// Route for the user home
userRouter.get("/", (req, res) => {
  console.log("This is the user home router"); // Log for the home route
  res.send("This is the user home router"); // Response for the home route
});

// Route for user profile
userRouter.get("/profile", (req, res) => {
  console.log("This is the user profile router"); // Log for the profile route
  res.send("This is the user profile router"); // Response for the profile route
});

// Exporting the user router for use in other modules
module.exports = userRouter;
