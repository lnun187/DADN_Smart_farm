import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage'
import ForgotPassword from './pages/ForgotPassword';
import OtpPage from './pages/OTPPage';
import NewPasswordPage from './pages/NewPassword';
import PlantDetails from './details/PlanDetails';


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} /> {/* Trang chính */}
        <Route path="/register" element={<RegisterPage />} /> {/* Trang đăng ký */}
        <Route path="/login" element={<LoginPage />} /> {/* Trang đăng nhập */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
            <Route path="/otp" element={<OtpPage />} />
              <Route path="/new-password" element={<NewPasswordPage />} />    

        <Route path="/plan-details" element={<PlantDetails />} />    
      </Routes>
    </Router>
  );
};

export default App;