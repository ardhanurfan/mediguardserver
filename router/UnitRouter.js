var express = require("express");
var router = express.Router();
const unit = require("../controller/UnitController");

/* POST unit datase */
router.post("/unit/push-dataset", unit.uploadData);

module.exports = router;