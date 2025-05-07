const mqtt = require('mqtt');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const client = require('./mqttClient');
const http = require('http')
const cors = require('cors'); 
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

// Thông tin Adafruit IO
const ADAFRUIT_USERNAME = 'lnun187';
const ADAFRUIT_KEY = 'aio_Cmrf05ixax0iXvGTB94gIYd0Z9TP';

const FEED_NAMES = [
    'DADN_DHT20_HUM', 
    'DADN_DHT20_TEMP', 
    'DADN_LIGHT_SENSOR', 
    'DADN_SOIL_MOISTURE', 
    'DADN_FAN', 
    'DADN_RGB_LED',
    'DADN_PUMP1'
];
const MQTT_URL = `mqtts://io.adafruit.com`;

// Setup MongoDB và Express
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3001;
            
app.use(express.json());
app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// ID + role của người dùng đang kết nối
global.connectedUsers = {};
global.io = io;
secretKey = process.env.PRIVATE_KEY_PASSPHRASE;

io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
  
    // Nhận token từ client để xác thực
    socket.on('authenticate', (token) => {
      try {
        const decoded = jwt.verify(token, secretKey);
        console.log ('Xác thực token socket thành công:', decoded);
        const userId = decoded.userId;
        const role = decoded.Role;
  
        // Gắn userId vào socket
        connectedUsers[userId] = { socketId: socket.id, role };
        console.log(`User ${userId} (${role}) connected via socket`);
      } catch (err) {
        console.log('Xác thực token socket thất bại:', err.message);
      }
    });
  
    // Xóa khỏi map khi socket disconnect
    socket.on('disconnect', () => {
      for (const userId in connectedUsers) {
        if (connectedUsers[userId].socketId === socket.id) {
          delete connectedUsers[userId];
          console.log(`User ${userId} đã ngắt kết nối socket`);
          break;
        }
      }
    });
  });

  
// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

//Route Setup
const authRoutes = require("./routes/account");
app.use("/auth", authRoutes);

const recordRoutes = require('./routes/record');
app.use('/api/record', recordRoutes);

const staffRoutes = require('./routes/staff');
app.use('/api/staff', staffRoutes);

const adminRoutes = require('./routes/admin');
app.use('/control', adminRoutes);


// Import các schema
const Record = require('./models/record');
const SoilRecord = require('./models/soil_Record');
const HumidityRecord = require('./models/hum_Record');
const TemperatureRecord = require('./models/temp_Record');
const LightRecord = require('./models/light_Record');
const FanRecord = require('./models/fan_Record');
const LedRecord = require('./models/led_Record');
const PumpRecord = require('./models/pump_Record');

// // Kết nối tới Adafruit IO MQTT
// const client = mqtt.connect(MQTT_URL, {
//     username: ADAFRUIT_USERNAME,
//     password: ADAFRUIT_KEY
// });

// client.on('connect', () => {
//     console.log('Đã kết nối tới Adafruit IO MQTT');

//     // Subscribe vào các feed
//     FEED_NAMES.forEach(feed => {
//         const topic = `${ADAFRUIT_USERNAME}/feeds/${feed}`;
//         client.subscribe(topic, (err) => {
//             if (err) console.error(`Lỗi khi subscribe vào ${feed}:`, err);
//             else console.log(`Đã subscribe vào feed: ${feed}`);
//         });
//     });
// });

// Xử lý dữ liệu nhận được từ MQTT
// client.on("message", async (topic, message) => {
//     const feed = topic.split("/").pop();
//     const value = message.toString();
//     const currentTime = new Date().toISOString();

//     console.log(`Nhận dữ liệu từ ${feed}: ${value}`);

//     try {
//         // Tạo bản ghi mới cho mỗi dữ liệu nhận được
//         const newRecord = await Record.create({ Time: currentTime });
//         console.log("Đã tạo bản ghi mới trong Record:", newRecord._id);

//         // Lưu dữ liệu vào bảng tương ứng
//         switch (feed) {
//             case "DADN_DHT20_HUM":
//                 await HumidityRecord.create({ RC_Id: newRecord._id, Value: value });
//                 console.log("Đã lưu dữ liệu độ ẩm vào MongoDB.");
//                 break;

//             case "DADN_DHT20_TEMP":
//                 await TemperatureRecord.create({ RC_Id: newRecord._id, Value: value });
//                 console.log("Đã lưu dữ liệu nhiệt độ vào MongoDB.");
//                 break;

//             case "DADN_LIGHT_SENSOR":
//                 await LightRecord.create({ RC_Id: newRecord._id, Value: value });
//                 console.log("Đã lưu dữ liệu cảm biến ánh sáng vào MongoDB.");
//                 break;

//             case "DADN_SOIL_MOISTURE":
//                 await SoilRecord.create({ RC_Id: newRecord._id, Value: value });
//                 console.log("Đã lưu dữ liệu độ ẩm đất vào MongoDB.");
//                 break;

//             case "DADN_FAN":
//                 await FanRecord.create({ RC_Id: newRecord._id, Value: value });
//                 console.log("Đã lưu trạng thái quạt vào MongoDB.");
//                 break;

//             case "DADN_RGB_LED":
//                 await LedRecord.create({ RC_Id: newRecord._id, Value: value });
//                 console.log("Đã lưu trạng thái đèn vào MongoDB.");
//                 break;

//             case "DADN_PUMP1":
//                 await PumpRecord.create({ RC_Id: newRecord._id, Value: value });
//                 console.log("Đã lưu trạng thái máy bơm nước 1 vào MongoDB.");
//                 break;

//             default:
//                 console.warn(`Không có schema phù hợp cho feed: ${feed}`);
//                 break;
//         }
//     } catch (error) {
//         console.error("Lỗi khi lưu vào MongoDB:", error);
//     }
// });


// Khởi động server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
