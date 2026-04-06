const Transaction = require("../models/Transaction");


// ✅ ADD TRANSACTION (Income / Expense)
exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    res.status(201).json({
      message: "Transaction Saved ✅",
      data: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ GET ALL TRANSACTIONS
exports.getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ GET SINGLE TRANSACTION
exports.getTransactionById = async (req, res) => {
  try {
    const data = await Transaction.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ UPDATE TRANSACTION
exports.updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated data
    );

    if (!updated) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({
      message: "Transaction Updated ✅",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ DELETE TRANSACTION
exports.deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({
      message: "Transaction Deleted 🗑️",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};