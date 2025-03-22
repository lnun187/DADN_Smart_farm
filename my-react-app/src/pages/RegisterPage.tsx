import React from 'react';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Đăng Ký Tài Khoản</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fullname">
              Họ và Tên
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="fullname"
              type="text"
              placeholder="Nhập họ và tên"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
              Số Điện Thoại
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="phone"
              type="text"
              placeholder="Nhập số điện thoại"
            />
          </div>
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
              Mật Khẩu
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
              Nhập Lại Mật Khẩu
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
          <button
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            type="submit"
          >
            Đăng Ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;