const express = require("express");
const router = express.Router();
const Order = require("../Models/Order");

// Middleware to get orders by user ID
async function getOrdersByUser(req, res, next) {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "user",
      "username"
    );
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Orders not found for this user" });
    }
    res.orders = orders;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Create a new order for a user
router.post("/:userId", async (req, res) => {
  const { orderDate } = req.body;
  const userId = req.params.userId;
  try {
    const newOrder = new Order({
      user: userId,
      orderDate,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get orders for a user
router.get("/:userId", getOrdersByUser, (req, res) => {
  res.json(res.orders);
});

// Update an order
router.put("/:orderId", async (req, res) => {
  const { orderDate } = req.body;
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (orderDate) {
      order.orderDate = orderDate;
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an order
router.delete("/:orderId", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
