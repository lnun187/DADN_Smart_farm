import React, { useState } from "react";
import axios from "axios";

const ManagementPage: React.FC = () => {
  const [activePopup, setActivePopup] = useState<
    "light" | "connect" | "humidity" | "water" | "temperature" | null
  >(null);

  const [fanSpeed, setFanSpeed] = useState(150);
  const [pumpStatus, setPumpStatus] = useState(false);
  const [ledColor, setLedColor] = useState("#FF0000");

  const togglePopup = (type: "light" | "connect" | "humidity" | "water" | "temperature") => {
    setActivePopup(activePopup === type ? null : type);
  };

  const sendCommand = async (device: string, command: any) => {
    try {
      await axios.post("http://localhost:3001/api/control/device", { device, command });
      alert(`${device} command sent successfully!`);
    } catch (error) {
      console.error("Error sending command:", error);
      alert("Failed to send command.");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen p-4">
      <div
        className="bg-gradient-to-b from-green-300 to-green-900 p-6 rounded-xl shadow-lg w-[80%] max-w-4xl relative"
        style={{ transform: "translateX(725px) translateY(-470px)" }}
      >
        <div className="flex items-start justify-center">
          {activePopup && (
            <div className="bg-white p-6 rounded-xl shadow-2xl border-4 w-[380px] h-[230px]">
              {activePopup === "light" && (
                <div>
                  <label className="block mb-2">Chọn màu LED</label>
                  <input
                    type="color"
                    value={ledColor}
                    onChange={(e) => setLedColor(e.target.value)}
                    className="w-full h-10"
                    style={{ marginLeft: "6px" , marginRight: "6px"}}
                  />
                  <button
                    onClick={() => sendCommand("led", ledColor)}
                    className="mt-4 p-2 w-full bg-green-500 text-white rounded-md"
                    
                  >
                    Gửi lệnh LED
                  </button>
                </div>
              )}
              {activePopup === "temperature" && (
                <div>
                  <label className="block mb-2">Tốc độ quạt (0-250)</label>
                  <input
                    type="range"
                    min="0"
                    max="250"
                    value={fanSpeed}
                    onChange={(e) => setFanSpeed(Number(e.target.value))}
                    className="w-full"
                  />
                  <button
                    onClick={() => sendCommand("fan", fanSpeed)}
                    className="mt-4 p-2 w-full bg-green-500 text-white rounded-md"
                  >
                    Gửi lệnh quạt
                  </button>
                </div>
              )}
              {activePopup === "water" && (
                <div>
                  <label className="block mb-2">Máy bơm</label>
                  <button
                    onClick={() => {
                      setPumpStatus(!pumpStatus);
                      sendCommand("pump1", pumpStatus ? 0 : 1);
                    }}
                    className={`p-2 w-full ${pumpStatus ? "bg-red-500" : "bg-green-500"} text-white rounded-md`}
                    style={{ marginLeft: "6px" }}
                  >
                    {pumpStatus ? "Tắt máy bơm" : "Bật máy bơm"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-green-800 p-6 mt-6 rounded-lg shadow-md h-40 flex justify-center items-center border-2 border-green-700">
          <h2 className="text-xl font-bold mb-3">Thông tin chính</h2>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {[
            { label: "Quạt", device: "fan" },
            { label: "Máy bơm", device: "pump1" },
            { label: "Ánh sáng", device: "led" }
          ].map(({ label, device }, index) => (
            <button
              key={index}
              className="p-4 rounded-md shadow-md border-2 transition duration-200 border-gray-200 hover:border-green-500 bg-white"
              style={{ marginLeft: "6px", marginRight: "6px" }}
              onClick={() =>
                togglePopup(
                  device === "fan"
                    ? "temperature"
                    : device === "pump1"
                    ? "water"
                    : "light"
                )
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
