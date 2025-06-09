const express = require("express");
const router = express.Router();
const {
  getTransactionsByAccount,
  getAllTransactions,
} = require("../controllers/transactionController");

router.get("/:accountNumber", getTransactionsByAccount);
router.get("/", getAllTransactions);                    

module.exports = router;
