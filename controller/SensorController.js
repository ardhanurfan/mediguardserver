const Sensor = require("../models/SensorModel");
const Unit = require("../models/UnitModel");
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
    const found = await Unit.findOne({ unitId: inputToJson.device });
    if (!found) {
      await Unit.create({
        unitId: inputToJson.device,
        temperature: inputToJson.temperature,
        humidity: inputToJson.humidity,
        latitute: inputToJson.latitute,
        longitude: inputToJson.longitude,
        lock: false,
      });
    } else {
      await Unit.updateOne(
        { unitId: inputToJson.device },
        {
          temperature: inputToJson.temperature,
          humidity: inputToJson.humidity,
          latitute: inputToJson.latitute,
          longitude: inputToJson.longitude,
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
    await Unit.updateOne(
      { unitId: device },
      {
        lockState: value,
      }
    );

    const sensor = await Unit.findOne({ unitId: device });
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
