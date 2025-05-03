import { 
  SunIcon, 
  CloudIcon, 
  LightBulbIcon 
} from '@heroicons/react/24/outline';  

export const statisticsCardsData = [
  {
    color: "gray",
    icon: SunIcon,  
    title: "Điều chỉnh nhiệt độ",
    value: "37 độ C",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
    onClick: () => {
      console.log("Đã nhấn Điều chỉnh nhiệt độ");
    },
  },
  {
    color: "gray",
    icon: CloudIcon,  
    title: "Điều chỉnh độ ẩm",
    value: "58%",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
    onClick: () => {
      console.log("Đã nhấn Điều chỉnh độ ẩm");
    },
  },
  {
    color: "gray",
    icon: LightBulbIcon,  
    title: "Điều chỉnh ánh sáng",
    value: "3,461 Lux",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
    onClick: () => {
      console.log("Đã nhấn Điều chỉnh ánh sáng");
    },
  },
];

export default statisticsCardsData;
