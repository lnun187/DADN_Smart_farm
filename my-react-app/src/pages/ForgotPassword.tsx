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

          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
            id="phone"
            type="text"
            placeholder="Nhập số điện thoại"
            style={{ width: '368px', height: '40px', borderRadius: '15px', marginBottom: '15px' }}
          />
        </div>
      
        <button
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          onClick={handleOkClick} 
          style={{borderRadius: '15px' }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;