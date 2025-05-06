import { 
  SunIcon, 
  CloudIcon, 
  LightBulbIcon,
  AdjustmentsHorizontalIcon,
  BoltIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';  

export const statisticsCardsData = [
  {
    color: "gray",
    icon: SunIcon,  
    title: "Theo dõi nhiệt độ",
    value: "37 độ C",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: AdjustmentsHorizontalIcon,
    title: "Theo dõi độ ẩm",
    value: "65%",
    footer: {
      color: "text-red-500",
      value: "+5%",
      label: "so với hôm qua",
    },
  },  
  {
    color: "gray",
    icon: CloudIcon,  
    title: "Điều chỉnh bơm nước",
    value: "58%",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
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
  },
  {
    color: "gray",
    icon: BoltIcon,
    title: "Công suất quạt",
    value: "45 W",
    footer: {
      color: "text-green-500",
      value: "-5%",
      label: "so với tuần trước",
    },
  },
  
];

export default statisticsCardsData;
