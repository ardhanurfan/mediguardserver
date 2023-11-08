var express = require("express");
var router = express.Router();
const branch = require("../controller/BranchController");

/* POST branch dataset */
router.post("/branch/push-dataset", branch.uploadData);

module.exports = router;
