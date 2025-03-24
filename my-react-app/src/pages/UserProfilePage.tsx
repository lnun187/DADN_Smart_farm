import React from "react";
import { FaCog, FaList, FaInfoCircle, FaRegLightbulb, FaBell } from "react-icons/fa"; // Thêm icon từ react-icons
import { useNavigate } from "react-router-dom"; // Import useNavigate

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate(); 

  const handleInfoClick = () => {
    navigate('/plan-details'); // Điều hướng đến trang PlanDetails
  };

  return (
    <div className="user-profile-container">
      {/* Thông tin người dùng */}
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
            <p>
              Họ và tên: Nguyễn Văn A <span>&gt;</span>
            </p>
          </div>
          <div className="info-row">
            <p>
              Ngày sinh: xx/xx/xxxx <span>&gt;</span>
            </p>
          </div>
          <div className="info-row">
            <p>
              Chức vụ: Nhân viên <span>&gt;</span>
            </p>
          </div>
          <div className="info-row">
            <p>
              ID: 2123 <span>&gt;</span>
            </p>
          </div>
          <div className="info-row">
            <p>
              Phòng ban: P201.A3 <span>&gt;</span>
            </p>
          </div>
        </div>
        <button className="logout-button">Đăng xuất</button>
      </div>

      {/* Các chức năng */}
      <div className="function-buttons">
        <button className="function-btn">
          <FaList className="icon" />
          Thể loại
        </button>


        <button className="function-btn" onClick={handleInfoClick}>
          <FaInfoCircle className="icon" />
          Thông số
        </button>

        <button className="function-btn">
          <FaCog className="icon" />
          Quản lý
        </button>
        <button className="function-btn">
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
