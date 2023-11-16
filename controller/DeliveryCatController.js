const DeliveryCat = require("../models/DeliveryCatModel");
const dataset = require("../dataset/deliverycat.json");
const uploadData = async (req, res) => {
    try {
        await dataset.forEach(async (element) => {
            await DeliveryCat.create([
                {
                    kategoriPengiriman: element.kategori_pengiriman,
                    suhuSimpan: element.suhu_simpan,
                    minSuhu: element.min_suhu_kirim_celcius,
                    maxSuhu: element.max_suhu_kirim_celcius
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