import React, { useState } from "react";

const LightControl: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleLight = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md w-64 text-center border">
      
      
      <div className="flex items-center gap-4 justify-center">
        <span className="text-gray-700 font-medium">Ánh sáng</span>
        
        <button
          onClick={toggleLight}
          className={`relative inline-flex h-8 w-16 items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${
            isOn ? "bg-green-500" : "bg-gray-300"
          }`}
          style={{ marginLeft: "50px", marginTop: "10px" }}
        >
          <span
            className={`inline-block h-6 w-6 rounded-full shadow-sm transform transition-transform duration-200 ${
              isOn ? "translate-x-8 bg-white" : "translate-x-0 bg-gray-400"
            }`}
          />
          
          <span className={`absolute text-xs font-medium ${
            isOn ? "text-white left-2" : "text-gray-500 right-2"
          }`}>
            {isOn ? "ON" : "OFF"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default LightControl;
