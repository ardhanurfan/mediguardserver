var express = require("express");
var router = express.Router();
const sensor = require("../controller/SensorController");

/* GET sensors listing. */
router.get("/sensor/:id", sensor.getSensor);

module.exports = router;
