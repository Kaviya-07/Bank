const Transaction = require("../models/Transaction");

exports.getTransactionsByAccount = async (req, res) => {
  const { accountNumber } = req.params;
  const txns = await Transaction.find({ accountNumber });
  res.json(txns);
};

exports.getAllTransactions = async (req, res) => {
  const txns = await Transaction.find();
  res.json(txns);
};
