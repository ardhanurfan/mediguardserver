const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    custNum: {
        type: Number,
        ref: "Relation",
    },
    longitude : {type: Number, required: true},
    latitude : {type: Number, required:true}
});

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;