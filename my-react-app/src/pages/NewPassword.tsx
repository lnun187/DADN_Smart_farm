import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    // Xử lý logic lưu mật khẩu mới (nếu cần)
    navigate('/login'); // Điều hướng về trang đăng nhập
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Nhập mật khẩu mới</h2>
        <p className="text-gray-700 mb-6 text-center">Vui lòng nhập mật khẩu mới của bạn.</p>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="new-password">
              Mật khẩu mới:
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="new-password"
              type="password"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirm-password">
              Xác nhận mật khẩu:
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-green-500"
              id="confirm-password"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
          <button
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            type="button" // Thay đổi type thành "button" để tránh submit form
            onClick={handleConfirmClick} // Xử lý sự kiện khi nhấn nút "Xác nhận"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordPage;