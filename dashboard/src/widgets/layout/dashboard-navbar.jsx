
import React, { useState } from "react"; 
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  Bars3Icon,
  PowerIcon,
  MapPinIcon, 
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
  setSelectedRegion as setSelectedRegionInContext, 
} from "@/context"; 
import { useAuth } from "@/context/AuthContext";
import { zoneData } from "@/data/zone-management-data.js"; 

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav, selectedRegion } = controller; // Lấy selectedRegion từ context
  
  const { pathname } = useLocation();
  const pathParts = pathname.split("/").filter((el) => el !== "");
  const layout = pathParts.length > 0 ? pathParts[0] : "dashboard"; // Mặc định nếu pathParts rỗng
  const page = pathParts.length > 1 ? pathParts[1] : (layout === "dashboard" && pathParts.length === 1 ? pathParts[0] : "home");


  const { isAuthenticated, user, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleRegionSelect = (regionId) => {
    setSelectedRegionInContext(dispatch, regionId); 
    console.log(`Navbar: Selected Region ID in Context: ${regionId}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/sign-in");
  };

  const handleProfileNavigation = () => {
    if (isAuthenticated) {
      if (userRole === 'admin') {
        navigate("/dashboard/admin-profile"); 
      } else if (userRole === 'staff') {
        navigate("/dashboard/profile");     
      } else {
        navigate("/"); 
      }
    }
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""}`}>
            <Link to={`/${layout}`}> 
              <Typography variant="small" color="blue-gray" className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                {layout}
              </Typography>
            </Link>
            <Typography variant="small" color="blue-gray" className="font-normal">
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
  
          
          <IconButton variant="text" color="blue-gray" className="grid xl:hidden" onClick={() => setOpenSidenav(dispatch, !openSidenav)}>
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          {isAuthenticated && user ? (
            <Menu>
              <MenuHandler>
                <Button variant="text" color="blue-gray" className="flex items-center gap-1 px-2 xl:px-4 normal-case">
                  <Avatar 
                    src={user.avatarUrl || "/img/team-2.jpeg"} 
                    alt={user.name || "User"} 
                    size="sm" 
                    variant="circular"
                    className="cursor-pointer"
                  />
                  <Typography variant="small" className="hidden xl:inline-block font-medium text-blue-gray-900">
                    {user.name || "User"}
                  </Typography>
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem className="flex items-center gap-2" onClick={handleProfileNavigation}>
                  <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                  <Typography variant="small" className="font-medium">Hồ sơ của tôi</Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-500" onClick={handleLogout}>
                  <PowerIcon strokeWidth={2} className="h-4 w-4" />
                  <Typography variant="small" className="font-medium">Đăng xuất</Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/auth/sign-in">
              <Button variant="text" color="blue-gray" className="hidden items-center gap-1 px-4 xl:flex normal-case">
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" /> Sign In
              </Button>
              <IconButton variant="text" color="blue-gray" className="grid xl:hidden">
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </Link>
          )}
          

          
          {isAuthenticated && (
            <>
       
                <IconButton variant="text" color="blue-gray" onClick={() => setOpenConfigurator(dispatch, true)}><Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" /></IconButton>
            </>
          )}
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";
export default DashboardNavbar;