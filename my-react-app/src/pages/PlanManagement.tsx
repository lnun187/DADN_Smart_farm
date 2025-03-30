import React, { useState } from "react";
import Plant1 from "../assets/1.jpg";
import Plant2 from "../assets/2.jpg";
import Plant3 from "../assets/3.jpg";
import Plant4 from "../assets/4.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LightControl from "../details/LightControl";
import ConnectControl from "../details/ConnectControl";
import HumidityControl from "../details/HumidityControl";
import WaterControl from "../details/WaterLevelControl";
import TemperatureControl from "../details/TemperatureControl";

const images = [Plant1, Plant2, Plant3, Plant4];

const ManagementPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activePopup, setActivePopup] = useState<"light" | "connect" | "humidity" | "water" | "temperature" | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const togglePopup = (type: "light" | "connect" | "humidity" | "water" | "temperature") => {
    setActivePopup(activePopup === type ? null : type);
  };

  return (
    <div className="flex flex-col h-screen w-screen p-4">
      <div className="bg-gradient-to-b from-green-300 to-green-900 p-6 rounded-xl shadow-lg w-[80%] max-w-4xl relative">
        <div className="flex justify-between items-center mb-4">Quản lý</div>

        <div className="flex items-start">
          <div className={`flex flex-col items-center relative transition-transform duration-300 ${activePopup ? "scale-75" : "scale-100"}`} style={{ marginLeft: "90px" }}>
            <img
              src={images[currentIndex]}
              alt={`Plant ${currentIndex + 1}`}
              className="rounded-lg object-cover shadow-md border-2 border-white transition-transform duration-300"
              style={{ width: "366px", height: "216px", marginRight: "20px", marginLeft: "20px", paddingTop: "30px" }}
            />
            <div className="flex justify-center mt-2 space-x-4">
              <button onClick={handlePrev} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200" style={{ marginLeft: "20px", marginRight: "230px" }}>
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={handleNext} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {activePopup && (
            <div className="bg-white p-6 rounded-xl shadow-2xl border-4 w-[380px] h-[230px] ml-6">
              {activePopup === "light" && <LightControl />}
              {activePopup === "connect" && <ConnectControl />}
              {activePopup === "humidity" && <HumidityControl />}
              {activePopup === "water" && <WaterControl />}
              {activePopup === "temperature" && <TemperatureControl />}
            </div>
          )}
        </div>

        <div className="bg-green-800 p-6 mt-4 rounded-lg shadow-md h-40 flex justify-center items-center border-2 border-green-700">
          <p className="text-white">Thông tin chính</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {["Độ ẩm", "Nhiệt độ", "Mức nước", "Kết nối", "Ánh sáng"].map((label, index) => (
            <button
              key={index}
              className={`p-4 rounded-md shadow-md border-2 transition duration-200 ${
                (label === "Ánh sáng" && activePopup === "light") ||
                (label === "Kết nối" && activePopup === "connect") ||
                (label === "Độ ẩm" && activePopup === "humidity") ||
                (label === "Mức nước" && activePopup === "water") ||
                (label === "Nhiệt độ" && activePopup === "temperature")
                  ? "border-green-500 bg-green-100"
                  : "border-gray-200 hover:border-green-500 bg-white"
              }`}
              style={{ marginRight: "10px" }}
              onClick={() => {
                if (label === "Ánh sáng") togglePopup("light");
                if (label === "Kết nối") togglePopup("connect");
                if (label === "Độ ẩm") togglePopup("humidity");
                if (label === "Mức nước") togglePopup("water");
                if (label === "Nhiệt độ") togglePopup("temperature");
              }}
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
