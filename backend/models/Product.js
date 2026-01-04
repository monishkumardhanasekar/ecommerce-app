const mongoose = require("mongoose");

// Allowed values
const BRANDS = ["Apple", "Samsung", "Sony", "Dell", "HP"];
const TYPES = ["Phone", "Laptop", "Accessory"];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    brand: {
      type: String,
      enum: {
        values: BRANDS,
        message: "Invalid brand",
      },
      required: [true, "Brand is required"],
    },
    type: {
      type: String,
      enum: {
        values: TYPES,
        message: "Invalid product type",
      },
      required: [true, "Product type is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = {
  Product: mongoose.model("Product", productSchema),
  BRANDS,
  TYPES,
};
