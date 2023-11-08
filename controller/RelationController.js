const Relation = require("../models/RelationModel");
const dataset = require("../dataset/relation.json");
const uploadData = async (req, res) => {
    try {
        await dataset.forEach(async (element) => {
            await Relation.create([
                {
                    _id: element.customer_number,
                    alamat: element.alamat,
                    state: element.state,
                    city: element.city,
                    province: element.province,
                    zipCode: element.zipCode,
                    channel: element.channel,
                    shipMethodCode: element.shipMethodCode,
                    shipMethodDesc: element.shipMethodDesc,
                    deliveryAreaGroup: element.deliveryAreaGroup
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