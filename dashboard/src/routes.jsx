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
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid"; 

// Staff Pages
import { StaffDashboard, Profile, Tables, Notifications } from "@/pages/dashboard";
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
      // === STAFF Routes 
      {
        icon: <PresentationChartBarIcon {...icon} />, 
        name: "Dashboard", 
        path: "/staff-dashboard", 
        element: <StaffDashboard />,
        roles: ['staff'] 
      },

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
        name: "tables", 
        path: "/tables",
        element: <Tables />,
        roles: ['staff'] 
      },

      {
        icon: <UserCircleIcon {...icon} />, 
        name: "Admin Profile", 
        path: "/admin-profile", 
        element: <AdminProfile />, 
        roles: ['admin'] 
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
        icon: <CogIcon {...icon} />, 
        name: "Quản lý thiết bị",   
        path: "/device-management", 
        element: <DeviceManagement />, 
        roles: ['admin']            
      },

      {
        icon: <HistoryIcon {...icon} />, 
        name: "Lịch sử Vườn",
        path: "/history-log", 
        element: <HistoryLog />, 
        roles: ['admin'] 
      },

      {
        icon: <BellAlertIcon {...icon} />, 
        name: "Thông báo & Yêu cầu", 
        path: "/admin-notifications", 
        element: <AdminNotificationCenter />, 
        roles: ['admin'] 
      },

      {
        icon: <PresentationChartBarIcon {...icon} />, 
        name: "Dashboard",    
        path: "/admin-dashboard", 
        element: <AdminDashboard />, 
        roles: ['admin'] 
      },

      {
        icon: <MapPinIcon {...icon} />, 
        name: "Quản lý Khu vực",   
        path: "/zone-management", 
        element: <ZoneManagement />, 
        roles: ['admin'] 
      },


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