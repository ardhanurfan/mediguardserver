const Sensor = require("../models/SensorModel");
const mqttConnection = require("../mqtt");

const getSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await Sensor.findById(id);
    res.formatter.ok(sensor);
  } catch (error) {
    res.formatter.badRequest(error);
  }
};

/* FOR Socket.IO */
const saveSensorToMongo = async (inputToJson) => {
  try {
    const found = await Sensor.findOne({ device: inputToJson.device });
    if (!found) {
      await Sensor.create({
        device: inputToJson.device,
        temperature: inputToJson.temperature,
        altitude: inputToJson.altitude,
        lock: false,
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
    console.log({ message: error });
  }
};

const updateDeviceLock = async (req, res) => {
  try {
    const { device, value } = req.body;

    // Publish MQTT to IoT
    mqttConnection.publish(
      "MediGuardDevice/output",
      JSON.stringify({
        device: device,
        lock: value,
      })
    );

    // Update DB
    await Sensor.updateOne(
      { device: device },
      {
        lock: value,
      }
    );

    const sensor = await Sensor.findOne({ device: device });
    res.formatter.ok(sensor);
  } catch (error) {
    res.formatter.badRequest(error);
  }
};

module.exports = {
  getSensor,
  saveSensorToMongo,
  updateDeviceLock,
};
