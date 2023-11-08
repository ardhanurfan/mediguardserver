const Transaction = require("../models/TransactionModel");
const dataset = require("../dataset/transaction.json");
const uploadData = async (req, res) => {
    try {
        await dataset.forEach(async (element) => {
            await Transaction.create([
                {
                    staffId: element.staffId,
                    transportType: element.transportType,
                    branchCode: element.branchCode,
                    ship_method_code: element.ship_method_code,
                    cust_num: element.cust_num,
                    prod_code: element.prod_code,
                    unitId: element.unitId,
                    packing_date: element.packing_date,
                    delivery_date: element.delivery_date,
                    arrival_date: element.arrival_date

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