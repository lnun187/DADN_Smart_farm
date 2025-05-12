// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

// 1. Tạo Context
const AuthContext = createContext(null);

// Định nghĩa các tài khoản giả lập
// export const MOCK_USERS = {
//   "admin@gmail.com": { password: "123", role: "admin", name: "Admin User" },
//   "staff@gmail.com": { password: "456", role: "staff", name: "Staff User" },
// };

// 2. Tạo Provider Component
export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    user: null,
  });

  useEffect(() => {
    const savedAuthState = sessionStorage.getItem("authState");
    if (savedAuthState) {
      setAuthState(JSON.parse(savedAuthState));
    }
  }, []);
  
  // Hàm xử lý đăng nhập giả lập
  const login = async (email, password) => {
    // const matchedUser = MOCK_USERS[email];
    // if (matchedUser && matchedUser.password === password) {
    //   console.log("Mock login successful for role:", matchedUser.role);
    //   setAuthState({
    //     isAuthenticated: true,
    //     userRole: matchedUser.role,
    //     user: { email: email, name: matchedUser.name, role: matchedUser.role }, // Lưu thêm thông tin user
    //   });
    //   return true; // Đăng nhập thành công
    // }
    // console.log("Mock login failed");
    // return false; // Đăng nhập thất bại
    try {
      // Gọi API thực tế để đăng nhập
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const data = await response.json();

      // setAuthState(prevState => ({
      //   ...prevState,
      //   isAuthenticated: true,
      //   userRole: data.user.Role === "Manager" ? "admin" : "staff",
      //   user: data.user,
      // }));

      const updatedAuthState = {
        isAuthenticated: true,
        userRole: data.user.Role === "Manager" ? "admin" : "staff",
        user: data.user,
      };
      // Lưu trạng thái vào sessionStorage
      sessionStorage.setItem("authState", JSON.stringify(updatedAuthState));

      setAuthState(updatedAuthState);

      return true;
    }catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  // Hàm xử lý đăng xuất
  const logout = () => {
    console.log("Logging out");
    setAuthState({
      isAuthenticated: false,
      userRole: null,
      user: null,
    });

  };


  const value = useMemo(
    () => ({
      ...authState, // Truyền isAuthenticated, userRole, user
      login,
      logout,
    }),
    [authState] // Chỉ tạo lại value khi authState thay đổi
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Tạo custom hook cho dễ dàng sử dụng Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// PropTypes cho Provider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext; // Export context nếu cần dùng trực tiếp ở đâu đó