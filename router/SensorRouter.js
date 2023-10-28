var express = require("express");
var router = express.Router();
const sensor = require("../controller/SensorController");

/* GET sensors listing. */
router.get("/sensor/:id", sensor.getSensor);

/* UPDATE device lock */
router.put("/device-lock", sensor.updateDeviceLock);

module.exports = router;
