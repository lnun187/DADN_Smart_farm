import React from 'react';
import { useNavigate } from 'react-router-dom';

const OtpPage: React.FC = () => {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    navigate('/new-password'); // Điều hướng sang trang nhập mật khẩu mới
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Nhập mã OTP</h2>
        <p className="text-gray-700 mb-6 text-center">Vui lòng nhập mã OTP đã được gửi đến số điện thoại của bạn.</p>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="otp">
            Mã OTP:
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
            id="otp"
            type="text"
            placeholder="Nhập mã OTP"
          />
        </div>
        <button
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          onClick={handleConfirmClick} // Xử lý sự kiện khi nhấn nút "Xác nhận"
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default OtpPage;