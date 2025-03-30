import React, { useState } from "react";

const HumidityControl: React.FC = () => {
  const [humidity, setHumidity] = useState(50);
  const [autoMode, setAutoMode] = useState(false);

  const handleHumidityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHumidity(parseInt(e.target.value));
  };

  const toggleAutoMode = () => {
    setAutoMode(!autoMode);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md w-80 text-center border">
      <div className="flex flex-col items-center gap-4">
        <span className="text-gray-700 font-medium">Độ ẩm: {humidity}%</span>
        
        <input
          type="range"
          min="0"
          max="100"
          value={humidity}
          onChange={handleHumidityChange}
          className="w-[calc(100%_-_40px)] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          disabled={autoMode}
          style={{ marginLeft: "40px" }}
        />
        
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={autoMode} 
            onChange={toggleAutoMode} 
            className="cursor-pointer"
          />
          <span className="text-gray-700">Tự động điều chỉnh</span>
        </div>
      </div>
    </div>
  );
};

export default HumidityControl;
