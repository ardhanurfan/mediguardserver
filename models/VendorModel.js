const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      // Create a unique ObjectId based on vwndor_id and shipper_code
      return new mongoose.Types.ObjectId(`${this.shipper_code}${this.vendor_id.toString()}`);
    },
  },
  cabang: { type: String, unique: false },
  shipmethod_code: { type: String, unique: false },
  namaCabang: { type: String, required: [true, "Nama tidak boleh kosong"] },
  service: { type: String, required: [true, "Alamat tidak boleh kosong"] },
  chargeBase: { type: String, required: true },
  licensePlate: { type: String, required: true },
  minType: { type: String },
  calcType: { type: String },
  type: { type: String, required: true },
  moda: { type: String, required: true },
  printFlag: { type: String, required: true },
  packerFlag: { type: String, required: true },
  leadTime: { type: Number, required: true },
  ppnType: { type: String, required: true },
  wht: { type: String, required: true }, // Assuming "WHT" is a string
  lineNumber: { type: Number, required: true }, // Assuming "LINE_NUMBER" is a number
  termMIn: { type: Number, required: true }, // Assuming "TERM_MIN" is a number
  termMax: { type: Number, required: true }, // Assuming "TERM_MAX" is a number
  rate: { type: Number, required: true }, // Assuming "RATE" is a number
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;