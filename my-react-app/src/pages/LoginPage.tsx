import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password'); // Điều hướng sang trang quên mật khẩu
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Welcome back!</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="email"
              type="email"
              placeholder="Nhập email"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            type="submit"
          >
            Đăng Nhập
          </button>
        </form>
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-green-600 hover:text-green-800 text-sm"
            onClick={handleForgotPasswordClick} // Gọi hàm điều hướng khi nhấn vào liên kết
          >
            Bạn quên mật khẩu?
          </a>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-green-600 hover:text-green-800 text-sm">
            Tạo tài khoản mới
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;