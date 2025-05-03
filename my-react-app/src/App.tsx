import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import OtpPage from "./pages/OTPPage";
import NewPasswordPage from "./pages/NewPassword";
import PlantDetails from "./details/PlanDetails";
import UserProfilePage from "./pages/UserProfilePage";
import PlanManagement from "./pages/PlanManagement";
import Navbar from "./navbar/navbarbasic";
import Chart from "./components/Chart";
import Dashboard from "./pages/DashBoard";
import SuperPlantDetails from "./details/SuperPlanDetails";
import SuperChart from "./components/SuperChart";
import ProcessPage from "./pages/Process";
import Notification from "./pages/Notification";

const Layout: React.FC = () => {
  const location = useLocation();
  
  // Danh sách các route ẩn header/navbar
  const authRoutes = ["/login", "/register", "/forgot-password", "/otp", "/new-password", "/"];
  const showHeader = authRoutes.includes(location.pathname);
  const hideNavbar = authRoutes.includes(location.pathname);

  return (
    <div className={`min-h-screen flex flex-col ${
      location.pathname === "/" 
        ? "bg-gradient-to-br from-green-500 to-green-900" 
        : "bg-gray-50"
    }`}>
      {/* Header chỉ hiển thị ở các trang auth */}
      {showHeader && <Header />}
      
      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navbar bên trái */}
        {!hideNavbar && (
          <div className="hidden md:block w-64 bg-white border-r border-gray-200">
            <Navbar />
          </div>
        )}

        {/* Content area với scroll */}
        <main className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-100 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/otp" element={<OtpPage />} />
              <Route path="/new-password" element={<NewPasswordPage />} />
              <Route path="/plan-details" element={<PlantDetails />} />
              <Route path="/user-profile" element={<UserProfilePage />} />
              <Route path="/plan-manage" element={<PlanManagement />} />
              <Route path="/chart" element={<Chart />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/superplan-details" element={<SuperPlantDetails />} />
              <Route path="/superchart" element={<SuperChart />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/notification" element={<Notification title={"Thông báo"} />}/>
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;