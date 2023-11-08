var express = require("express");
var router = express.Router();
const branch = require("../controller/BranchController");

/* POST branch datase */
router.post("/branch/push-dataset", branch.uploadData);

module.exports = router;
