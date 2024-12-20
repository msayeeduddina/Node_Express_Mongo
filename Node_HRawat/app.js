const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");

const {
  logMiddleware1,
  logMiddleware2,
  logMiddleware3,
} = require("./Middleware/logMiddleware");
const router = require("./Routes/route");
const userRouter = require("./Routes/userRoute");
const productRouter = require("./Routes/productRoute");

const app = express();

// app.use(logMiddleware1); // Application-Level
// app.use(logMiddleware2);
app.use("/logMW3", logMiddleware3); // Route-Level
// app.use((req, res, next) => {  // Middleware generating error
//   next(new Error("An error occurred.."));
// });
// app.use((err, req, res, next) => {  // Error handling middleware & it should be at last
//   console.error(err.stack);
//   res.status(500).send("Something went wrong..");
// });
app.use(express.static("public")); // Build-In Middleware
app.use(helmet()); // Third-Party middleware - helmet: setting HTTP security headers
app.use(bodyParser.json()); // bodyParser : Parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression()); // compression : compressing HTTP responses

app.get("/", (req, res) => {
  console.log("Hello routing GET");
  res.send("Hello routing");
});
app.post("/login", (req, res) => {
  console.log("Hello routing POST");
  res.send("Hello routing POST");
});

app.use("/api", router); // routing for modularity
app.use("/user", userRouter);
app.use("/product", productRouter);

const port = 3000;

app.listen(port, () => {
  console.log("Listening:", port);
});
