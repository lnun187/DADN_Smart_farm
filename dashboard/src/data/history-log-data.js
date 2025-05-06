// src/data/history-log-data.js
// Lưu ý: Định dạng ngày YYYY-MM-DD HH:MM:SS để dễ so sánh
export const historyLogData = [
    {
      timestamp: "2025-05-06 01:30:00",
      event: "Đo nhiệt độ Khu vực",
      value: "32°C",
      zone: "Khu vực 1",
      actor: "staff1@test.com",
    },
    {
      timestamp: "2025-05-06 00:15:00",
      event: "Bật Quạt thông gió",
      value: "ON",
      zone: "Khu vực 1",
      actor: "staff2@test.com",
    },
    {
      timestamp: "2025-05-05 23:00:00",
      event: "Đo độ ẩm Khu vực",
      value: "75%",
      zone: "Khu vực 2",
      actor: "staff3@test.com",
    },
    {
      timestamp: "2025-05-05 18:00:00",
      event: "Tưới nước Khu vực",
      value: "5 phút",
      zone: "Khu vực 2",
      actor: "staff4@test.com",
    },
      {
      timestamp: "2025-05-04 10:00:00",
      event: "Đo ánh sáng Khu vực",
      value: "8000 Lux",
      zone: "Khu vực 1",
      actor: "staff5@test.com",
    },
  ];
  
  export default historyLogData;