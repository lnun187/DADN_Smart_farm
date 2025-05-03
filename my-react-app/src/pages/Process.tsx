import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

interface ProcessData {
  id: number;
  name: string;
  status: "Hoàn thành" | "Đang thực hiện" | "Chưa bắt đầu";
  startTime: string;
  endTime: string;
  duration: string;
  details: string;
  icon: string;
  position: {
    x: number;
    y: number;
  };
}

const processData: ProcessData[] = [
  {
    id: 1,
    name: "Tưới cây tự động",
    status: "Hoàn thành",
    startTime: "08:00 15/04/2024",
    endTime: "08:05 15/04/2024",
    duration: "5 phút",
    details: "Tưới 500ml nước cho khu vực rau mầm. Độ ẩm tăng từ 45% lên 72%.",
    icon: "💧",
    position: { x: 50, y: 0 },
  },
  {
    id: 2,
    name: "Bón phân NPK",
    status: "Đang thực hiện",
    startTime: "09:30 15/04/2024",
    endTime: "",
    duration: "Đã chạy 3 phút",
    details: "Bón phân 200g/m² cho cây ăn quả. Tiến độ 60%.",
    icon: "🌱",
    position: { x: 450, y: -205 },
  },
  {
    id: 3,
    name: "Kiểm tra độ ẩm",
    status: "Chưa bắt đầu",
    startTime: "",
    endTime: "",
    duration: "",
    details: "Dự kiến kiểm tra độ ẩm toàn khu vào 14:00 hôm nay.",
    icon: "📊",
    position: { x: 850, y: -412 },
  },
  {
    id: 4,
    name: "Chiếu sáng LED",
    status: "Hoàn thành",
    startTime: "06:00 15/04/2024",
    endTime: "08:00 15/04/2024",
    duration: "2 giờ",
    details: "Chiếu sáng 1200 lux, quang phổ đầy đủ cho giai đoạn ra hoa.",
    icon: "💡",
    position: { x: 1300, y: -577 },
  },
];

const ProcessPage: React.FC = () => {
  const [openIds, setOpenIds] = useState<number[]>([]);

  const toggleDetails = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6 relative">
      <Sidebar />
      <h1 className="text-3xl font-bold text-green-800 text-center mb-10" style={{ paddingLeft: "500px" }}>
        📋 Lịch sử quá trình
      </h1>

      <div className="relative w-full h-[800px]">
        {processData.map((process) => {
          const isOpen = openIds.includes(process.id);
          const statusColor =
            process.status === "Hoàn thành"
              ? "bg-green-100 text-green-800"
              : process.status === "Đang thực hiện"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800";

          return (
            <div
              key={process.id}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-md flex flex-col items-center justify-between absolute transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                transform: `translateX(${process.position.x}px) translateY(${process.position.y}px)`,
                width: "400px",
              }}
            >
              <div className="text-3xl mb-4">{process.icon}</div>

              <div className="flex-1 text-center" style={{ width: "100%" }}>
                <h3 className="font-semibold text-lg text-green-800 mb-1">
                  {process.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {process.startTime && <>🕐 {process.startTime}</>}
                  {process.duration && <span> • ⏳ {process.duration}</span>}
                </p>
                <span
                  className={`text-xs mt-2 inline-block px-2 py-1 rounded-full ${statusColor}`}
                >
                  {process.status}
                </span>

                {/* Chi tiết có hiệu ứng mượt */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out mt-2 bg-gray-50 rounded-md px-2 ${
                    isOpen
                      ? "max-h-40 py-1 opacity-100"
                      : "max-h-0 py-0 opacity-0 pointer-events-none"
                  }`}
                >
                  {isOpen && (
                    <p className="text-sm text-gray-700">{process.details}</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => toggleDetails(process.id)}
                className="mt-3 text-green-600 text-sm hover:underline"
              >
                {isOpen ? "▲ Ẩn chi tiết" : "▼ Xem chi tiết"}
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        Cập nhật: {new Date().toLocaleDateString("vi-VN")}
      </p>
    </div>
  );
};

export default ProcessPage;
