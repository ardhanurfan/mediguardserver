const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nama: { type: String, required: [true, "Nama tidak boleh kosong"] },
  email: { type: String, required: [true, "Email tidak boleh kosong"] },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
