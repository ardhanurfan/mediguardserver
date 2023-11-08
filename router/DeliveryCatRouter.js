var express = require("express");
var router = express.Router();
const deliveryCat = require("../controller/DeliveryCatController");

/* POST deliveryCat dataset */
router.post("/deliveryCat/push-dataset", deliveryCat.uploadData);

module.exports = router;
