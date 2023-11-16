const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
  }, // User ID from the database
  transportType: {
    type: String,
    required: true,
  },
  branchCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  status: { 
    type: String 
  },
  ship_method_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  cust_num: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prod_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  shipped_qty: { type: Number },
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit",
  },
  packing_date: { type: Date },
  delivery_date: { type: Date },
  arrival_date: { type: Date },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
