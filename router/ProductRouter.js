var express = require("express");
var router = express.Router();
const product = require("../controller/ProductController");

router.post("/product/push-dataset", product.uploadData);
module.exports = router;