const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
  {
    device: {
      type: String,
      default: 0,
    },
    temperature: {
      type: String,
      default: 0,
    },
    altitude: {
      type: String,
      default: 0,
    },
    lock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Sensor = mongoose.model("Sensor", sensorSchema);
module.exports = Sensor;
