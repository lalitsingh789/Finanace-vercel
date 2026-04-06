require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 🔥 MongoDB Connection (SERVERLESS SAFE)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Atlas Connected");
  } catch (err) {
    console.log("❌ DB Error:", err);
  }
};

// ❌ REMOVE this line
// connectDB();

// ✅ ROUTES
app.use("/api/transactions", require("./routes/TransactionRoutes"));
app.use("/api/analytics", require("./routes/AnalyticsRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("API running...");
});

// ✅ SERVERLESS EXPORT
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};