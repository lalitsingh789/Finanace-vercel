const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: String,
  note: String,
  date: Date,
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);