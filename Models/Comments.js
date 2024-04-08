const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number },
  images: { type: String },
  text: { type: String },
});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
