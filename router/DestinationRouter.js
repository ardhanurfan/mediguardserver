var express = require("express");
var router = express.Router();
const destination = require("../controller/DestinationController");

/* POST destination dataset */
router.post("/push-dataset", destination.uploadData);

module.exports = router;
