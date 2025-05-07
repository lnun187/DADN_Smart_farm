const express = require('express');
const { register, login } = require("../controllers/authController");
const mqtt = require('mqtt');
const router = express.Router();
const Record = require("../models/record");
const TempRecord = require("../models/temp_Record");
const HumRecord = require("../models/hum_Record");
const LightRecord = require("../models/light_Record");
const SoilRecord = require("../models/soil_Record");
const FanRecord = require("../models/fan_Record");
const LedRecord = require("../models/led_Record");
const PumpRecord = require("../models/pump_Record");
const Staff = require("../models/staff");
const Manager = require("../models/manager")
const Area = require('../models/Area');
const Tree = require('../models/Tree');
const Device = require('../models/Device');




//api get dữ liệu các thiết bị
router.get("/devaction", async (req, res) => {
    try {
        // Lấy bản ghi mới nhất từ mỗi bảng
        const latestTemp = await TempRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestHum = await HumRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestLight = await LightRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestSoil = await SoilRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestFan = await FanRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestLed = await LedRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestPump = await PumpRecord.findOne().sort({ _id: -1 }).populate("RC_Id");

        // Tạo response object
        const response = {
            temperature: latestTemp ? latestTemp.Value : null,
            humidity: latestHum ? latestHum.Value : null,
            light: latestLight ? latestLight.Value : null,
            soilMoisture: latestSoil ? latestSoil.Value : null,
            fanStatus: latestFan ? latestFan.Value : null,
            ledStatus: latestLed ? latestLed.Value : null,
            pumpStatus: latestPump ? latestPump.Value : null,
        };

        res.json(response);
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
});



//api đẩy note cho nhân viên


//api thêm nhân viên
router.post("/register", register);
router.post("/login", login);

//api sửa nhân viên
// Khoá/Mở khoá nhân viên
router.put('/lockstaff/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Status } = req.body; // true or false

        const staff = await Staff.findOneAndUpdate({ User_id: id }, { Status }, { new: true });
        if (!staff) return res.status(404).json({ message: 'Staff not found' });

        res.status(200).json({ message: `Staff ${Status ? 'unlocked' : 'locked'} successfully`, staff });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//api thêm khu vực
router.post('/addarea', async (req, res) => {
    try {
        const { Name, Address, Uid } = req.body;

        //Kiểm tra tồn tại Name
        const existingArea = await Area.findOne({ Name });
        if (existingArea) {
            return res.status(400).json({ message: 'Tên này đã được sử dụng' });
        }

        const newArea = await Area.create({ Name, Address, Uid });
        res.status(201).json({ message: 'Tạo Area thành công', area: newArea });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//api xoá khu vực
router.delete('/delarea/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const area = await Area.findById(id);
        if (!area) return res.status(404).json({ message: 'ID khu vực bị sai' });

        await Tree.deleteMany({ Aid: id });
        await Device.deleteMany({ Aid: id });
        await area.deleteOne();

        res.status(200).json({ message: 'Khu vực này đã bị xoá' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


//api sửa khu vực
router.put('/adjustarea/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Address } = req.body;

        const area = await Area.findById(id);
        if (!area) return res.status(404).json({ message: 'ID khu vực bị sai' });

        //Nếu đổi tên và tên mới đã tồn tại với cùng Uid
        if (Name && Name !== area.Name) {
            const nameExists = await Area.findOne({ Name, Uid: area.Uid, _id: { $ne: id } });
            if (nameExists) return res.status(400).json({ message: 'Bạn đổi tên bị trùng rồi' });
            area.Name = Name;
        }

        if (Address) area.Address = Address;
        await area.save();

        res.status(200).json({ message: 'Area updated successfully', area });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// 4. Thêm cây vào khu vực (kiểm tra trùng tên trong cùng khu vực)
router.post('/addtree/:areaId', async (req, res) => {
    try {
        const { areaId } = req.params;

        const area = await Area.findById(areaId);
        if (!area) return res.status(404).json({ message: 'ID của area bị sai' });

        const { Name, Planting_Time, Alive, Temp_Min, Temp_Max, Humidity_Min, Humidity_Max, Light_Min, Light_Max, SoilMoisture_Min, SoilMoisture_Max } = req.body;

        // Kiểm tra cây cùng tên đã tồn tại trong khu vực chưa
        const existingTree = await Tree.findOne({ Name, Aid: areaId });
        if (existingTree) {
            return res.status(400).json({ message: 'Cây đã có trong khu vực này' });
        }

        const newTree = await Tree.create({
            Name, Planting_Time, Alive,
            Temp_Min, Temp_Max,
            Humidity_Min, Humidity_Max,
            Light_Min, Light_Max,
            SoilMoisture_Min, SoilMoisture_Max,
            Aid: areaId
        });

        res.status(201).json({ message: 'Thêm cây thành công', tree: newTree });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// 5. Sửa cây
router.put('/adjusttree/:treeId', async (req, res) => {
    try {
        const { treeId } = req.params;
        const tree = await Tree.findById(treeId);
        if (!tree) return res.status(404).json({ message: 'Không tìm thấy ID của cây này' });

        Object.assign(tree, req.body);
        await tree.save();

        res.status(200).json({ message: 'Sửa cây thành công', tree });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// 6. Xoá cây
router.delete('/deltree/:treeId', async (req, res) => {
    try {
        const { treeId } = req.params;
        const tree = await Tree.findById(treeId);
        if (!tree) return res.status(404).json({ message: 'Không tìm thấy ID cây' });

        await tree.deleteOne();
        res.status(200).json({ message: 'Xoá cây khỏi vườn thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// 7. Thêm thiết bị cho khu vực (kiểm tra trùng tên trong cùng khu vực)
router.post('/addevice/:areaId', async (req, res) => {
    try {
        const { areaId } = req.params;

        const area = await Area.findById(areaId);
        if (!area) return res.status(404).json({ message: 'Không tìm thấy ID khu vực' });

        const { Name, Description } = req.body;

        // Kiểm tra thiết bị cùng tên đã tồn tại trong khu vực chưa
        const existingDevice = await Device.findOne({ Name, Aid: areaId });
        if (existingDevice) {
            return res.status(400).json({ message: 'Thiết bị đã tồn tại' });
        }

        const newDevice = await Device.create({ Name, Description, Aid: areaId });
        res.status(201).json({ message: '', device: newDevice });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// 8. Sửa thiết bị
router.put('/adjustdevice/:deviceId', async (req, res) => {
    try {
        const { deviceId } = req.params;
        const device = await Device.findById(deviceId);
        if (!device) return res.status(404).json({ message: 'Sai ID thiết bị' });

        Object.assign(device, req.body);
        await device.save();

        res.status(200).json({ message: 'Chỉnh sửa thiết bị thành công', device });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// 9. Xoá thiết bị
router.delete('/deldevice/:deviceId', async (req, res) => {
    try {
        const { deviceId } = req.params;
        const device = await Device.findById(deviceId);
        if (!device) return res.status(404).json({ message: 'ID thiết bị sai' });

        await device.deleteOne();
        res.status(200).json({ message: 'Xoá thiết bị thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});



//api get data xem lịch sử (cho chọn một khoảng thời gian)


//api duyệt lịch tưới nước vừa được gửi


module.exports = router;