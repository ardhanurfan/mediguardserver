var express = require("express");
var router = express.Router();
const deliveryCat = require("../controller/DeliveryCatController");

/* POST deliveryCat dataset */
router.post("/push-dataset", deliveryCat.uploadData);

router.get("/get/:orderNum", deliveryCat.get);

module.exports = router;
