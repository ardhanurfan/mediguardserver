var express = require("express");
var router = express.Router();
const wa = require("../controller/WhatsappController");

/* Send QR datase */
router.post("/send-qr", wa.sendQRCode);
router.post("/send", wa.send);

module.exports = router;
