import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainContent: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // Điều hướng sang trang đăng ký
  };

  const handleLoginClick = () => {
    navigate('/login'); // Điều hướng sang trang đăng nhập
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-custom-blue mb-8">Welcome to BudCare</h2>
        <div className="flex justify-center">
          <button
            className="bg-custom-green text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            style={{ marginRight: "15px" }}
            onClick={handleRegisterClick}
          >
            Đăng Ký
          </button>
          <button
            className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={handleLoginClick}
          >
            Đăng Nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
