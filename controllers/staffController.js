const FEED_NAMES = [
    'DADN_FAN', 
    'DADN_RGB_LED',
    'DADN_PUMP1',
    'DADN_PUMP2',
  ];
const User = require('../models/User');
const Area = require('../models/Area');
const Schedule = require('../models/schedule');
const Watering = require('../models/watering_schedule');
const { encryptPassword } = require('../utils/cryptoUtils');
// const Notification = require('../models/Notification');
const client = require('../mqttClient');
const { authenticateToken } = require('../middlewares/authenticateToken');

// Staff get, delete, update
const getUser = async (req, res) => {
    try {  
        const userIdFromToken = req.user.userId;
        const user = await User.findById(userIdFromToken);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

const updateUser = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const { Email, Name, Password, Phone, Role } = req.body;
        
        const HashPassword =  await encryptPassword(Password);

        const user = await User.findByIdAndUpdate(id, { Email: Email, Name: Name, HashPassword: HashPassword,Phone: Phone, Role: Role }, { new: true });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
    res.status(200).json({ message: "User deleted successfully" });
};

// staff control device
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

// const getDevice = async (req, res) => {
//     const feed = req.params.feed;
//     const { value } = req.body;
//     const client = new mqtt.MqttClient(process.env.ADAFRUIT_MQTT_URL,
//         { username: process.env.ADAFRUIT_USERNAME, password: process.env.ADAFRUIT
//         KEY });
//     client.on('connect', () => {

// staff area
const getArea = async (req, res) => {
    try {
        const area = await Area.findOne({ name: "DADN" });
        if (!area) {
            return res.status(404).json({ message: "Không tìm thấy khu vực" });
        }       
        res.status(200).json(area);
    }
    catch (error) {
        console.error("Error fetching area:", error);
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu khu vực" });
    }
}

// staff watering schedule
const createWateringSchedule = async (req, res) => {
    try {
        const { Staff_id, Manager_id, Area_id, Status, Note, Time } = req.body;
        const wateringSchedule = new Watering({
            Time,
            Area_id,
            Status,
            Note,
        });
        await wateringSchedule.save();

        const W_id = wateringSchedule._id
        const schedule = new Schedule({
            Staff_id,
            Manager_id,
            W_id,
        });
        await schedule.save();
        res.status(201).json({ message: "Lịch tưới đã được tạo thành công", schedule });
    }
    catch (error) {
        console.error("Error creating watering schedule:", error);
        res.status(500).json({ message: "Lỗi khi tạo lịch tưới" });
    }
}

const getWateringSchedule = async (req, res) => {
    try {
        const schedules = await Schedule.find({ Staff_id: req.params.id });

        if (schedules.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy lịch tưới cho nhân viên này" });
        }

        const wateringIds = schedules.map(schedule => schedule.W_id);

        const wateringSchedules = await Watering.find({ _id: { $in: wateringIds } });

        res.status(200).json(wateringSchedules);

    } catch (error) {
        console.error("Error fetching watering schedule:", error);
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu lịch tưới" });
    }
};

const updateWateringSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { Status, Note } = req.body;
        const Watering = await Watering.findByIdAndUpdate(id, { Status, Note }, { new: true });
        if (!Watering) return res.status(404).json({ message: "Không tìm thấy lịch tưới" });
        res.status(200).json({ message: "Lịch tưới đã được cập nhật thành công", schedule });
    } catch (error) {
        console.error("Error updating watering schedule:", error);
        res.status(500).json({ message: "Lỗi khi cập nhật lịch tưới" });
    }
}

const deleteWateringSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const schedule = await Schedule.findByIdAndDelete(id);
        if (!schedule) return res.status(404).json({ message: "Không tìm thấy lịch tưới" });

        const W_id = schedule.W_id;

        const watering = await Watering.findByIdAndDelete(W_id);
        if (!watering) return res.status(404).json({ message: "Không tìm thấy lịch tưới nước" });

        res.status(200).json({ message: "Lịch tưới và lịch tưới nước đã được xóa thành công" });
    } catch (error) {
        console.error("Error deleting watering schedule:", error);
        res.status(500).json({ message: "Lỗi khi xóa lịch tưới" });
    }
};

// staff notification
const getStaffNotification = async (req, res) =>
    {
        try {
            const { userId } = req.query;
            const notifications = await Notification.find({ toUser: userId }).populate('fromUser', 'User_Name User_Role').sort({ createdAt: -1 });
            res.status(200).json(notifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            res.status(500).json({ message: "Lỗi khi lấy thông báo" });
        }
    }
// const updateStaffNotification = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { isRead } = req.body;
//         const notification = await Notification.findByIdAndUpdate(id, { isRead }, { new: true });
//         if (!notification) return res.status(404).json({ message: "Không tìm thấy thông báo" });
//         res.status(200).json({ message: "Thông báo đã được cập nhật thành công", notification });
//     } catch (error) {
//         console.error("Error updating notification:", error);
//         res.status(500).json({ message: "Lỗi khi cập nhật thông báo" });
//     }
// }


// const deleteStaffNotification = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const notification = await Notification.findByIdAndDelete(id);
//         if (!notification) return res.status(404).json({ message: "Không tìm thấy thông báo" });
//         res.status(200).json({ message: "Thông báo đã được xóa thành công" });
//     } catch (error) {
//         console.error("Error deleting notification:", error);
//         res.status(500).json({ message: "Lỗi khi xóa thông báo" });
//     }
// }


module.exports = { 
    getUser, updateUser, deleteUser, 
    controlDevice, 
    getArea, 
    getWateringSchedule,
    createWateringSchedule, 
    updateWateringSchedule,
    deleteWateringSchedule,
    getStaffNotification,
    // updateStaffNotification,
    // deleteStaffNotification
};