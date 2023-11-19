const Destination = require("../models/DestinationModel");
const dataset = require("../dataset/destination.json");
const uploadData = async (req, res) => {
  try {
    await dataset.forEach(async (element) => {
      await Destination.create([
        {
          custNum: element.custNum,
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

module.exports = {
  uploadData,
};
