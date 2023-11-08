var express = require("express");
var router = express.Router();
const vendor = require("../controller/VendorController");

/* POST vendor datase */
router.post("/vendor/push-dataset", vendor.uploadData);

module.exports = router;