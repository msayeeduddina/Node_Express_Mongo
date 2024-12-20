// Importing the Express module
const express = require("express");

// Creating a new router instance for product-related routes
const productRouter = express.Router();

// Route for the product home
productRouter.get("/", (req, res) => {
  console.log("This is the product home router"); // Log for the home route
  res.send("This is the product home router"); // Response for the home route
});

// Route for product features
productRouter.get("/features", (req, res) => {
  console.log("This is the product features router"); // Log for the features route
  res.send("This is the product features router"); // Response for the features route
});

// Exporting the product router for use in other modules
module.exports = productRouter;
