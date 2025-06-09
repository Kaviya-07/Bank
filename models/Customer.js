const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phone: String,
  password: String,
  customerId: { type: String, unique: true },
});

module.exports = mongoose.model("Customer", customerSchema);
