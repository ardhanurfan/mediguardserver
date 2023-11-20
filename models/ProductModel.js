const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  prod_code: { type: String, unique: true, required: true },
  hna: { type: Number, required: true },
  het: { type: Number, required: true },
  uom: { type: String, required: true },
  beratGram: { type: Number, required: true },
  panjangCm: { type: Number },
  lebarCm: { type: Number, required: true },
  tinggiCm: { type: Number, required: true },
  isLifeSaving: { type: Boolean, required: true },
  volumeCm3: { type: Number, required: true },
  kategoriPengiriman: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
