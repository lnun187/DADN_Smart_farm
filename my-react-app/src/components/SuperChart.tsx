import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import {
  Line,
  Bar,
  Chart,
} from "react-chartjs-2";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

// Đăng ký thành phần ChartJS
ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title
);

// Dữ liệu mẫu
const basicData = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Temperature",
      data: [30, 32, 28, 35],
      borderColor: "#8884d8",
      backgroundColor: "#8884d880",
      fill: false,
    },
    {
      label: "Humidity",
      data: [60, 62, 55, 65],
      borderColor: "#82ca9d",
      backgroundColor: "#82ca9d80",
      fill: false,
    },
  ],
};

// Dữ liệu biểu đồ kết hợp
const mixedData = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      type: "bar" as const,
      label: "Humidity",
      data: [60, 62, 55, 65],
      backgroundColor: "#82ca9d80",
    },
    {
      type: "line" as const,
      label: "Temperature",
      data: [30, 32, 28, 35],
      borderColor: "#8884d8",
      backgroundColor: "#8884d880",
    },
  ],
};

// Tùy chọn hiển thị
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
    },
  },
  scales: {
    x: { beginAtZero: true },
    y: { beginAtZero: true },
  },
};

// Hàm tính trung bình
const calculateAverage = (arr: number[]) =>
  (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(2);

function SuperChart() {
  const [selectedZone, setSelectedZone] = useState("Khu vực 1");
  const [chartType, setChartType] = useState("line");

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedZone(e.target.value);
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={basicData} options={options} />;
      case "mixed":
        return <Chart type="bar" data={mixedData} options={options} />;
      default:
        return <Line data={basicData} options={options} />;
    }
  };

  // Dữ liệu phân tích
  const tempAvg = calculateAverage(basicData.datasets[0].data);
  const humidAvg = calculateAverage(basicData.datasets[1].data);

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-10 gap-10">
      <Sidebar />
      <div style={{ transform: "translate(200px, 80px)" }}>
        <div
          className="bg-white p-4 rounded-lg shadow border-2"
          style={{
            transform: "scale(1.2)",
            width: "max-content",
            borderColor: "white",
          }}
        >
          {/* Chọn khu vực */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ marginRight: "8px", fontWeight: "bold" }}>
              Chọn khu vực:
            </label>
            <select
              value={selectedZone}
              onChange={handleZoneChange}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            >
              <option value="Khu vực 1">Khu vực 1</option>
              <option value="Khu vực 2">Khu vực 2</option>
              <option value="Khu vực 3">Khu vực 3</option>
              <option value="Khu vực 4">Khu vực 4</option>
            </select>
          </div>

          {/* Chọn loại biểu đồ */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ marginRight: "8px", fontWeight: "bold" }}>
              Loại biểu đồ:
            </label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            >
              <option value="line">Line</option>
              <option value="bar">Bar</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          {/* Biểu đồ */}
          <h2 className="text-xl font-bold mb-3">Temperature & Humidity</h2>
          {renderChart()}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border-2 w-80"
          style={{ width: "500px", transform: "translate(800px, -350px)" }}>
        <h2 className="text-lg font-semibold mb-4">Phân tích kết quả</h2>
        <p><strong>Khu vực:</strong> {selectedZone}</p>
        <p><strong>Loại biểu đồ:</strong> {chartType}</p>
        <hr className="my-3" />
        <p><strong>Nhiệt độ trung bình:</strong> {tempAvg}°C</p>
        <p><strong>Độ ẩm trung bình:</strong> {humidAvg}%</p>
        <p className="mt-3 text-sm text-gray-600">
          Dữ liệu cho thấy sự biến động nhiệt độ và độ ẩm theo tháng.
          Có thể sử dụng để điều chỉnh hệ thống điều hòa tự động.
        </p>
      </div>
    </div>
  );
}

export default SuperChart;
