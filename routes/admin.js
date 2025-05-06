const express = require('express');
const mqtt = require('mqtt');
const router = express.Router();
const FanRecord = require("../models/fan_Record");
const LedRecord = require("../models/led_Record");
// const Pump1Record = require("../models/pump1_Record");
// const Pump2Record = require("../models/pump2_Record");
require('dotenv').config();
const client = require('../mqttClient');

const FEEDS = {
    fan: "DADN_FAN",
    pump1: "DADN_PUMP1",
    pump2: "DADN_PUMP2",
    led: "DADN_RGB_LED"
};

router.post('/device', async (req, res) => {
    const { device, command } = req.body;
    
    if (!FEEDS[device]) {
        return res.status(400).json({ error: "Invalid device. Use 'fan', 'pump1', 'pump2', or 'led'" });
    }
    
    let message;
    switch (device) {
        case "fan":
            if (typeof command !== "number" || command < 0 || command > 250) {
                return res.status(400).json({ error: "Invalid command for fan. Use a speed value (0-250)" });
            }
            message = command.toString();
            break;
        
        case "pump1":
            if (command !== 0 && command !== 1) {
                return res.status(400).json({ error: "Invalid command for pump1. Use 0 (OFF) or 1 (ON)" });
            }
            message = command.toString();
            break;
        
        
        case "led":
            if (!/^#[0-9A-Fa-f]{6}$/.test(command)) {
                return res.status(400).json({ error: "Invalid command for LED. Use a HEX color code (e.g., #FF0000)" });
            }
            message = command;
            break;
    }

    const topic = `${ADAFRUIT_USERNAME}/feeds/${FEEDS[device]}`;
    client.publish(topic, message, async (err) => {
        if (err) {
            console.error("MQTT Publish Error:", err);
            return res.status(500).json({ error: "Failed to send command" });
        }
        
        console.log(`Command '${message}' sent to ${device}`);
        
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

        res.json({ message: `Command '${message}' sent successfully to ${device}` });
    });
});

module.exports = router;