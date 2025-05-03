import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

const SuperPlanDetails: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState({
    temperature: null,
    humidity: null,
    soilMoisture: null,
    light: null,
    fanStatus: null,
    ledStatus: null,
    pump1Status: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/record/get");
        const result = await response.json();
        console.log("📌 Dữ liệu từ API:", result);
        setData(result);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-800 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full mt-6">
        <div className="info-container">
          <div className="info-table">
            {[
              {
                label: "Nhiệt độ",
                value: data.temperature ? `${data.temperature} °C` : "Đang tải...",
              },
              {
                label: "Độ ẩm",
                value: data.humidity ? `${data.humidity} %` : "Đang tải...",
              },
              {
                label: "Độ ẩm đất",
                value: data.soilMoisture ? `${data.soilMoisture} %` : "Đang tải...",
              },
              {
                label: "Ánh sáng",
                value: data.light ? `${data.light} Lux` : "Đang tải...",
              },
              {
                label: "Quạt",
                value: data.fanStatus !== "0" ? "Bật" : "Tắt",
              },
              {
                label: "Đèn LED",
                value: data.ledStatus === "#000000" ? "Tắt" : "Bật",
              },
              {
                label: "Bơm 1",
                value: data.pump1Status !== "0" ? "Bật" : "Tắt",
              },
            ].map((item, index) => (
              <div className="info-row flex justify-between border-b py-2" key={index}>
                <div className="font-medium text-gray-700">{item.label}</div>
                <div className="text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperPlanDetails;
