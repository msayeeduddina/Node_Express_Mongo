// ==========================
// Model Import
// ==========================
const Product = require("../../model/product/product.model"); // Import the Product model

// ==========================
// Controller Functions
// ==========================

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products from the database
    console.log(products); // Log the retrieved products
    res.status(200).json(products); // Respond with the products and a 200 status
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors and respond with a 500 status
  }
};

// Get a product by ID
const getProductByid = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from request parameters
    const product = await Product.findById(id); // Fetch the product by ID
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // Handle case where product is not found
    }
    console.log(product); // Log the retrieved product
    res.status(200).json(product); // Respond with the product and a 200 status
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors and respond with a 500 status
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body); // Create a new product using request body
    console.log(product); // Log the created product
    res.status(201).json(product); // Respond with the created product and a 201 status
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors and respond with a 500 status
  }
};

// Edit an existing product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from request parameters
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }); // Update the product and return the updated document
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // Handle case where product is not found
    }
    console.log(product); // Log the updated product
    res.status(200).json(product); // Respond with the updated product and a 200 status
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors and respond with a 500 status
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from request parameters
    const product = await Product.findByIdAndDelete(id); // Delete the product by ID
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // Handle case where product is not found
    }
    res.status(200).json({ message: "Product deleted" }); // Respond with a success message and a 200 status
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors and respond with a 500 status
  }
};

// ==========================
// Export Controller Functions
// ==========================
module.exports = {
  getAllProducts,
  getProductByid,
  addProduct,
  editProduct,
  deleteProduct,
};
