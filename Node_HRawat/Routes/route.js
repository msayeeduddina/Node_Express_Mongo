// Importing the Express module
const express = require("express");

// Creating a new router instance
const router = express.Router();

// Importing middleware functions for authentication and logging
const {
  authentication,
  route3,
  route4,
} = require("../Middleware/logMiddleware");

// Route for route2
router.get("/route2", (req, res) => {
  console.log("This is route2"); // Log for route2
  res.send("This is route2"); // Response for route2
});

// Protected route that requires authentication
router.get("/protected", authentication, (req, res) => {
  res.send("This is a protected route"); // Response for authenticated users
});

// Route that applies multiple middleware functions
router.get("/route34", route3, route4, (req, res) => {
  res.send("This is route 3 & 4"); // Response for route3 and route4
});

// Exporting the router for use in other modules
module.exports = router;
