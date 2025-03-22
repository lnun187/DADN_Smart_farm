import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import RegisterPage from './pages/RegisterPage'; // Import trang đăng ký

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} /> {/* Trang chính */}
        <Route path="/register" element={<RegisterPage />} /> {/* Trang đăng ký */}
        
      </Routes>
    </Router>
  );
};

export default App;