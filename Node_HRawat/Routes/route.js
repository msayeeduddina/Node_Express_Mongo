const express = require("express");
const router = express.Router();
const {
  authentication,
  route3,
  route4,
} = require("../Middleware/logMiddleware");


router.get("/route2", (req, res) => {
  console.log("this is route2");
  res.send("This is route2");
});

router.get("/protected", authentication, (req, res) => {
  res.send("This is protected route");
});

router.get("/route34", route3, route4, (req, res) => {
  res.send("This is route 3 & 4");
});

module.exports = router;
