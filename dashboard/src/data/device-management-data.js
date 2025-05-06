// src/data/device-management-data.js
export const deviceData = [
    {
      id: "TEMP001", // Mã định danh duy nhất
      name: "Cảm biến Nhiệt độ",
      type: "Sensor", // Loại: Sensor, Actuator
      location: "Khu vực 1", // Vị trí/Khu vực
      status: "Online", // Trạng thái: Online, Offline, Error
      addedDate: "2024-04-10",
    },
    {
      id: "HUM001",
      name: "Cảm biến Độ ẩm",
      type: "Sensor",
      location: "Khu vực 1",
      status: "Online",
      addedDate: "2024-04-10",
    },
    {
      id: "LIGHT002",
      name: "Đèn LED",
      type: "Actuator",
      location: "Khu vực 2",
      status: "Offline", // Ví dụ thiết bị offline
      addedDate: "2024-04-15",
    },
    {
      id: "FAN001",
      name: "Quạt thông gió",
      type: "Actuator",
      location: "Khu vực 1",
      status: "Error", // Ví dụ thiết bị lỗi
      addedDate: "2024-04-12",
    },
    {
      id: "PUMP003",
      name: "Máy bơm",
      type: "Actuator",
      location: "Khu vực 3",
      status: "Online",
      addedDate: "2024-05-01",
    },
  ];
  
  export default deviceData;