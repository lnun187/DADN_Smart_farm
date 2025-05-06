import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UsersIcon, 
  CogIcon, // --- THÊM IMPORT ICON CHO DEVICE MANAGEMENT ---
  ClockIcon as HistoryIcon,
  BellAlertIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid"; 

// Staff Pages
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";


// Admin Pages
import { UserManagement } from "@/pages/dashboard"; 
import { DeviceManagement } from "@/pages/dashboard"; 
import { HistoryLog } from "@/pages/dashboard"; 
import { AdminNotificationCenter } from "@/pages/dashboard";
import { AdminProfile } from "@/pages/dashboard";
import { ZoneManagement } from "@/pages/dashboard";
import { AdminDashboard } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      // === STAFF Routes === (Ví dụ phân quyền)
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard", 
        path: "/home",
        element: <Home />,
        roles: ['staff'] 
      },
      // === COMMON Routes === (Ví dụ phân quyền)
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
        roles: ['staff'] 
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
        roles: ['staff'] 
      },
       // === ADMIN Routes === (Ví dụ phân quyền)
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables", // Trang Tables mẫu
        path: "/tables",
        element: <Tables />,
        roles: ['staff'] 
      },

      {
        icon: <UserCircleIcon {...icon} />, // Có thể dùng icon khác nếu muốn
        name: "Admin Profile", // Tên menu riêng cho admin
        path: "/admin-profile", // Đường dẫn riêng
        element: <AdminProfile />, 
        roles: ['admin'] // Chỉ cho admin
      },
      
      {
        icon: <UsersIcon {...icon} />, 
        name: "Quản lý nhân viên", 
        path: "/user-management", 
        element: <UserManagement />, 
        roles: ['admin'] 
      },
      // --- ROUTE CHO DEVICE MANAGEMENT ĐƯỢC THÊM VÀO ĐÂY ---
      {
        icon: <CogIcon {...icon} />, // Sử dụng icon CogIcon (hoặc icon khác)
        name: "Quản lý thiết bị",   // Tên hiển thị
        path: "/device-management", // Đường dẫn
        element: <DeviceManagement />, // Component tương ứng
        roles: ['admin']             // Phân quyền
      },
      
      {
        icon: <MapPinIcon {...icon} />, 
        name: "Quản lý Khu vực",   
        path: "/zone-management", 
        element: <ZoneManagement />, 
        roles: ['admin'] 
      },

      {
        icon: <HistoryIcon {...icon} />, // Sử dụng icon đã import
        name: "Lịch sử Vườn",
        path: "/history-log", // Đường dẫn URL
        element: <HistoryLog />, // Component tương ứng
        roles: ['admin'] // Chỉ cho Admin xem lịch sử 
      },

      {
        icon: <BellAlertIcon {...icon} />, // Hoặc icon bạn chọn
        name: "Thông báo & Yêu cầu", // Tên menu
        path: "/admin-notifications", // Đường dẫn URL
        element: <AdminNotificationCenter />, 
        roles: ['admin'] 
      },

      {
        icon: <HomeIcon {...icon} />, 
        name: "Admin Dashboard",    
        path: "/admin-dashboard", // Hoặc "/dashboard" nếu muốn là trang chủ Admin
        element: <AdminDashboard />, 
        roles: ['admin'] 
      },


      // --- Thêm các route Admin khác nếu cần ---

    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      // --- Các trang Auth giữ nguyên ---
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },

    ],
  },
];

export default routes;