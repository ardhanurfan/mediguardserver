const Unit = require("../models/UnitModel");
const dataset = require("../dataset/unit.json");
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

module.exports = {
  uploadData,
  get,
  getOnGoing,
  getOnGoingSocket,
};
