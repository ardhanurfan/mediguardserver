const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      // Create a unique ObjectId based on id_cabang and kode_cabang
      return new mongoose.Types.ObjectId(`${this.id_cabang}${this.kode_cabang.toString()}`);
    },
  },
  id_cabang: { type: String, unique: true },
  kode_cabang: { type: String, unique: true },
  namaCabang: { type: String, required: true },
  alamat: { type: String, required: true },
  
});

  
const Branch = mongoose.model("Branch", branchSchema);
module.exports = Branch;