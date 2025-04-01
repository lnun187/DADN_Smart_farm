import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const Submit = () => {
    navigate('/login'); // Điều hướng sang trang nhập mã OTP
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Đăng Ký Tài Khoản</h2>
        <form className="space-y-6">
          <div>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="fullname"
              type="text"
              placeholder="Nhập họ và tên"
              style={{ width: '368px', height: '40px', borderRadius: '15px', marginBottom: '15px' }}
            />
          </div>
          <div>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="phone"
              type="text"
              placeholder="Nhập số điện thoại"
              style={{ width: '368px', height: '40px', borderRadius: '15px', marginBottom: '15px' }}
            />
          </div>
          <div>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="email"
              type="email"
              placeholder="Nhập email"
              style={{ width: '368px', height: '40px', borderRadius: '15px', marginBottom: '15px' }}
            />
          </div>
          <div>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              style={{ width: '368px', height: '40px', borderRadius: '15px', marginBottom: '15px' }}
            />
          </div>
          <div>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              style={{ width: '368px', height: '40px', borderRadius: '15px', marginBottom: '15px' }}
            />
          </div>
          <button
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            onClick={Submit}
            style={{borderRadius: 15 }}
            type="button"
          >
            Đăng Ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;