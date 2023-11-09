const Branch = require("../models/BranchModel");
const dataset = require("../dataset/branch.json");

const uploadData = async (req, res) => {
  try {
    await dataset.forEach(async (element) => {
      await Branch.create([
        {
          _id: element.id_cabang,
          namaCabang: element.nama_cabang,
          alamat: element.alamat,
          kode_cabang: element.kode_cabang,
        },
      ]);
    });
    // res.formatter.ok(dataset);
    res.formatter.ok("Upload data done");
  } catch (error) {
    res.formatter.badRequest(error);
  }
};

module.exports = {
  uploadData,
};
