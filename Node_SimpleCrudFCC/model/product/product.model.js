// ==========================
// Module Import
// ==========================
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction

// ==========================
// Product Schema Definition
// ==========================
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String, // Product name
      required: true, // Name is required
    },
    quantity: {
      type: Number, // Quantity of the product
      required: true, // Quantity is required
      default: 0, // Default quantity is 0
    },
    price: {
      type: Number, // Price of the product
      required: true, // Price is required
      default: 0, // Default price is 0
    },
    image: {
      type: String, // URL or path to the product image
      required: false, // Image is optional
    },
  },
  {
    timestamps: true, // Automatically create 'createdAt' and 'updatedAt' fields
  }
);

// ==========================
// Export Product Model
// ==========================
module.exports = mongoose.model("Product", ProductSchema); // Export the Product model based on the schema
