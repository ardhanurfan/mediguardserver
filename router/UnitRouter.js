var express = require("express");
var router = express.Router();
const unit = require("../controller/UnitController");
const auth = require("../middleware/auth");

router.use(auth.isLogin);

/* POST unit datase */
router.post("/push-dataset", unit.uploadData);

router.get("/get-on-going", unit.getOnGoing);

router.get("/get", unit.get);

module.exports = router;
