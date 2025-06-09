const express = require("express");
const router = express.Router();
const { creditOrDebit } = require("../controllers/accountController");

router.post("/:accountNumber/transaction", creditOrDebit); 
module.exports = router;
