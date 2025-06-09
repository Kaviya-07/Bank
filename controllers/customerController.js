const Customer = require("../models/Customer");
const Account = require("../models/Account");

const generateId = (prefix = "CUST") =>
  `${prefix}${Math.floor(100000 + Math.random() * 900000)}`;
const generateAccountNumber = () =>
  `ACC${Math.floor(100000 + Math.random() * 900000)}`;

exports.registerCustomer = async (req, res) => {
  try {
    const { name, address, email, phone, password } = req.body;
    const customerId = generateId();
    const accountNumber = generateAccountNumber();

    const customer = new Customer({
      name,
      address,
      email,
      phone,
      password,
      customerId,
    });
    await customer.save();

    const account = new Account({
      customerId,
      accountNumber,
      balance: 0,
    });
    await account.save();

    res.status(201).json({ message: "Customer registered", customer, account });
  } catch (err) {
    res.status(500).json({ message: "Error registering customer", error: err.message });
  }
};

exports.updateCustomerDetails = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { address, email, phone, password } = req.body;

    const updated = await Customer.findOneAndUpdate(
      { customerId },
      { address, email, phone, password },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Update error", error: err.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};
exports.getCustomerById = async (req, res) => {
  const { customerId } = req.params;
  try {
    const customer = await Customer.findOne({ customerId });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customer", error: err.message });
  }
};

