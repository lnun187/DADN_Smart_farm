import {
  Cog6ToothIcon,
  AdjustmentsHorizontalIcon,
  ExclamationCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";

export const ordersOverviewData = [
  {
    icon: Cog6ToothIcon,
    color: "text-blue-500",
    title: "Bơm nước khu vực 1",
    description: "Hoạt động ở mức 75%",
  },
  {
    icon: AdjustmentsHorizontalIcon,
    color: "text-green-500",
    title: "Tự động điều chỉnh lưu lượng",
    description: "06:00 - 18:00 hàng ngày",
  },
  {
    icon: ExclamationCircleIcon,
    color: "text-red-500",
    title: "Cảnh báo áp suất thấp",
    description: "Lúc 02:00 sáng hôm nay",
  },
  {
    icon: ClockIcon,
    color: "text-yellow-500",
    title: "Bảo trì định kỳ",
    description: "Dự kiến: 10/05/2025 lúc 9:00",
  },
  {
    icon: CheckCircleIcon,
    color: "text-teal-500",
    title: "Hệ thống an toàn",
    description: "Đã kiểm tra lúc 12:00 trưa",
  },
  {
    icon: BoltIcon,
    color: "text-indigo-500",
    title: "Nguồn điện ổn định",
    description: "Không phát hiện gián đoạn",
  },
];

export default ordersOverviewData;
