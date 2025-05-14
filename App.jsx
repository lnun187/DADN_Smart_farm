import React from "react"; 
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useAuth } from "@/context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />} />

      <Route 
        path="/dashboard/*" 
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/auth/sign-in" replace />
        } 
      />
      <Route 
        path="*" 
        element={
          <Navigate to={isAuthenticated ? "/dashboard/home" : "/auth/sign-in"} replace />
        } 
      />
    </Routes>
  );
}

export default App;