// Importing required modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");

// Importing custom middleware and routes
const {
  logMiddleware1,
  logMiddleware2,
  logMiddleware3,
} = require("./Middleware/logMiddleware");
const router = require("./Routes/route");
const userRouter = require("./Routes/userRoute");
const productRouter = require("./Routes/productRoute");

// Initializing the Express application
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000/",
  })
);

// Application-Level Middleware
// app.use(logMiddleware1); // First logging middleware
// app.use(logMiddleware2); // Second logging middleware

// Route-Level Middleware
app.use("/logMW3", logMiddleware3); // Logging middleware applied to specific route

// Middleware to generate an error for testing purposes
// app.use((req, res, next) => {
//   next(new Error("An error occurred..")); // Passing error to the next middleware
// });

// Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack); // Logging the error stack trace
//   res.status(500).send("Something went wrong.."); // Sending error response
// });

// Built-In Middleware
app.use(express.static("public")); // Serving static files from 'public' directory

// Third-Party Middleware
app.use(helmet()); // Helmet for securing HTTP headers
app.use(bodyParser.json()); // Parsing JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parsing URL-encoded request bodies
app.use(compression()); // Compressing HTTP responses for better performance

// Route Definitions
app.get("/", (req, res) => {
  console.log("Hello routing GET"); // Log for GET request
  res.send("Hello routing"); // Response for GET request
});

app.post("/login", (req, res) => {
  console.log("Hello routing POST"); // Log for POST request
  res.send("Hello routing POST"); // Response for POST request
});

// Modular Routing
app.use("/api", router); // Main API routing
app.use("/user", userRouter); // User-specific routes
app.use("/product", productRouter); // Product-specific routes

// Server Initialization
const port = 3000; // Defining the port number

app.listen(port, () => {
  console.log("Listening on port:", port); // Confirmation of server start
});
