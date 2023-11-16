const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  staffId: {
    type: String,
    ref: "User", // Reference the User model
  }, // User ID from the database
  orderNum: {
    type: Number,
    required: true,
  },
  deliveryNum: {
    type: Number,
    required: true,
  },
  transportType: {
    type: String,
    required: true,
  },
  branchCode: {
    type: String,
    ref: "Branch",
  },
  status: { 
    type: String 
  },
  ship_method_code: {
    type: String,
    ref: "Vendor",
  },
  cust_num: {
    type: Number,
    ref: "User",
  },
  prod_code: {
    type: String,
    ref: "Product",
  },
  shipped_qty: { type: Number },
  unitId: {
    type: String,
    ref: "Unit",
  },
  packing_date: { type: Date },
  delivery_date: { type: Date },
  arrival_date: { type: Date },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
