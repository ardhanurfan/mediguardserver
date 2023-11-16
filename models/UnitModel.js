const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
    unitId: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    batteryCapacity: { type: Number,required: true },
    currentState: { type: Boolean, required: true }, // 1 if available to use, 0 if not available to use
    lockState: { type: Boolean, required: true }, // 1 if open, 0 if closed
    temperature: { type: Number, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    humidity: { type: Number, required: true },
});

const Unit = mongoose.model("Unit", unitSchema);
module.exports = Unit;