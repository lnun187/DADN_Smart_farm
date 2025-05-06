const express = require("express");
const {controlDevice} = require('../controllers/staffController');

const router = express.Router();

router.post('/controlDevice/:feed', controlDevice)

module.exports = router;