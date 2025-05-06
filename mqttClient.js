const mqtt = require('mqtt');
require('dotenv').config();

// Thông tin Adafruit IO
// const ADAFRUIT_USERNAME = 'ivanru';
// const ADAFRUIT_KEY = 'aio_PZkk338TJbPRk19F41EFxu84pfCT';
const FEED_NAMES = ['DADN_DHT20_HUM', 'DADN_DHT20_TEMP', 'DADN_LIGHT_SENSOR', 'DADN_SOIL_MOISTURE', 'DADN_FAN', 'DADN_RGB_LED', 'DADN_PUMP1', 'DADN_PUMP2'];
const MQTT_URL = `mqtts://io.adafruit.com`;

// Kết nối tới Adafruit IO MQTT
const client = mqtt.connect(MQTT_URL, {
    username: process.env.ADAFRUIT_USERNAME,
    password: process.env.ADAFRUIT_KEY
});


client.on('connect', () => {
    console.log('Đã kết nối tới Adafruit IO MQTT');

    // Subscribe vào các feed
    FEED_NAMES.forEach(feed => {
        const topic = `${process.env.ADAFRUIT_USERNAME}/feeds/${feed}`;
        client.subscribe(topic, (err) => {
            if (err) console.error(`Lỗi khi subscribe vào ${feed}:`, err);
            else console.log(`Đã subscribe vào feed: ${feed}`);
        });
    });
});
module.exports = client;