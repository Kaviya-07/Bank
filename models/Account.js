const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  customerId: String,
  accountNumber: { type: String, unique: true },
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model("Account", accountSchema);
