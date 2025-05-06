// src/data/staff-management-data.js
export const staffData = [
    {
      img: "/img/team-1.jpeg", // Đường dẫn ảnh đại diện
      name: "Nguyễn Văn An",
      email: "an.nguyen@example.com",
      role: ["Nhân viên", "Giám sát khu vực 1"], // Chức vụ/Vai trò
      status: "active", // Trạng thái: active, blocked
      joinedDate: "2024-01-15", // Ngày tham gia
    },
    {
      img: "/img/team-2.jpeg",
      name: "Trần Thị Bích",
      email: "bich.tran@example.com",
      role: ["Nhân viên"],
      status: "active",
      joinedDate: "2024-03-01",
    },
    {
      img: "/img/team-3.jpeg",
      name: "Lê Minh Cường",
      email: "cuong.le@example.com",
      role: ["Nhân viên"],
      status: "blocked", // Ví dụ nhân viên bị khóa
      joinedDate: "2023-11-10",
    },
    {
      img: "/img/team-4.jpeg",
      name: "Phạm Thị Dung",
      email: "dung.pham@example.com",
      role: ["Nhân viên"],
      status: "active",
      joinedDate: "2024-05-01",
    },
  ];
  
  export default staffData;