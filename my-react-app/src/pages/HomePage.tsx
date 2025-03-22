import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Chào mừng đến với BudCare</h2>
        <Link to="/register">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none">
            Đăng Ký
          </button>
        </Link>
        <p className="mt-4 text-center">
          Đã có tài khoản? <Link to="/login" className="text-green-600 hover:text-green-800">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;