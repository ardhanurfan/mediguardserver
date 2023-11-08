const Vendor = require("../models/VendorModel");
const dataset = require("../dataset/vendor.json");
const uploadData = async (req, res) => {
    try {
        await dataset.forEach(async (element) => {
            await Vendor.create([
                {
                    _id: element.shipper_code,
                    cabang: element.cabang,
                    shipmethod_code: element.shipmethod_code,
                    service: element.service,
                    chargeBase: element.chargeBase,
                    licensePlate: element.licensePlate,
                    minType: element.minType,
                    calcType: element.calcType,
                    type: element.type,
                    moda: element.moda,
                    printFlag: element.printFlag,
                    packerFlag: element.packerFlag,
                    leadTime: element.leadTime,
                    ppnType: element.ppnType,
                    wht: element.wht,
                    lineNumber: element.lineNumber,
                    termMin: element.termMin,
                    termMax: element.termMax,
                    rate: element.rate
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