const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  namaLengkap: { type: String, required: [true, "Nama tidak boleh kosong"] },
  email: { type: String, required: [true, "Email tidak boleh kosong"] },
  password: { type: String, required: [true, "Password tidak boleh kosong"] },
  role: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
