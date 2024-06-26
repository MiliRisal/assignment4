const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  username: { type: String },
  purchaseHistory: { type: String },
  shippingAddress: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
