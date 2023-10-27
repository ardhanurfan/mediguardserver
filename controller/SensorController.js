const Sensor = require("../models/SensorModel");

const getSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await Sensor.findById(id);
    res.formatter.ok(sensor);
  } catch (error) {
    res.formatter.badRequest(error);
  }
};

const saveSensorToMongo = async (inputToJson) => {
  try {
    const found = await Sensor.findOne({ device: inputToJson.device });
    if (!found) {
      await Sensor.insertOne({
        device: inputToJson.device,
        temperature: inputToJson.temperature,
        altitude: inputToJson.altitude,
      });
    } else {
      await Sensor.updateOne(
        { device: inputToJson.device },
        {
          temperature: inputToJson.temperature,
          altitude: inputToJson.altitude,
        }
      );
    }
  } catch (error) {
    reject({ message: error });
  }
};

module.exports = {
  getSensor,
  saveSensorToMongo,
};
