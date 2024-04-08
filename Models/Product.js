const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  description: { type: String },
  image: { type: String },
  pricing: { type: Number },
  shippingCost: { type: Number },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
