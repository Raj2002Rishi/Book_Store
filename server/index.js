// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Order = require("./models/Order");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/book-orders", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// API route to handle order submissions
app.post("/api/orders", async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const newOrder = new Order({ name, email, address });
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully!" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
