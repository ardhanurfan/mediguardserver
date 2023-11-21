const wwebjsConnection = require("../wwebjs");
const { MessageMedia } = require("whatsapp-web.js");

const sendQRCode = async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;
    const phoneNumberSend = phoneNumber + "@c.us"; // Gantilah dengan nomor telepon tujuan Anda
    const media = await MessageMedia.fromUrl(
      `https://quickchart.io/qr?text=${code}&dark=FFFFFF&light=0F2341&centerImageUrl=https://imageupload.io/ib/LymxhlfWYwAn9re_1699517572.png`,
      { unsafeMime: true }
    );

    wwebjsConnection.sendMessage(phoneNumberSend, media, {
      caption:
        "Halo, pelanggan. Berikut merupakan QR Code untuk membuka MediGuard ketika sudah sampai lokasi. Terima Kasih.",
    });

    res.formatter.ok("Send QR Code Successfully");
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const send = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const phoneNumberSend = phoneNumber + "@c.us"; // Gantilah dengan nomor telepon tujuan Anda

    wwebjsConnection.sendMessage(
      phoneNumberSend,
      "Halo, pelanggan. Barang kamu sudah mau sampai, pastikan Anda di lokasi. Terima Kasih."
    );

    res.formatter.ok("Send Messages Successfully");
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

module.exports = { sendQRCode, send };
