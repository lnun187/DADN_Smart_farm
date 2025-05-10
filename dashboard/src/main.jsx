// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { AuthProvider } from "@/context/AuthContext"; // <--- IMPORT AuthProvider
import "../public/css/tailwind.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* --- BỌC AuthProvider BÊN NGOÀI --- */}
      <AuthProvider> 
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <App />
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </AuthProvider> 
    </BrowserRouter>
  </React.StrictMode>
);