const mqtt = require("mqtt");

let mqttConnection = mqtt.connect("mqtt://broker.hivemq.com:1883");

module.exports = mqttConnection;
