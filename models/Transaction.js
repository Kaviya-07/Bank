const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionId: String,
  accountNumber: String,
  type: { type: String, enum: ["credit", "debit"] },
  amount: Number,
  performedBy: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
