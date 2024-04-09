const express = require("express");
const router = express.Router();
const Comments = require("../Models/Comments");

// Middleware to get comments by product ID
async function getCommentsByProduct(req, res, next) {
  try {
    const comments = await Comments.find({
      product: req.params.productId,
    }).populate("user", "username");
    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "Comments not found for this product" });
    }
    res.comments = comments;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comments.find().populate("user", "username");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new comment for a product
router.post("/:productId", async (req, res) => {
  const { user, rating, images, text } = req.body;
  const productId = req.params.productId;
  try {
    const newComment = new Comments({
      product: productId,
      user,
      rating,
      images,
      text,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get comments for a product
router.get("/:productId", getCommentsByProduct, (req, res) => {
  res.json(res.comments);
});

// Update a comment
router.put("/:commentId", async (req, res) => {
  const { user, rating, images, text } = req.body;
  try {
    const comment = await Comments.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (user) {
      comment.user = user;
    }
    if (rating) {
      comment.rating = rating;
    }
    if (images) {
      comment.images = images;
    }
    if (text) {
      comment.text = text;
    }
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a comment
router.delete("/:commentId", async (req, res) => {
  try {
    await Comments.findByIdAndDelete(req.params.commentId);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
