var express = require("express");
var router = express.Router();
const transaction = require("../controller/TransactionController");

/* POST transaction dataset */
router.post("/push-dataset", transaction.uploadData);

module.exports = router;
