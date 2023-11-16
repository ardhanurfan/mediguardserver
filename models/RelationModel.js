const mongoose = require("mongoose");
const relationSchema = new mongoose.Schema({
  kodeCabang: {
    type: String,
    ref: "Branch", // Reference the Branch model
  },
  custNum: { type: Number, required: true },
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
