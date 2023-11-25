const DeliveryCat = require("../models/DeliveryCatModel");
const Transaction = require("../models/TransactionModel");
const Product = require("../models/ProductModel");
const dataset = require("../dataset/deliveryCat.json");

const uploadData = async (req, res) => {
  try {
    dataset.forEach(async (element) => {
      await DeliveryCat.create([
        {
          kategoriPengiriman: element.kategori_pengiriman,
          suhuSimpan: element.suhu_simpan,
          minSuhu: element.min_suhu_kirim_celcius,
          maxSuhu: element.max_suhu_kirim_celcius,
        },
      ]);
    });
    res.formatter.ok("Upload data done");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error" });
  }
};

const get = async (req, res) => {
  const { orderNum } = req.params;
  try {
    const transaction = await Transaction.findOne({ orderNum: orderNum });
    const product = await Product.findOne({
      prod_code: transaction.prod_code,
    });
    const deliveryCat = await DeliveryCat.findOne({
      kategoriPengiriman: product.kategoriPengiriman,
    });

    res.formatter.ok(deliveryCat);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error" });
  }
};

module.exports = {
  uploadData,
  get,
};
