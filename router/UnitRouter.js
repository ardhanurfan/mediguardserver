var express = require("express");
var router = express.Router();
const unit = require("../controller/UnitController");
const auth = require("../middleware/auth");

/* POST unit datase */
router.post("/push-dataset", unit.uploadData);

router.get("/get-on-going", auth.isLogin, unit.getOnGoing);

router.get("/get", auth.isLogin, unit.get);

router.post("/connect", unit.connect);
router.post("/next", unit.nextDestination);

router.get("/transactionUnits/:unitId", unit.getByUnitId);

router.post("/device-lock", unit.updateDeviceLock);

module.exports = router;
