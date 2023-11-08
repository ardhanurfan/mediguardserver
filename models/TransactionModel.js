const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
  }, // User ID from the database
  transportType: {
    Type: String,
    required: [true, "Tipe transportasi tidak boleh kosong"],
  },
  branchCode: {
    Type: mongoode.Schema.Types.ObjectId,
    ref: "Branch",
  },
  status: { type: String },
  ship_method_code: { type: String },
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
