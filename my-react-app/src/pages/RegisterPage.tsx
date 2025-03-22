import React from 'react';

const RegisterPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng Ký Tài Khoản</h2>
        <form>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fullname">
              Họ và Tên
            </label>
            <input className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500" id="fullname" type="text" placeholder="Nhập họ và tên" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
              Số Điện Thoại
            </label>
            <input className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500" id="phone" type="text" placeholder="Nhập số điện thoại" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500" id="email" type="email" placeholder="Nhập email" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Mật Khẩu
            </label>
            <input className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500" id="password" type="password" placeholder="Nhập mật khẩu" />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
              Nhập Lại Mật Khẩu
            </label>
            <input className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500" id="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" />
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none" type="submit">
            Đăng Ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;