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
import PlanManagement from "./pages/PlanManagement"

const Layout: React.FC = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/user-profile"]; // Các route không hiển thị Header
  const isHomePage = location.pathname === "/"; // Kiểm tra nếu là trang chủ

  return (
    <div className={isHomePage ? "background-home" : ""}>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
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
      </Routes>
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
