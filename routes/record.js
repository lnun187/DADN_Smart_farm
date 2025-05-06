const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const TempRecord = require("../models/temp_Record");
const HumRecord = require("../models/hum_Record");
const LightRecord = require("../models/light_Record");
const SoilRecord = require("../models/soil_Record");
const FanRecord = require("../models/fan_Record");
const LedRecord = require("../models/led_Record");
// const Pump1Record = require("../models/pump1_Record");
// const Pump2Record = require("../models/pump2_Record");

router.get("/get", async (req, res) => {
    try {
        // Lấy bản ghi mới nhất từ mỗi bảng
        const latestTemp = await TempRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestHum = await HumRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestLight = await LightRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestSoil = await SoilRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestFan = await FanRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestLed = await LedRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestPump1 = await Pump1Record.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestPump2 = await Pump2Record.findOne().sort({ _id: -1 }).populate("RC_Id");

        // Tạo response object
        const response = {
            temperature: latestTemp ? latestTemp.Value : null,
            humidity: latestHum ? latestHum.Value : null,
            light: latestLight ? latestLight.Value : null,
            soilMoisture: latestSoil ? latestSoil.Value : null,
            fanStatus: latestFan ? latestFan.Value : null,
            ledStatus: latestLed ? latestLed.Value : null,
            pump1Status: latestPump1 ? latestPump1.Value : null,
            pump2Status: latestPump2 ? latestPump2.Value : null,
        };

        res.json(response);
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
});

module.exports = router;