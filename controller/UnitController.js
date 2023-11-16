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
                    latitude: element.latitude
                },
            ]);
        });
        res.formatter.ok("Upload data done");
    }catch (error) {
        console.log(error);
        return res.status(500).send({message:"Error"});
    }
};

module.exports = {
    uploadData,
};