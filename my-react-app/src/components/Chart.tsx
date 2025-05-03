import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useState } from "react";

// Đăng ký các thành phần biểu đồ
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Temperature",
      data: [30, 32, 28, 35],
      borderColor: "#8884d8",
      fill: false,
    },
    {
      label: "Humidity",
      data: [60, 62, 55, 65],
      borderColor: "#82ca9d",
      fill: false,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "white", // Màu chữ trong legend
      },
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
      bodyColor: "white", // Màu chữ trong tooltip
      titleColor: "white", // Màu tiêu đề tooltip
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white", // Màu chữ của trục X (ví dụ Jan, Feb...)
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)", // (Tuỳ chọn) màu lưới trục X
      },
    },
    y: {
      ticks: {
        color: "white", 
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)", 
      },
    },
  },
};


function Chart() {
  const [selectedZone, setSelectedZone] = useState("Khu vực 1");

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedZone(e.target.value);
  };

  return (
    <div
      className="p-4 bg-gray-100 rounded-lg shadow-md"
      style={{ transform: "translateX(1200px) translateY(-580px)" }}
    >
      <div
        className="bg-white p-4 rounded-lg shadow border-2"
        style={{
          transform: "scale(1.2)",
          width: "max-content",
          borderColor: "white",
        }}
      >
        {/* Ô chọn khu vực */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ marginRight: "8px", fontWeight: "bold" }}>Chọn khu vực:</label>
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

        <h2 className="text-xl font-bold mb-3">Temperature & Humidity</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default Chart;
