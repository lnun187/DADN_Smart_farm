import React, { useState } from "react";

const ConnectControl: React.FC = () => {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="p-4 flex items-center gap-4">
      {/* Dòng chữ "Kết nối" */}
      <span className="text-gray-700 font-medium">Kết nối</span>
      
      {/* Nút toggle với style được chỉnh sửa */}
      <button
        onClick={toggleSwitch}
        className={`relative inline-flex h-8 w-16 items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${
          isOn ? "bg-blue-500" : "bg-gray-300"
        }`}
        style={{ marginLeft: "50px", marginTop: "10px" }}
      >
        {/* Khối trượt - giữ nguyên hiệu ứng */}
        <span
          className={`inline-block h-6 w-6 rounded-full shadow-sm transform transition-transform duration-200 ${
            isOn ? "translate-x-8 bg-white" : "translate-x-0 bg-gray-400"
          }`}
        />
        
        {/* Text trạng thái tích hợp - giữ nguyên */}
        <span className={`absolute text-xs font-medium ${
          isOn ? "text-white left-2" : "text-gray-500 right-2"
        }`}>
          {isOn ? "ON" : "OFF"}
        </span>
      </button>
    </div>
  );
};

export default ConnectControl;
