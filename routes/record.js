const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const TempRecord = require("../models/temp_Record");
const HumRecord = require("../models/hum_Record");
const LightRecord = require("../models/light_Record");
const SoilRecord = require("../models/soil_Record");

router.get("/get", async (req, res) => {
    try {
        // Lấy bản ghi mới nhất từ mỗi bảng
        // const latestRecord = await Record.findOne().sort({ _id: -1 });
        const latestTemp = await TempRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestHum = await HumRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestLight = await LightRecord.findOne().sort({ _id: -1 }).populate("RC_Id");
        const latestSoil = await SoilRecord.findOne().sort({ _id: -1 }).populate("RC_Id");

        // Tạo response object
        const response = {
            // time: latestRecord ? latestRecord.Time : null,
            temperature: latestTemp ? latestTemp.Value : null,
            humidity: latestHum ? latestHum.Value : null,
            light: latestLight ? latestLight.Value : null,
            soilMoisture: latestSoil ? latestSoil.Value : null,
        };

        res.json(response);
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
});

module.exports = router;



