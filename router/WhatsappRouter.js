var express = require("express");
var router = express.Router();
const wa = require("../controller/WhatsappController");

/* Send QR datase */
router.post("/wa/send-qr", wa.sendQRCode);

module.exports = router;
