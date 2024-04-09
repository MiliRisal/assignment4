const express = require("express");
const router = express.Router();
const Cart = require("../Models/Cart");

// Middleware to get a cart by user ID
async function getCartByUser(req, res, next) {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      "products",
      ["description", "pricing"]
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.cart = cart;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Create a new cart for a user
router.post("/:userId", async (req, res) => {
  const { products, quantities } = req.body;
  const userId = req.params.userId;
  try {
    const newCart = new Cart({
      products,
      quantities,
      user: userId,
    });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a user's cart
router.get("/:userId", getCartByUser, (req, res) => {
  res.json(res.cart);
});

// Update a user's cart
router.put("/:userId", getCartByUser, async (req, res) => {
  const { products, quantities } = req.body;
  try {
    res.cart.products = products;
    res.cart.quantities = quantities;
    const updatedCart = await res.cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user's cart
router.delete("/:userId", getCartByUser, async (req, res) => {
  try {
    await res.cart.deleteOne();
    res.json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
