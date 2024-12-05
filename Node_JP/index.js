require("dotenv").config();
const users = require("./model");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.get("/getUsers", async (req, res) => {
  let allusers = await users.find({});
  console.log("allusers", users);
  res.status(200).json({
    status: 200,
    message: allusers,
  });
});

app.get("/user/:id", async (req, res) => {
  console.log("userid", req.params.id);
  // let userbyid = await users.findById(req.params.id);
  let userbyid = await users.findOne({ _id: req.params.id });
  console.log("userbyid", userbyid);
  res.status(200).json({
    status: 200,
    message: userbyid,
  });
});

app.put("/userUpdate/:id", async (req, res) => {
  console.log("userUpdate ID:", req.params.id);
  // let user = await users.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });
  let user = await users.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  console.log("User updated:", user);
  return res.status(200).json(user);
});

app.post("/addUser", async (req, res) => {
  let user = req.body;
  user = new users(user);
  user = await user.save();
  console.log("user", user);
  res.status(201).json({
    status: 200,
    message: user,
  });
});

app.delete("/deleteUser/:id", async (req, res) => {
  // let user = await users.findByIdAndDelete(req.params.id);
  let user = await users.findOneAndDelete({ _id: req.params.id });
  console.log("user", user);
  res.status(200).json({
    status: 200,
    message: user,
  });
});

mongoose.connection.on("connected", () => {
  console.log("mongoose connected");
});
mongoose.connection.on("error", (err) => {
  console.log("mongoose connection error: ", err);
});

app.listen(process.env.PORT, async () => {
  await mongoose.connect(process.env.MONGOOSE_CONNECT_URI);
  console.log("Listening: ", process.env.PORT);
});
