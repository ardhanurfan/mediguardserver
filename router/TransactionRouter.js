var express = require("express");
var router = express.Router();
const transaction = require("../controller/TransactionController");

/* POST transaction dataset */
router.post("/transaction/push-dataset", transaction.uploadData);

module.exports = router;