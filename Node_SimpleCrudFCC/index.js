require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/product/product.model");
const app = express();

const PORT = process.env.PORT;
const Project2DBNodeSimpleCRUDFCC = process.env.MONGOOSE_CONNECT_URI;

mongoose
  .connect(Project2DBNodeSimpleCRUDFCC)
  .then(() => {
    console.log("Project2DBNodeSimpleCRUDFCC DB Connected");
  })
  .catch((error) => {
    console.log("Project2DBNodeSimpleCRUDFCC DB err", error);
  });

app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find({});
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Listening on Port: ", PORT);
});
