export const historyLogData = [
  {
    timestamp: "2025-05-06T01:30:00", 
    event: "Nhiệt độ tăng bất thường",
    value: "38°C",
    zoneId: "ZONE001",
    zone: "Khu vực 1 - Ươm mầm", 
    actor: "Hệ thống (Cảnh báo)",
  },
  {
    timestamp: "2025-05-06T00:15:00",
    event: "Bật Quạt thông gió",
    value: "ON - Tốc độ cao",
    zoneId: "ZONE001",
    zone: "Khu vực 1 - Ươm mầm",
    actor: "staff2@test.com",
  },
  {
    timestamp: "2025-05-05T23:00:00",
    event: "Đo độ ẩm",
    value: "75%",
    zoneId: "ZONE002",
    zone: "Khu vực 2 - Rau ăn lá",
    actor: "Hệ thống (Định kỳ)",
  },
  {
    timestamp: "2025-05-05T18:00:00",
    event: "Tưới nước",
    value: "Hoàn thành - 5 phút",
    zoneId: "ZONE002",
    zone: "Khu vực 2 - Rau ăn lá",
    actor: "staff4@test.com (Lập lịch)",
  },
  {
    timestamp: "2025-05-04T10:00:00",
    event: "Đo cường độ ánh sáng",
    value: "8000 Lux",
    zoneId: "ZONE001",
    zone: "Khu vực 1 - Ươm mầm",
    actor: "Hệ thống (Định kỳ)",
  },
  {
    timestamp: "2025-05-03T14:20:00",
    event: "Cập nhật mô tả Khu vực 3",
    value: "Mô tả mới: Bổ sung hoa lan",
    zoneId: "ZONE003", // Liên quan đến một khu vực cụ thể
    zone: "Khu vực 3 - Hoa",
    actor: "admin@test.com",
  },
  {
    timestamp: "2025-05-02T11:05:00",
    event: "Thiết bị PUMP003 Offline",
    value: "Trạng thái: Offline",
    zoneId: "ZONE003", 
    zone: "Khu vực 3 - Hoa",
    actor: "Hệ thống (Giám sát)",
  },

   {
    timestamp: "2025-04-30T16:00:00",
    event: "Đèn LED Khu vực 4 được bật",
    value: "ON - 100%",
    zoneId: "ZONE004", 
    zone: "Khu vực 4 - Cây ăn quả",
    actor: "Hệ thống (Tự động)",
  },
];
 
export default historyLogData;