const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const url =
  "mongodb+srv://milirisal11:mongoMili@cluster0.9r7xdtt.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;
