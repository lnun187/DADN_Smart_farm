import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useAuth } from "@/context/AuthContext"; // --- IMPORT useAuth ---

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  
  // --- LẤY TRẠNG THÁI XÁC THỰC VÀ VAI TRÒ TỪ AUTHCONTEXT ---
  const { isAuthenticated, userRole } = useAuth(); 

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-gradient-to-t from-green-100 to-emerald-50 shadow-sm",
  };

  // Lấy ra các trang thuộc layout 'dashboard'
  const dashboardPages = routes.find(route => route.layout === 'dashboard')?.pages || [];

  // --- LỌC PAGES DỰA TRÊN userRole LẤY TỪ CONTEXT ---
  const filteredPages = dashboardPages.filter(page => 
      isAuthenticated && (!page.roles || page.roles.includes(userRole)) 
  );

  // Lấy các trang auth
  const authPages = routes.find(route => route.layout === 'auth')?.pages || [];
  
  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
             {/* Sẽ thay bằng tên user hoặc brandName tùy thiết kế */}
            {brandName} 
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
         {/* --- CHỈ RENDER MENU DASHBOARD NẾU ĐÃ ĐĂNG NHẬP --- */}
         {isAuthenticated && filteredPages.length > 0 && (
             <ul className="mb-4 flex flex-col gap-1">
                 {filteredPages.map(({ icon, name, path, layout = "dashboard" }) => (
                    <li key={name}>
                      <NavLink to={`/${layout}${path}`}> 
                        {({ isActive }) => (
                          <Button
                            variant={isActive ? "gradient" : "text"}
                            color={
                              isActive
                                ? sidenavColor
                                : sidenavType === "dark"
                                ? "white"
                                : "blue-gray"
                            }
                            className="flex items-center gap-4 px-4 capitalize"
                            fullWidth
                          >
                            {icon}
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              {name}
                            </Typography>
                          </Button>
                        )}
                      </NavLink>
                    </li>
                 ))}
             </ul>
         )}

         {!isAuthenticated && authPages.length > 0 && ( 
           <div>
             {routes.find(route => route.layout === 'auth')?.title && (
               <li className="mx-3.5 mt-4 mb-2">
                 <Typography variant="small" color={sidenavType === "dark" ? "white" : "blue-gray"} className="font-black uppercase opacity-75">
                    {routes.find(route => route.layout === 'auth').title}
                 </Typography>
               </li>
             )}
             <ul className="mb-4 flex flex-col gap-1">
               {authPages.map(({ icon, name, path, layout = "auth" }) => ( 
                 <li key={name}>
                   <NavLink to={`/${layout}${path}`}>
                     {({ isActive }) => (
                       <Button variant={isActive ? "gradient" : "text"} color={isActive ? sidenavColor : sidenavType === "dark" ? "white" : "blue-gray"} className="flex items-center gap-4 px-4 capitalize" fullWidth>
                         {icon}
                         <Typography color="inherit" className="font-medium capitalize">{name}</Typography>
                       </Button>
                     )}
                   </NavLink>
                 </li>
               ))}
             </ul>
           </div>
         )}
      </div>
    </aside>
  );
}

// PropTypes và defaultProps giữ nguyên như trước
Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png", 
  brandName: "Nam's user", 
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;