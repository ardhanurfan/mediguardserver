const Vendor = require("../models/VendorModel");
const dataset = require("../dataset/vendor.json");
const uploadData = async (req, res) => {
    try {
        await dataset.forEach(async (element) => {
            await Vendor.create([
                {
                    _id: element.VENDOR_ID,
                    shipper: element.SHIPPER_CODE,
                    cabang: element.CABANG,
                    shipmethod_code: element.SHIPMETHOD_CODE,
                    service: element.SERVICE,
                    chargeBase: element.CHARGE_BASE,
                    licensePlate: element.LICENSE_PLATE,
                    minType: element.MIN_TYPE,
                    calcType: element.CALC_TYPE,
                    type: element.TYPE,
                    moda: element.MODA,
                    printFlag: element.PRINT_FLAG,
                    packerFlag: element.PACKER_FLAG,
                    leadTime: element.LEAD_TIME,
                    ppnType: element.PPN_TYPE,
                    wht: element.WHT,
                    lineNumber: element.LINE_NUMBER,
                    termMin: element.TERM_MIN,
                    termMax: element.TERM_MAX,
                    rate: element.RATE
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