export const deviceData = [
  // --- Thiết bị cho Khu vực 1 (ZONE001) ---
  {
    id: "TEMP001-Z1",
    name: "Cảm biến Nhiệt độ Z1-A",
    type: "Sensor",
    zoneId: "ZONE001", 
    status: "Online",
    addedDate: "2025-04-10",
  },
  {
    id: "HUM001-Z1",
    name: "Cảm biến Độ ẩm Z1-A",
    type: "Sensor",
    zoneId: "ZONE001", 
    status: "Online",
    addedDate: "2025-04-10",
  },
  {
    id: "FAN001-Z1",
    name: "Quạt thông gió Z1-Main",
    type: "Actuator",
    zoneId: "ZONE001", 
    status: "Offline",
    addedDate: "2025-04-12",
  },

  // --- Thiết bị cho Khu vực 2 (ZONE002) ---
  {
    id: "TEMP002-Z2",
    name: "Cảm biến Nhiệt độ Z2-Roof",
    type: "Sensor",
    zoneId: "ZONE002", 
    status: "Error",
    addedDate: "2025-03-15",
  },
  {
    id: "LEDGROW001-Z2",
    name: "Đèn LED quang hợp Z2-A",
    type: "Actuator",
    zoneId: "ZONE002", 
    status: "Online",
    addedDate: "2025-03-20",
  },

];
export default deviceData;