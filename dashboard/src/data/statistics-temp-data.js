import { chartsConfig } from "@/configs";

const weeklyTemperatureChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Nhiệt độ (°C)",
      data: [29, 30, 31, 32, 33, 31, 30],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#f44336",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    },
  },
};

const monthlyAverageTemperatureChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Nhiệt độ trung bình (°C)",
      data: [26, 27, 28, 30, 32, 31, 33, 32, 30],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#ff9800"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9"
      ],
    },
  },
};

const monthlyMaxTemperatureChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Nhiệt độ cao nhất (°C)",
      data: [30, 32, 33, 34, 36, 35, 37, 36, 34],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#d32f2f"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9"
      ],
    },
  },
};

export const statisticsTempData = [
  {
    color: "white",
    title: "Nhiệt độ theo tuần",
    description: "Theo dõi nhiệt độ từng ngày",
    footer: "cập nhật hôm nay",
    chart: weeklyTemperatureChart,
  },
  {
    color: "white",
    title: "Nhiệt độ trung bình hàng tháng",
    description: "Phân tích nhiệt độ theo mùa",
    footer: "cập nhật hôm qua",
    chart: monthlyAverageTemperatureChart,
  },
  {
    color: "white",
    title: "Nhiệt độ cao nhất",
    description: "Phát hiện thời điểm nắng gắt",
    footer: "cập nhật gần đây",
    chart: monthlyMaxTemperatureChart,
  },
];

export default statisticsTempData;
