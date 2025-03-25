import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password'); // Điều hướng sang trang quên mật khẩu
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Ngăn chặn reload trang
    navigate('/user-profile'); // Điều hướng đến trang user profile
  };

  const handleSignUpClick = () => {
    navigate('/register'); // Điều hướng đến trang đăng ký
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Welcome back!</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <input
              className=" "
              id="email"
              type="email"
              placeholder="Nhập email"
              style={{ width: '368px', height: '55px', borderRadius: '15px', marginBottom: '15px' }}
            />
          </div>
          <div>
            <input
              className=" "
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              style={{ width: '368px', height: '55px', borderRadius: '15px', marginBottom: '15px' }}
            />
          </div>
          <button
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            type="submit"
            style={{ width: '368px', height: '55px', borderRadius: '15px', marginBottom: '15px' }}
          >
            Đăng Nhập
          </button>
        </form>
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-green-600 hover:text-green-800 text-sm"
            onClick={handleForgotPasswordClick} 
          >
            Bạn quên mật khẩu?
          </a>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-green-600 hover:text-green-800 text-sm" onClick={handleSignUpClick}>
            Tạo tài khoản mới
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
