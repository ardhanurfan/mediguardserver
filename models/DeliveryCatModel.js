const mongoose = require("mongoose");

const deliveryCatSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    kategoriPengiriman : { type: String, required: true },
    suhuSimpan : { type: String, required: true },
    minSuhu : { type: Number, required: true },
    maxSuhu: { type: Number, required: true },
});

const DeliveryCat = mongoose.model("DeliveryCat", deliveryCatSchema);
module.exports = DeliveryCat;