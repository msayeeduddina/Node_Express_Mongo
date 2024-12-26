// ==========================
// Module Imports
// ==========================
const express = require("express"); // Import Express framework
const {
  getAllProducts,
  getProductByid,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../../controller/products/products.controller"); // Import product controller functions

// ==========================
// Router Initialization
// ==========================
const productRoute = express.Router(); // Create a new router instance for product routes

// ==========================
// Route Definitions
// ==========================
productRoute.get("/", getAllProducts); // GET all products
productRoute.get("/:id", getProductByid); // GET a product by ID
productRoute.post("/", addProduct); // POST a new product
productRoute.put("/:id", editProduct); // PUT (update) a product by ID
productRoute.delete("/:id", deleteProduct); // DELETE a product by ID

// ==========================
// Export Router
// ==========================
module.exports = productRoute; // Export the router for use in the main application
