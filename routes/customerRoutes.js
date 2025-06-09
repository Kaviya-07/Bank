const express = require("express");
const router = express.Router();
const {
  registerCustomer,
  updateCustomerDetails,
  getAllCustomers,
  getCustomerById,
} = require("../controllers/customerController");
router.get("/:customerId", getCustomerById);


router.post("/register", registerCustomer);         
router.put("/update/:customerId", updateCustomerDetails);
router.get("/", getAllCustomers); 

module.exports = router;
