var express = require("express");
var router = express.Router();
const vendor = require("../controller/VendorController");

/* POST vendor datase */
router.post("/push-dataset", vendor.uploadData);

router.post("/get-ongkir", vendor.getOngkir);

router.get("/get-province/:provinceId", vendor.getProvince);

module.exports = router;
