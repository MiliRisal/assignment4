const express = require("express");
const router = express.Router();
const User = require("../Models/User");

// Middleware to get a user by ID
async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Create a new user
router.post("/", async (req, res) => {
  const { email, password, username, purchaseHistory, shippingAddress } =
    req.body;
  try {
    const newUser = new User({
      email,
      password,
      username,
      purchaseHistory,
      shippingAddress,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Update a user using PUT
router.put("/:id", getUser, async (req, res) => {
  const { email, password, username, purchaseHistory, shippingAddress } =
    req.body;
  try {
    if (email) {
      res.user.email = email;
    }
    if (password) {
      res.user.password = password;
    }
    if (username) {
      res.user.username = username;
    }
    if (purchaseHistory) {
      res.user.purchaseHistory = purchaseHistory;
    }
    if (shippingAddress) {
      res.user.shippingAddress = shippingAddress;
    }
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
