import React, { useState } from "react"; 
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Button, // Thêm Button nếu cần cho action
  Chip    // Thêm Chip nếu cần cho status trong bảng
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { 
    ClockIcon, 
    CheckCircleIcon, 
    UsersIcon, 
    CogIcon, 
    MapIcon, 
    BellAlertIcon,
    ExclamationTriangleIcon, // Cho thiết bị lỗi
    XMarkIcon, // Cho nút từ chối
    CheckIcon as ApproveIcon // Cho nút duyệt (đổi tên tránh trùng)
} from "@heroicons/react/24/solid"; 

// Import widgets
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";

// Import data mẫu
import { deviceData } from "@/data/device-management-data.js";
import { staffData } from "@/data/staff-management-data.js";
import { zoneData } from "@/data/zone-management-data.js";
import { pendingRequestsData } from "@/data/admin-requests-data.js";
import { statisticsChartsData } from "@/data"; // Lấy ví dụ chart

export function AdminDashboard() {

  // === TÍNH TOÁN SỐ LIỆU GIẢ LẬP ===
  const totalZones = zoneData.length;
  const totalDevices = deviceData.length;
  const onlineDevices = deviceData.filter(d => d.status?.toLowerCase() === 'online').length;
  const errorDevicesList = deviceData.filter(d => d.status?.toLowerCase() === 'error'); // Lấy danh sách lỗi
  const errorDevicesCount = errorDevicesList.length;
  const activeStaff = staffData.filter(s => s.status === 'active').length;
  const totalStaff = staffData.length;

  // State cho danh sách yêu cầu (để giả lập approve/reject)
  const [requests, setRequests] = useState(pendingRequestsData.filter(r => r.status === 'pending').slice(0, 3)); // Lấy 3 yêu cầu đầu
  const pendingRequestsCount = requests.length; // Đếm số lượng đang hiển thị

  // === HÀM XỬ LÝ YÊU CẦU (GIẢ LẬP) ===
   const handleRequestAction = (requestId, action) => {
      console.log(`Dashboard Action: ${action} on Request ID: ${requestId}`);
      setRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));
     
   };

  // === DỮ LIỆU CHO WIDGETS ===

      const adminStatsCardsData = [
          { color: "blue", icon: MapIcon, title: "Tổng số Khu vực", value: totalZones, footer: { label: "Đang quản lý" },},
          { color: "green", icon: CogIcon, title: "Thiết bị Online", value: `${onlineDevices} / ${totalDevices}`, footer: { label: errorDevicesCount > 0 ? `${errorDevicesCount} thiết bị lỗi` : "Hoạt động tốt", color: errorDevicesCount > 0 ? "text-red-500" : "text-green-500" }, },
          { color: "orange", icon: UsersIcon, title: "Nhân viên Hoạt động", value: `${activeStaff} / ${totalStaff}`, footer: { label: `${totalStaff - activeStaff} bị khóa` },},
          { color: "red", icon: BellAlertIcon, title: "Yêu cầu chờ duyệt", value: pendingRequestsCount, footer: { label: "Cần xử lý" },},
      ];

  const adminChartsData = statisticsChartsData.slice(0, 2); // Lấy 2 chart mẫu

  const TABLE_HEAD_ERRORS = ["Tên Thiết bị Lỗi", "ID"];
  const TABLE_HEAD_REQUESTS = ["Loại Yêu cầu", "Người gửi", "Chi tiết", "Hành động"];

  return (
    <div className="mt-12">
      {/* Hàng Thẻ Thống kê */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {adminStatsCardsData.map(({ icon, title, footer, value, color }) => (
          <StatisticsCard key={title} color={color} icon={React.createElement(icon, { className: "w-6 h-6 text-white",})} title={<Typography variant="small" color="blue-gray" className="font-medium uppercase">{title}</Typography>} value={<Typography variant="h4" color="blue-gray">{value}</Typography>} footer={footer && (<Typography className="font-normal text-blue-gray-600">{footer.value && <strong className={footer.color || 'text-green-500'}>{footer.value}</strong>}&nbsp;{footer.label}</Typography>)} />
        ))}
      </div>

      {/* Hàng Biểu đồ */}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        {adminChartsData.map((props) => (
          <StatisticsChart key={props.title} {...props} footer={<Typography variant="small" className="flex items-center font-normal text-blue-gray-600"><ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />&nbsp;{props.footer || "dữ liệu gần đây"}</Typography>}/>
        ))}
      </div>

      {/* Hàng Bảng Thiết bị lỗi và Yêu cầu chờ duyệt */}
      <div className="mb-4 grid grid-cols-1 gap-y-12 gap-x-6 xl:grid-cols-2">
        
        {/* Bảng Thiết bị lỗi */}
        <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader variant="gradient" color="red" className="mb-4 p-4">
                <Typography variant="h6" color="white">Thiết bị đang gặp lỗi ({errorDevicesCount})</Typography>
            </CardHeader>
            <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
                <table className="w-full min-w-[340px] table-auto">
                    <thead><tr>{TABLE_HEAD_ERRORS.map(head => <th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography></th>)}</tr></thead>
                    <tbody>
                       {errorDevicesList.length > 0 ? errorDevicesList.map(({ id, name, location }, key) => {
                            const className = `py-3 px-5 ${key === errorDevicesList.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                            return (
                                <tr key={id}>
                                    <td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{name}</Typography></td>
                                    <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{id}</Typography></td>
                                  
                                </tr>
                            );
                        }) : (
                             <tr><td colSpan={TABLE_HEAD_ERRORS.length} className="py-3 px-5 text-center text-blue-gray-500">Không có thiết bị nào đang lỗi.</td></tr>
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>

         {/* Bảng Yêu cầu chờ duyệt */}
        <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader variant="gradient" color="orange" className="mb-4 p-4">
                <Typography variant="h6" color="white">Yêu cầu chờ duyệt ({pendingRequestsCount})</Typography>
            </CardHeader>
            <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
                <table className="w-full min-w-[440px] table-auto">
                    <thead><tr>{TABLE_HEAD_REQUESTS.map(head => <th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography></th>)}</tr></thead>
                    <tbody>
                       {requests.length > 0 ? requests.map((req, key) => {
                            const className = `py-3 px-5 ${key === requests.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                            return (
                                <tr key={req.id}>
                                    <td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{req.type}</Typography></td>
                                    <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{req.requesterName || req.requester}</Typography></td>
                                    <td className={className}><Typography className="text-xs font-normal text-blue-gray-500 max-w-[150px] truncate" title={req.details}>{req.details}</Typography></td>
                                    <td className={`${className} flex gap-1`}>
                                        <Tooltip content="Duyệt"><IconButton variant="text" color="green" size="sm" onClick={() => handleRequestAction(req.id, 'approve')}><ApproveIcon className="h-4 w-4"/></IconButton></Tooltip>
                                        <Tooltip content="Từ chối"><IconButton variant="text" color="red" size="sm" onClick={() => handleRequestAction(req.id, 'reject')}><XMarkIcon className="h-4 w-4"/></IconButton></Tooltip>
                                    </td>
                                </tr>
                            );
                        }) : (
                             <tr><td colSpan={TABLE_HEAD_REQUESTS.length} className="py-3 px-5 text-center text-blue-gray-500">Không có yêu cầu nào.</td></tr>
                        )}
                    </tbody>
                </table>
                 {pendingRequestsData.length > requests.length && ( // Chỉ hiển thị nếu còn request chưa hiển thị
                      <div className="p-4 text-center">
                           <Button size="sm" variant="text" /* onClick={goToNotificationCenter} */>Xem tất cả yêu cầu</Button>
                       </div>
                  )}
            </CardBody>
        </Card>

      </div>
    </div>
  );
}

export default AdminDashboard;