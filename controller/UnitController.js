const Unit = require("../models/UnitModel");
const dataset = require("../dataset/unit.json");
const Transaction = require("../models/TransactionModel");
const mqttConnection = require("../mqtt");
const uploadData = async (req, res) => {
  try {
    await dataset.forEach(async (element) => {
      await Unit.create([
        {
          unitId: element.unitId,
          type: element.type,
          batteryCapacity: element.batteryCapacity,
          currentState: element.currentState,
          lockState: element.lockState,
          temperature: element.temperature,
          humidity: element.humidity,
          longitude: element.longitude,
          latitude: element.latitude,
        },
      ]);
    });
    res.formatter.ok("Upload data done");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error" });
  }
};

const getOnGoing = async (req, res) => {
  try {
    var units = await Unit.aggregate([
      {
        $match: {
          currentState: true,
        },
      },
      {
        $lookup: {
          from: "transactions",
          localField: "orderNum",
          foreignField: "orderNum",
          as: "transactionUnits",
        },
      },
      {
        $unwind: "$transactionUnits",
      },
      {
        $lookup: {
          from: "products",
          localField: "transactionUnits.prod_code",
          foreignField: "prod_code",
          as: "transactionUnits.productDetails",
        },
      },
      {
        $lookup: {
          from: "relations",
          localField: "transactionUnits.cust_num",
          foreignField: "custNum",
          as: "transactionUnits.address",
        },
      },
      {
        $unwind: "$transactionUnits.address", // Memastikan address tidak berupa array
      },
      {
        $lookup: {
          from: "deliverycats",
          localField: "transactionUnits.productDetails.kategoriPengiriman",
          foreignField: "kategoriPengiriman",
          as: "transactionUnits.deliveryCat",
        },
      },
      {
        $unwind: "$transactionUnits.deliveryCat", // Memastikan deliveryCats tidak berupa array
      },
      {
        $addFields: {
          orderNumIndex: {
            $indexOfArray: ["$orderNum", "$transactionUnits.orderNum"],
          },
        },
      },
      {
        $sort: {
          orderNumIndex: 1, // Urutkan berdasarkan urutan array orderNum
        },
      },
      {
        $group: {
          _id: "$_id",
          unitId: { $first: "$unitId" },
          type: { $first: "$type" },
          batteryCapacity: { $first: "$batteryCapacity" },
          currentState: { $first: "$currentState" },
          lockState: { $first: "$lockState" },
          temperature: { $first: "$temperature" },
          longitude: { $first: "$longitude" },
          latitude: { $first: "$latitude" },
          humidity: { $first: "$humidity" },
          platNumber: { $first: "$platNumber" },
          departureTime: { $first: "$departureTime" },
          currentTransaction: { $first: "$currentTransaction" },
          transactionUnits: { $push: "$transactionUnits" },
        },
      },
    ]);
    res.formatter.ok(units);
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
};

const getByUnitId = async (req, res) => {
  const { unitId } = req.params;

  try {
    var units = await Unit.aggregate([
      {
        $match: {
          unitId: unitId,
        },
      },
      {
        $lookup: {
          from: "transactions",
          localField: "orderNum",
          foreignField: "orderNum",
          as: "transactionUnits",
        },
      },
      {
        $unwind: "$transactionUnits",
      },
      {
        $lookup: {
          from: "products",
          localField: "transactionUnits.prod_code",
          foreignField: "prod_code",
          as: "transactionUnits.productDetails",
        },
      },
      {
        $lookup: {
          from: "relations",
          localField: "transactionUnits.cust_num",
          foreignField: "custNum",
          as: "transactionUnits.address",
        },
      },
      {
        $unwind: "$transactionUnits.address", // Memastikan address tidak berupa array
      },
      {
        $lookup: {
          from: "deliverycats",
          localField: "transactionUnits.productDetails.kategoriPengiriman",
          foreignField: "kategoriPengiriman",
          as: "transactionUnits.deliveryCat",
        },
      },
      {
        $unwind: "$transactionUnits.deliveryCat", // Memastikan deliveryCats tidak berupa array
      },
      {
        $addFields: {
          orderNumIndex: {
            $indexOfArray: ["$orderNum", "$transactionUnits.orderNum"],
          },
        },
      },
      {
        $sort: {
          orderNumIndex: 1, // Urutkan berdasarkan urutan array orderNum
        },
      },
      {
        $group: {
          _id: "$_id",
          unitId: { $first: "$unitId" },
          type: { $first: "$type" },
          orderNum: { $first: "$orderNum" },
          batteryCapacity: { $first: "$batteryCapacity" },
          currentState: { $first: "$currentState" },
          lockState: { $first: "$lockState" },
          temperature: { $first: "$temperature" },
          longitude: { $first: "$longitude" },
          latitude: { $first: "$latitude" },
          humidity: { $first: "$humidity" },
          platNumber: { $first: "$platNumber" },
          departureTime: { $first: "$departureTime" },
          currentTransaction: { $first: "$currentTransaction" },
          transactionUnits: { $push: "$transactionUnits" },
        },
      },
    ]);
    res.formatter.ok(units);
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
};

const getOnGoingSocket = async () => {
  try {
    var units = await Unit.aggregate([
      {
        $match: {
          currentState: true,
        },
      },
      {
        $lookup: {
          from: "transactions",
          localField: "orderNum",
          foreignField: "orderNum",
          as: "transactionUnits",
        },
      },
      {
        $unwind: "$transactionUnits",
      },
      {
        $lookup: {
          from: "products",
          localField: "transactionUnits.prod_code",
          foreignField: "prod_code",
          as: "transactionUnits.productDetails",
        },
      },
      {
        $lookup: {
          from: "relations",
          localField: "transactionUnits.cust_num",
          foreignField: "custNum",
          as: "transactionUnits.address",
        },
      },
      {
        $unwind: "$transactionUnits.address", // Memastikan address tidak berupa array
      },
      {
        $lookup: {
          from: "deliverycats",
          localField: "transactionUnits.productDetails.kategoriPengiriman",
          foreignField: "kategoriPengiriman",
          as: "transactionUnits.deliveryCat",
        },
      },
      {
        $unwind: "$transactionUnits.deliveryCat", // Memastikan deliveryCats tidak berupa array
      },
      {
        $addFields: {
          orderNumIndex: {
            $indexOfArray: ["$orderNum", "$transactionUnits.orderNum"],
          },
        },
      },
      {
        $sort: {
          orderNumIndex: 1, // Urutkan berdasarkan urutan array orderNum
        },
      },
      {
        $group: {
          _id: "$_id",
          unitId: { $first: "$unitId" },
          type: { $first: "$type" },
          batteryCapacity: { $first: "$batteryCapacity" },
          currentState: { $first: "$currentState" },
          lockState: { $first: "$lockState" },
          temperature: { $first: "$temperature" },
          longitude: { $first: "$longitude" },
          latitude: { $first: "$latitude" },
          humidity: { $first: "$humidity" },
          platNumber: { $first: "$platNumber" },
          departureTime: { $first: "$departureTime" },
          currentTransaction: { $first: "$currentTransaction" },
          transactionUnits: { $push: "$transactionUnits" },
        },
      },
    ]);
    return units;
  } catch (error) {
    console.log({ message: error });
  }
};

const get = async (req, res) => {
  try {
    var units = await Unit.find();
    res.formatter.ok(units);
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
};

/* Mobile */
const connect = async (req, res) => {
  const { unitId } = req.body;
  try {
    var unit = await Unit.findOne({ unitId: unitId });
    if (!unit) {
      throw { message: "Mediguard Not Found" };
    }

    var update;
    if (unit.currentTransaction) {
      update = { currentState: true };
    } else {
      update = { currentState: true, currentTransaction: unit.orderNum[0] };
      await Transaction.updateOne(
        { orderNum: unit.orderNum[0] },
        { delivery_date: new Date() }
      );
    }

    const updatedUnit = await Unit.findOneAndUpdate(
      { unitId: unitId },
      update,
      { new: true }
    );

    res.formatter.ok(updatedUnit);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal server error",
    });
  }
};

const nextDestination = async (req, res) => {
  const { unitId } = req.body;
  try {
    var unit = await Unit.findOne({ unitId: unitId });
    if (unit) {
      const index = unit.orderNum.indexOf(unit.currentTransaction);
      if (index < unit.orderNum.length) {
        // Jika terakhir
        if (index == unit.orderNum.length - 1) {
          await Unit.updateOne(
            { unitId: unitId },
            {
              currentState: false,
              currentTransaction: null,
              orderNum: [],
            }
          );
          // Update Arrive paket terakhir
          await Transaction.updateOne(
            { orderNum: unit.orderNum[index] },
            { arrival_date: new Date() }
          );

          // Jika next
        } else {
          await Unit.updateOne(
            { unitId: unitId },
            {
              currentTransaction: unit.orderNum[index + 1],
            }
          );
          // Update Arrive dan deliver paket berikutnya
          await Transaction.updateOne(
            { orderNum: unit.orderNum[index] },
            { arrival_date: new Date() }
          );
          await Transaction.updateOne(
            { orderNum: unit.orderNum[index + 1] },
            { delivery_date: new Date() }
          );
        }
      }
      res.formatter.ok("Next destination success");
    } else {
      return res.status(500).send({ message: "MediGuard Not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
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
    const data = await Unit.updateOne(
      { unitId: device },
      {
        lockState: value,
      }
    );

    res.formatter.ok(data != null);
  } catch (error) {
    console.log(error);
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
      await Unit.updateMany(
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

module.exports = {
  uploadData,
  get,
  getOnGoing,
  getOnGoingSocket,
  connect,
  getByUnitId,
  nextDestination,
  updateDeviceLock,
  saveSensorToMongo,
};
