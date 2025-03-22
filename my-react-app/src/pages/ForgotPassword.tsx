import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const handleOkClick = () => {
    navigate('/otp'); // Điều hướng sang trang nhập mã OTP
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Hãy để chúng tôi giúp bạn</h2>
        <p className="text-gray-700 mb-6 text-center">Lấy lại mật khẩu:</p>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
            Nhập số điện thoại:
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
            id="phone"
            type="text"
            placeholder="+84-909090909"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0'].map((key) => (
            <button
              key={key}
              className="bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              {key}
            </button>
          ))}
        </div>
        <button
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          onClick={handleOkClick} // Xử lý sự kiện khi nhấn nút "OK"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;