import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

const PlantDetails: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState({
    temperature: null,
    humidity: null,
    soilMoisture: null,
    light: null,
    fanStatus: null,
    ledStatus: null,
    pump1Status: null,
    pump2Status: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/record/get");
        const result = await response.json();
        console.log("📌 Dữ liệu từ API:", result); // In ra console
        setData(result);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // Cập nhật mỗi 5 giây

    return () => clearInterval(interval); // Xóa interval khi component bị unmount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-800 flex flex-col items-center justify-center px-4">
      {/* Thanh tìm kiếm */}
      <SearchBar placeholder="Tìm kiếm cây trồng..." onSearch={setSearchValue} />

      {/* Khối thông tin */}
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full mt-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Thông số hiện tại</h1>

        {/* Ô bọc thông tin */}
        <div className="info-container">
          <div className="info-table">
            <div className="info-row">
              <div>Nhiệt độ</div>
              <div>{data.temperature ? `${data.temperature} °C` : "Đang tải..."}</div>
            </div>
            <div className="info-row">
              <div>Độ ẩm</div>
              <div>{data.humidity ? `${data.humidity} %` : "Đang tải..."}</div>
            </div>
            <div className="info-row">
              <div>Độ ẩm đất</div>
              <div>{data.soilMoisture ? `${data.soilMoisture} %` : "Đang tải..."}</div>
            </div>
            <div className="info-row">
              <div>Ánh sáng</div>
              <div>{data.light ? `${data.light} Lux` : "Đang tải..."}</div>
            </div>
            <div className="info-row">
              <div>Quạt</div>
              <div>{data.fanStatus === 1 ? "Bật" : "Tắt"}</div>
            </div>
            <div className="info-row">
              <div>Đèn LED</div>
              <div>{data.ledStatus === 1 ? "Bật" : "Tắt"}</div>
            </div>
            <div className="info-row">
              <div>Bơm 1</div>
              <div>{data.pump1Status === 1 ? "Bật" : "Tắt"}</div>
            </div>
            <div className="info-row">
              <div>Bơm 2</div>
              <div>{data.pump2Status === 1 ? "Bật" : "Tắt"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
