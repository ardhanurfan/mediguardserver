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
      await Sensor.insertOne({
        device: inputToJson.device,
        temperature: inputToJson.temperature,
        altitude: inputToJson.altitude,
        lock: true,
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

const updateDeviceLock = async (req, res) => {
  try {
    const { id } = req.body;
    const sensor = await Sensor.findById(id);

    // Publish MQTT to IoT
    if (sensor.lock) {
      mqttConnection.publish("MediGuardDevice/output", {
        device: sensor.device,
        lock: "off",
      });
    } else {
      mqttConnection.publish("MediGuardDevice/output", {
        device: sensor.device,
        lock: "on",
      });
    }

    // Update DB
    await Sensor.updateOne(
      { _id: id },
      {
        lock: !sensor.lock,
      }
    );
    res.formatter.ok("Data Updated");
  } catch (error) {
    res.formatter.badRequest(error);
  }
};

module.exports = {
  getSensor,
  saveSensorToMongo,
  updateDeviceLock,
};
