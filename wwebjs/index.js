const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  puppeteer: { args: ["--no-sandbox", "--disable-dev-shm-usage"] },
  authStrategy: new LocalAuth({
    clientId: "mediguard-admin",
  }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("WhatsApp Client is ready!");
});

module.exports = client;
