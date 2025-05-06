// src/data/admin-requests-data.js
export const pendingRequestsData = [
    {
      id: "req001",
      type: "Lập lịch tưới nước",
      requester: "staff1@test.com", // Email nhân viên yêu cầu
      requesterName: "Trần Thị Bích", // Tên nhân viên
      details: "Yêu cầu tưới nước vào 8:00 sáng mai.",
      timestamp: "2025-05-06T14:05:00", // Thời gian yêu cầu
      status: "pending", // Trạng thái: pending, approved, rejected
    },
    {
      id: "req002",
      type: "Lập lịch bật đèn",
      requester: "staff2@test.com",
      requesterName: "Lê Minh Cường",
      details: "Yêu cầu bật đèn từ 17:00 đến 20:00 hôm nay.",
      timestamp: "2025-05-06T11:15:00",
      status: "pending",
    },
    {
      id: "req003",
      type: "Yêu cầu bảo trì",
      requester: "staff3@test.com",
      requesterName: "Nguyễn Văn An",
      details: "Cảm biến độ ẩm HUM001 báo chỉ số bất thường, cần kiểm tra.",
      timestamp: "2025-05-05T09:30:00",
      status: "pending",
    },
  ];
  
  // Dữ liệu nhân viên để chọn người nhận thông báo (có thể lấy từ staff-management-data)
  export const staffListForNotifications = [
      { value: "all", label: "Tất cả nhân viên" },
      { value: "staff1@test.com", label: "Trần Thị Bích (staff1@test.com)" },
      { value: "staff2@test.com", label: "Lê Minh Cường (staff2@test.com)" },
      { value: "staff3@test.com", label: "Nguyễn Văn An (staff3@test.com)" },
      // Thêm các nhân viên khác nếu cần
  ];
  
  
  export default pendingRequestsData;