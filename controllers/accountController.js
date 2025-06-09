const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

const generateTxnId = () =>
  `TXN${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

exports.creditOrDebit = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const { type, amount, performedBy } = req.body;

    const account = await Account.findOne({ accountNumber });
    if (!account) return res.status(404).json({ message: "Account not found" });

    if (type === "debit" && account.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    if (type === "credit") {
      account.balance += amount;
    } else {
      account.balance -= amount;
    }
    await account.save();

    const txn = new Transaction({
      transactionId: generateTxnId(),
      accountNumber,
      type,
      amount,
      performedBy,
    });

    await txn.save();

    res.json({ message: "Transaction successful", account, txn });
  } catch (err) {
    res.status(500).json({ message: "Transaction failed", error: err.message });
  }
};
