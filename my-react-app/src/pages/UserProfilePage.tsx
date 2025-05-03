import React from "react";
import { FaCog, FaList, FaInfoCircle, FaRegLightbulb, FaBell, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/'); // Điều hướng về trang chính
  };

  const handleDashboard = () => {
    navigate('/dashboard'); // Điều hướng về trang dashboard
  };

  const handleAnalysisClick = () => {
    navigate('/superchart'); 
  };
  const handleProcessKick = () => {
    navigate('/process'); // Trang phân tích (gộp thông số + quản lý)
  }

  return (
    <div className="user-profile-container">
      <div className="user-info">
        <div className="user-profile-header">
          <h1>Smart Farm XXX</h1>
        </div>

        <div className="user-info-card">
          <div className="info-row">
            <div className="avatar">
              <img src="/images/user_avatar.png" alt="User Avatar" />
            </div>
            <div className="user-details">
              <p className="name">Nguyễn A</p>
              <p className="phone">0393******</p>
            </div>
          </div>

          <div className="info-row">
            <p>Họ và tên: Nguyễn Văn A <span>&gt;</span></p>
          </div>
          <div className="info-row">
            <p>Ngày sinh: xx/xx/xxxx <span>&gt;</span></p>
          </div>
          <div className="info-row">
            <p>Chức vụ: Nhân viên <span>&gt;</span></p>
          </div>
          <div className="info-row">
            <p>ID: 2123 <span>&gt;</span></p>
          </div>
          <div className="info-row">
            <p>Phòng ban: P201.A3 <span>&gt;</span></p>
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>

      <div className="function-buttons">
        <button className="function-btn" onClick={handleDashboard}>
          <FaList className="icon" />
          Tổng quát
        </button>

        <button className="function-btn" onClick={handleAnalysisClick}>
          <FaChartBar className="icon" />
          Phân tích
        </button>

        <button className="function-btn" onClick={handleProcessKick}>
          <FaRegLightbulb className="icon" />
          Quá trình
        </button>

        <button className="function-btn">
          <FaBell className="icon" />
          Thông báo
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
