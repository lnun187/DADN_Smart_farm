import { chartsConfig } from "@/configs";

const weeklyLightChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Cường độ ánh sáng (lux)",
      data: [300, 5000, 12000, 15000, 14000, 6000, 1000],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fdd835",
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

const monthlyAverageLightChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Cường độ TB (lux)",
      data: [7000, 7500, 8000, 8500, 9000, 9500, 10000, 9800, 9400],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#ffeb3b"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9"],
    },
  },
};

const monthlyMaxLightChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Ánh sáng mạnh nhất (lux)",
      data: [10000, 11000, 12000, 13000, 13500, 14000, 14500, 14300, 13800],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fbc02d"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9"],
    },
  },
};

export const statisticsLuxData = [
  {
    color: "white",
    title: "Ánh sáng theo tuần",
    description: "Theo dõi cường độ ánh sáng từng ngày",
    footer: "cập nhật hôm nay",
    chart: weeklyLightChart,
  },
  {
    color: "white",
    title: "Ánh sáng trung bình hàng tháng",
    description: "Phân tích mức ánh sáng trung bình theo mùa",
    footer: "cập nhật hôm qua",
    chart: monthlyAverageLightChart,
  },
  {
    color: "white",
    title: "Ánh sáng cao nhất",
    description: "Phát hiện thời điểm ánh sáng mạnh nhất",
    footer: "cập nhật gần đây",
    chart: monthlyMaxLightChart,
  },
];

export default statisticsLuxData;
