
export const pendingRequestsData = [
  {
    id: "req001",
    type: "Lập lịch tưới nước",
    requester: "staff@test.com", 
    requesterName: "Trần Thị Bích", 
    details: "Yêu cầu tưới Khu vực 1 - Ươm mầm vào 8:00 sáng mai.",
    timestamp: "2025-05-06T14:05:00", 
    status: "pending",
    zoneId: "ZONE001", 
  },
  {
    id: "req002",
    type: "Lập lịch bật đèn",
    requester: "staff@test.com",
    requesterName: "Trần Thị Bích",
    details: "Yêu cầu bật đèn Khu vực 2 - Rau ăn lá từ 17:00 đến 20:00 hôm nay.",
    timestamp: "2025-05-06T11:15:00",
    status: "pending",
    zoneId: "ZONE002", 
  },
  {
    id: "req003",
    type: "Yêu cầu bảo trì",
    requester: "another.staff@test.com",
    requesterName: "Nguyễn Văn An",
    details: "Cảm biến độ ẩm HUM001 tại Khu vực 1 - Ươm mầm báo chỉ số bất thường, cần kiểm tra.",
    timestamp: "2025-05-05T09:30:00",
    status: "pending",
    zoneId: "ZONE001", 
  },
  {
    id: "req004",
    type: "Lập lịch tưới nước",
    requester: "staff3@test.com",
    requesterName: "Lê Minh Cường",
    details: "Đề xuất tưới bổ sung cho Khu vực 2 - Hoa do thời tiết nắng nóng.",
    timestamp: "2025-05-07T08:00:00",
    status: "pending",
    zoneId: "ZONE002", 
  }
];

// Dữ liệu nhân viên để chọn người nhận thông báo
export const staffListForNotifications = [
    { value: "all", label: "Tất cả nhân viên" },
    { value: "staff@test.com", label: "Trần Thị Bích (staff@test.com)", zoneId: "ZONE001" }, 
    { value: "another.staff@test.com", label: "Nguyễn Văn An (another.staff@test.com)", zoneId: "ZONE001" }, 
    { value: "staff3@test.com", label: "Lê Minh Cường (staff3@test.com)", zoneId: "ZONE002" }, 
];


export default pendingRequestsData; 