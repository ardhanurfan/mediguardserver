const Transaction = require("../models/TransactionModel");
const dataset = require("../dataset/transaction.json");
const uploadData = async (req, res) => {
    try {
        await dataset.forEach(async (element) => {
            await Transaction.create([
                {
                    staffId: element.staffId,
                    orderNum: element.ORDER_NUMBER,
                    deliveryNum: element.DELIVERY_NO,
                    transportType: element.TIPE_TRANSPORT,
                    branchCode: element.KODE_CABANG,
                    ship_method_code: element.SHIP_METHOD_CODE,
                    cust_num: element.CUSTOMER_NUMBER,
                    prod_code: element.PRODUCT_CODE,
                    shipped_qty: element.SHIPPED_QTY,
                    unitId: element.unitId,
                    packing_date: element.packing_date,
                    delivery_date: element.DISPATCH_DATE,
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