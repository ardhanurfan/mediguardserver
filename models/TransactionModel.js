const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  staffId: {
    type: String,
    ref: "User", // Reference the User model
  },
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
  deliveryCat: {
    type: String,
    ref: "DeliveryCat",
  },
  ship_method_code: {
    type: String,
    ref: "Vendor",
  },
  cust_num: {
    type: Number,
    ref: "Relation",
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
  vendor: {
    type: String,
  },
  packing_date: { type: Date },
  delivery_date: { type: Date },
  arrival_date: { type: Date },
  distance: { type: String },
  duration: { type: String },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
