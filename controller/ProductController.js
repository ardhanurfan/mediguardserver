const Product = require("../models/ProductModel");
const dataset = require("../dataset/product.json");
const uploadData = async (req, res) => {
  try {
    await dataset.forEach(async (element) => {
      await Product.create([
        {
          prod_code: element.kode_produk,
          namaProduk: element.nama_produk,
          hna: Number.parseInt(element.HNA),
          het: Number.parseInt(element.HET),
          uom: element.UOM,
          beratGram: Number.parseInt(element.berat_gram),
          panjangCm: element.panjangCm
            ? Number.parseInt(element.panjang_cm)
            : 0,
          lebarCm: element.lebar_cm,
          tinggiCm: element.tinggi_cm,
          volumeCm3: element.volume_cm3,
          isLifeSaving: element.is_life_saving,
          kategoriPengiriman: element.kategori_pengiriman,
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
