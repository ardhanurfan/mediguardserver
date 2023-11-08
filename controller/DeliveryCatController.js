const DeliveryCat = require("../models/DeliveryCatModel");
const dataset = require("../dataset/deliverycat.json");
const uploadData = async (req, res) => {
    try {
        await dataset.forEach(async (element) => {
            await DeliveryCat.create([
                {
                    _id: element.kode_produk,
                    namaProduk: element.nama_produk,
                    hna: element.hna,
                    het: element.het,
                    uom: element.uom,
                    beratGram: element.beratGram,
                    panjangCm: element.panjangCm,
                    lebarCm: element.lebarCm,
                    tinggiCm: element.tinggiCm,
                    volumeCm3: element.volumeCm3,
                    isLifeSaving: element.isLifeSaving,
                    kategoriPengiriman: element.kategoriPengiriman
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