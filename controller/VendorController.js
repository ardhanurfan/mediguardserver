const Vendor = require("../models/VendorModel");
const dataset = require("../dataset/vendor.json");
const axios = require("axios");
const apiKey = "e98923788ac06282c32fac27e30d6e62";

const uploadData = async (req, res) => {
  try {
    dataset.forEach(async (element) => {
      await Vendor.create([
        {
          shipper: element.SHIPPER_CODE,
          cabang: element.CABANG,
          shipmethod_code: element.SHIPMETHOD_CODE,
          vendorId: element.VENDOR_ID,
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
          termMin: Number.parseInt(element.TERM_MIN),
          termMax: element.TERM_MAX,
          rate: element.RATE,
        },
      ]);
    });
    res.formatter.ok("Upload data done");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

/* Get Cost From Raja Ongkir */
const getOngkir = async (req, res) => {
  const { origin, destination, weight, courier } = req.body;
  try {
    const response = await axios.post(
      "https://api.rajaongkir.com/starter/cost",
      {
        origin: origin,
        destination: destination,
        weight: weight,
        courier: courier,
      },
      {
        headers: {
          key: apiKey,
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.formatter.ok(response.data);
  } catch (error) {
    res.status(500).json({
      message:
        error.response.data.rajaongkir.status.description ||
        "Internal server error",
    });
  }
};

const getProvince = async (req, res) => {
  const provinceId = req.query.provinceId;

  try {
    const response = await axios.get(
      `https://api.rajaongkir.com/starter/province${
        provinceId ? `?id=${provinceId}` : ""
      }`,
      {
        params: {
          id: provinceId,
        },
        headers: {
          key: apiKey,
        },
      }
    );

    res.formatter.ok(response.data);
  } catch (error) {
    res.status(500).json({
      message: error.response.data || "Internal server error",
    });
  }
};

const getCity = async (req, res) => {
  const provinceId = req.query.provinceId;
  const cityId = req.query.cityId;

  try {
    const response = await axios.get(
      `https://api.rajaongkir.com/starter/city${cityId ? `?id=${cityId}` : ""}${
        cityId && provinceId
          ? "&province=" + provinceId
          : provinceId
          ? `?province=${provinceId}`
          : ""
      }`,
      {
        headers: {
          key: apiKey,
        },
      }
    );

    res.formatter.ok(response.data);
  } catch (error) {
    res.status(500).json({
      message: error.response.data || "Internal server error",
    });
  }
};

module.exports = {
  uploadData,
  getOngkir,
  getProvince,
  getCity,
};
