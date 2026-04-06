const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/TransactionController");

// CREATE
router.post("/", addTransaction);

// READ
router.get("/", getTransactions);
router.get("/:id", getTransactionById);

// UPDATE
router.put("/:id", updateTransaction);

// DELETE
router.delete("/:id", deleteTransaction);

module.exports = router;