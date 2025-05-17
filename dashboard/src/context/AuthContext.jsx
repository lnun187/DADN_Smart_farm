import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

// 1. Tạo Context
const AuthContext = createContext(null);

// 2. Định nghĩa key cho localStorage
const LOCAL_STORAGE_KEY = "authInfo";

// 3. Tạo Provider Component
export function AuthProvider({ children }) {
  const storedAuthInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialAuthState = storedAuthInfo
    ? JSON.parse(storedAuthInfo)
    : {
        isAuthenticated: false,
        userRole: null,
        user: null,
      };

  const [authState, setAuthState] = useState(initialAuthState);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/control/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      if (!response.ok) {
        console.log("Login failed with status:", response.status);
        return false;
      }

      const data = await response.json();
      console.log("Login successful:", data);

      const role = data?.user?.Role || data?.user?.Use_Role || "staff";

      setAuthState({
        isAuthenticated: true,
        userRole: role,
        user: {
          id: data.user._id,
          email: data.user.Email,
          name: data.user.Name,
          phone: data.user.Phone,
          role: role,
        },
      });

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    console.log("Logging out");
    setAuthState({
      isAuthenticated: false,
      userRole: null,
      user: null,
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const value = {
    ...authState,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;