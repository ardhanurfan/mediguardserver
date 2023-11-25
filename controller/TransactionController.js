const Transaction = require("../models/TransactionModel");
const Unit = require("../models/UnitModel");
const dataset = require("../dataset/transaction.json");
const wwebjsConnection = require("../wwebjs");
const { MessageMedia } = require("whatsapp-web.js");

const uploadData = async (req, res) => {
  try {
    var datasetSlice = dataset.slice(0, 30);
    await datasetSlice.forEach(async (element) => {
      await Transaction.create([
        {
          staffId: element.staffId,
          orderNum: element.ORDER_NUMBER,
          deliveryNum: element.DELIVERY_NO,
          transportType: element.TIPE_TRANSPORT,
          branchCode: element.KODE_CABANG,
          status: element.STATUS,
          ship_method_code: element.SHIP_METHOD_CODE,
          cust_num: element.CUSTOMER_NUMBER,
          prod_code: element.PRODUCT_CODE,
          shipped_qty: element.SHIPPED_QTY,
          unitId: element.unitId,
          packing_date: element.packing_date,
          delivery_date: element.DISPATCH_DATE,
          arrival_date: element.arrival_date,
        },
      ]);
    });
    res.formatter.ok("Upload data done");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error" });
  }
};

const getTransaction = async (req, res) => {
  try {
    var transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "prod_code",
          foreignField: "prod_code",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails", // Memastikan address tidak berupa array
      },
      {
        $lookup: {
          from: "relations",
          localField: "cust_num",
          foreignField: "custNum",
          as: "address",
        },
      },
      {
        $unwind: "$address", // Memastikan address tidak berupa array
      },
      {
        $lookup: {
          from: "branches",
          localField: "branchCode",
          foreignField: "kode_cabang",
          as: "branches",
        },
      },
      {
        $unwind: "$branches", // Memastikan address tidak berupa array
      },
    ]);

    res.formatter.ok(transactions);
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
};

const getTransactionSocket = async (req, res) => {
  try {
    var transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "prod_code",
          foreignField: "prod_code",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails", // Memastikan address tidak berupa array
      },
      {
        $lookup: {
          from: "relations",
          localField: "cust_num",
          foreignField: "custNum",
          as: "address",
        },
      },
      {
        $unwind: "$address", // Memastikan address tidak berupa array
      },
      {
        $lookup: {
          from: "branches",
          localField: "branchCode",
          foreignField: "kode_cabang",
          as: "branches",
        },
      },
      {
        $unwind: "$branches", // Memastikan address tidak berupa array
      },
    ]);

    return transactions;
  } catch (error) {
    console.log({ message: error.message || "Internal server error" });
  }
};

const assign = async (req, res) => {
  const { id, duration, unitId, packingDate, orderNum, vendor, distance } =
    req.body;
  try {
    await Transaction.updateOne(
      { _id: id },
      {
        distance: distance,
        duration: duration,
        unitId: unitId,
        packing_date: packingDate,
        vendor: `${vendor}`,
      }
    );
    await Unit.updateOne(
      { unitId: unitId },
      {
        $push: { orderNum: orderNum },
      }
    );
    const phoneNumber = "6285155034312";
    const phoneNumberSend = phoneNumber + "@c.us"; // Gantilah dengan nomor telepon tujuan Anda
    const media = await MessageMedia.fromUrl(
      `https://quickchart.io/qr?text=${orderNum}&size=512&dark=FFFFFF&light=0F2341&centerImageUrl=https://iili.io/Jo0Xv5v.png`,
      { unsafeMime: true }
    );

    await wwebjsConnection.sendMessage(phoneNumberSend, media, {
      caption:
        "Halo, pelanggan. Berikut merupakan QR Code untuk membuka MediGuard ketika sudah sampai lokasi. Terima Kasih.",
    });

    if (vendor == "pos" || vendor == "jne" || vendor == "tiki") {
      await wwebjsConnection.sendMessage(
        phoneNumberSend,
        "Halo, kami dari MediGuard ingin mengirimkan pesanan. Barang dapat diambil di cabang terdekat.Terima Kasih."
      );
    }

    res.formatter.ok("Assign Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error" });
  }
};

module.exports = {
  uploadData,
  getTransaction,
  assign,
  getTransactionSocket,
};
