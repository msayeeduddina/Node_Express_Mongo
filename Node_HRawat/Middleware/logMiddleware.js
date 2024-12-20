// Importing the Express module
const express = require("express");

// Creating the Express application
const app = express();

// Middleware for logging and responding for logMiddleware1
const logMiddleware1 = (req, res, next) => {
  console.log("This is log middleware1"); // Log message
  res.send("This is log middleware1"); // Response for log middleware 1
  next(); // Call the next middleware (note: sending response before next can prevent further execution)
};

// Middleware for logging and responding for logMiddleware2
const logMiddleware2 = (req, res, next) => {
  console.log("This is log middleware2"); // Log message
  res.send("This is log middleware2"); // Response for log middleware 2
  next(); // Call the next middleware (note: sending response before next can prevent further execution)
};

// Middleware for logging and responding for logMiddleware3
const logMiddleware3 = (req, res, next) => {
  console.log("This is log middleware3"); // Log message
  res.send("This is log middleware3"); // Response for log middleware 3
  next(); // Call the next middleware (note: sending response before next can prevent further execution)
};

// Authentication middleware to secure routes
const authentication = (req, res, next) => {
  // Check for Bearer token in the headers
  if (req.headers.authorization === "Bearer my token") {
    next(); // Proceed to the next middleware/route handler
  } else {
    res.status(401).send("Unauthorized"); // Respond with 401 status if unauthorized
  }
};

// Middleware for additional logging (route3)
const route3 = (req, res, next) => {
  console.log("This is log middleware3"); // Log message for route3
  next(); // Call the next middleware
};

// Middleware for additional logging (route4)
const route4 = (req, res, next) => {
  console.log("This is log middleware4"); // Log message for route4
  next(); // Call the next middleware
};

// Exporting all middleware functions for use in other modules
module.exports = {
  logMiddleware1,
  logMiddleware2,
  logMiddleware3,
  authentication,
  route3,
  route4,
};
