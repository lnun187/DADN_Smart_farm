const express = require("express");
const {getUser, updateUser, deleteUser, 
    controlDevice, 
    getArea, 
    getWateringSchedule,
    createWateringSchedule, 
    updateWateringSchedule,
    deleteWateringSchedule,
    getStaffNotification,
    updateStaffNotification,
    deleteStaffNotification} = require('../controllers/staffController');
const { authenticateToken } = require('../middlewares/authenticateToken');
const router = express.Router();

//API add, delete, update staff
router.get("/information", authenticateToken, getUser);
router.put("/information/:id", updateUser);
router.delete("/information/:id", deleteUser);

//API endpoint device
router.put('/controlDevice/:feed', controlDevice)
// router.get('/controlDevice/:feed', controlDevice)
// router.post('/controlDevice/:feed', controlDevice)
// router.delete('/controlDevice/:feed', controlDevice)
// router.put('/controlDevice/:feed', controlDevice)

// API endpoint to get Area data and get Note 
router.get('/getArea', getArea)

//API endpoint post watering schedule
router.get('/watering/request/:id', getWateringSchedule)
router.post('/watering/request', createWateringSchedule)
router.put('/watering/request/:id', updateWateringSchedule)
router.delete('/watering/request/:id', deleteWateringSchedule)

//API endpoint to notification
// router.get('/notification', getNotification)
// router.put('/notification', getNotification)
// router.delete('/notification', getNotification)

module.exports = router;