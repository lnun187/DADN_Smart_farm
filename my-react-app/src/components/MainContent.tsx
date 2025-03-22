import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainContent: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // Điều hướng sang trang đăng ký
  };

  const handleLoginClick = () => {
    navigate('/login'); // Điều hướng sang trang đăng nhập (nếu cần)
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Welcome to BudCare</h2>
      <p className="mt-2">Dé dàng trồng cây của bạn với Smart Garden của chúng tôi!</p>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleRegisterClick} // Gọi hàm điều hướng khi nhấn vào nút
        >
          Đăng Ký
        </button>
        <button
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleLoginClick} // Gọi hàm điều hướng khi nhấn vào nút
        >
          Đăng Nhập
        </button>
      </div>
    </div>
  );
};

export default MainContent;