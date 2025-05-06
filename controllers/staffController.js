const FEED_NAMES = [
    'DADN_FAN', 
    'DADN_RGB_LED',
    'DADN_PUMP1',
    'DADN_PUMP2',
  ];
  
  
const client = require('../mqttClient');

const controlDevice = (req, res) => {
    const { feed } = req.params;
    const { value } = req.body;

    if (!FEED_NAMES.includes(feed)) {
        return res.status(400).json({ message: 'Feed không hợp lệ, vui lòng kiểm tra lại' });
    }
    switch (feed) {
        case 'DADN_FAN':
            if (typeof value !== 'number' || value < 0 || value > 250) {
                return res.status(400).json({ message: 'Giá trị quạt không hợp lệ, vui lòng nhập giá trị từ 0 đến 250' });
            }
            break;
        case 'DADN_RGB_LED':
            if (!/^#[0-9A-Fa-f]{6}$/.test(value)) {
                return res.status(400).json({ message: 'Giá trị đèn không hợp lệ, vui lòng nhập mã màu HEX (ví dụ: #FF0000)' });
            }
            break;
        case 'DADN_PUMP1':
        case 'DADN_PUMP2':
            if (value !== 0 && value !== 1) {
                return res.status(400).json({ message: 'Giá trị bơm không hợp lệ, vui lòng nhập 0 (TẮT) hoặc 1 (BẬT)' });
            }
            break;
        default:
            return res.status(400).json({ message: 'Feed không hợp lệ, vui lòng kiểm tra lại' });
    }
    const topic = `${process.env.ADAFRUIT_USERNAME}/feeds/${feed}`;
    client.publish(topic, value.toString(), (err) => {
    if (err) {
        console.error('MQTT publish error:', err);
        return res.status(500).json({ message: 'Gửi dữ liệu thất bại' });
    }

    console.log(`Đã gửi giá trị ${value} tới feed ${feed}`);
    res.json({ message: 'Gửi thành công', feed, value });
    });


            // try {
        //     // Lưu lệnh điều khiển vào MongoDB
        //     let record;
        //     if (device === "fan") {
        //         record = await FanRecord.create({ Value: message });
        //     } else if (device === "led") {
        //         record = await LedRecord.create({ Value: message });
        //     } else if (device === "pump1") {
        //         record = await Pump1Record.create({ Value: message });
        //     } else if (device === "pump2") {
        //         record = await Pump2Record.create({ Value: message });
        //     }
        //     console.log("Stored command in MongoDB:", record);
        // } catch (dbError) {
        //     console.error("Database Error:", dbError);
        // }
};

module.exports = { controlDevice };