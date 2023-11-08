const mongoose = require("mongoose");
const relationSchema = new mongoose.Schema({
  kodeCabang: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch", // Reference the Branch model
  },
  _id: {
    type: String,
    default: function () {
      // Create a unique ObjectId based on customer_number
      return new mongoose.Types.ObjectId(`${this.customer_number.toString()}`);
    },
  },
  alamat: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  zipCode: { type: Number, required: true },
  channel: { type: String, required: true },
  shipMethodCode: { type: String, required: true },
  shipMethodDesc: { type: String, required: true },
  deliveryAreaGroup: { type: String, required: true },
});

const Relation = mongoose.model("Relation", relationSchema);
module.exports = Relation;
