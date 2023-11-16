var express = require("express");
var router = express.Router();
const transaction = require("../controller/TransactionController");

/* POST transaction dataset */
router.post("/push-dataset", transaction.uploadData);

router.get("/task-list", transaction.getTaskList);

module.exports = router;
