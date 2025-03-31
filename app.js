const mqtt = require('mqtt');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Thông tin Adafruit IO
// const ADAFRUIT_USERNAME = 'ivanru';
// const ADAFRUIT_KEY = 'aio_PZkk338TJbPRk19F41EFxu84pfCT';
const FEED_NAMES = ['DADN_DHT20_HUM', 'DADN_DHT20_TEMP', 'DADN_LIGHT_SENSOR', 'DADN_SOIL_MOISTURE', 'DADN_FAN', 'DADN_RGB_LED'];
const MQTT_URL = `mqtts://io.adafruit.com`;

// Setup MongoDB và Express
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

//Route Setup
const recordRoutes = require('./routes/record');
app.use('/api/record', recordRoutes);
const authRoutes = require("./routes/account");
app.use("/auth", authRoutes);

// Import các schema
const Record = require('./models/record');
const SoilRecord = require('./models/soil_Record');
const HumidityRecord = require('./models/hum_Record');
const TemperatureRecord = require('./models/temp_Record');
const LightRecord = require('./models/light_Record');
// const FanRecord = require('./models/')

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

// Xử lý dữ liệu nhận được từ MQTT
client.on("message", async (topic, message) => {
    const feed = topic.split("/").pop();
    const value = message.toString();
    const currentTime = new Date().toISOString();

    console.log(`Nhận dữ liệu từ ${feed}: ${value}`);

    try {
        // Tạo bản ghi mới cho mỗi dữ liệu nhận được
        const newRecord = await Record.create({ Time: currentTime });
        console.log("Đã tạo bản ghi mới trong Record:", newRecord._id);

        // Lưu dữ liệu vào bảng tương ứng
        switch (feed) {
            case "DADN_DHT20_HUM":
                await HumidityRecord.create({ RC_Id: newRecord._id, Value: value });
                console.log("Đã lưu dữ liệu độ ẩm vào MongoDB.");
                break;

            case "DADN_DHT20_TEMP":
                await TemperatureRecord.create({ RC_Id: newRecord._id, Value: value });
                console.log("Đã lưu dữ liệu nhiệt độ vào MongoDB.");
                break;

            case "DADN_LIGHT_SENSOR":
                await LightRecord.create({ RC_Id: newRecord._id, Value: value });
                console.log("Đã lưu dữ liệu cảm biến ánh sáng vào MongoDB.");
                break;

            case "DADN_SOIL_MOISTURE":
                await SoilRecord.create({ RC_Id: newRecord._id, Value: value });
                console.log("Đã lưu dữ liệu độ ẩm đất vào MongoDB.");
                break;

            // case "DADN_FAN":
            //     await FanRecord.create({ RC_Id: newRecord._id, Value: value });
            //     console.log("Đã lưu trạng thái quạt vào MongoDB.");
            //     break;

            default:
                console.warn(`Không có schema phù hợp cho feed: ${feed}`);
                break;
        }
    } catch (error) {
        console.error("Lỗi khi lưu vào MongoDB:", error);
    }
});


// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
