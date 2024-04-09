const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./connection");
const productRoutes = require("./Routes/productRoute");
const userRoutes = require("./Routes/userRoute");
const commentsRoutes = require("./Routes/commentsRoute");
const cartRoutes = require("./Routes/cartRoute");
const orderRoutes = require("./Routes/orderRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
