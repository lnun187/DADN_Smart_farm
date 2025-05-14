import { chartsConfig } from "@/configs";

const weeklyHumidityChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Độ ẩm (%)",
      data: [55, 48, 60, 52, 70, 65, 50],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#4caf50",
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

const monthlyAverageHumidityChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Độ ẩm trung bình (%)",
      data: [60, 62, 58, 65, 70, 68, 72, 69, 66],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
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

const monthlyMinHumidityChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Độ ẩm thấp nhất (%)",
      data: [45, 48, 50, 43, 49, 46, 52, 50, 48],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#ef6c00"],
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

export const statisticsChartsData = [
  {
    color: "white",
    title: "Độ ẩm theo tuần",
    description: "Theo dõi độ ẩm từng ngày",
    footer: "cập nhật hôm nay",
    chart: weeklyHumidityChart,
  },
  {
    color: "white",
    title: "Độ ẩm trung bình hàng tháng",
    description: "Phân tích độ ẩm theo mùa",
    footer: "cập nhật hôm qua",
    chart: monthlyAverageHumidityChart,
  },
  {
    color: "white",
    title: "Độ ẩm thấp nhất",
    description: "Phát hiện vùng khô hạn",
    footer: "cập nhật gần đây",
    chart: monthlyMinHumidityChart,
  },
];

export default statisticsChartsData;
