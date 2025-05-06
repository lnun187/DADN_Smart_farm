import React, { useState, useEffect } from "react"; // Vẫn dùng useEffect cho lọc ngày
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  // Không cần Select, Option nữa
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"; // Đổi lại solid nếu muốn icon đầy

// Import dữ liệu mẫu
import { historyLogData } from "@/data/history-log-data.js"; 

export function HistoryLog() {
  // State cho bộ lọc ngày
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");   
  
  // State cho danh sách log hiển thị
  const [displayedLogs, setDisplayedLogs] = useState(historyLogData); 

  // Sử dụng useEffect để lọc theo ngày khi startDate hoặc endDate thay đổi
  useEffect(() => {
    const start = startDate ? new Date(startDate + "T00:00:00") : null;
    const end = endDate ? new Date(endDate + "T23:59:59") : null;

    const filtered = historyLogData.filter(log => {
      try {
        const logDate = new Date(log.timestamp); 
        const afterStartDate = start ? logDate >= start : true;
        const beforeEndDate = end ? logDate <= end : true;
        return afterStartDate && beforeEndDate;
      } catch (error) {
        console.error("Lỗi khi parse ngày:", log.timestamp, error);
        return false; 
      }
    });

    setDisplayedLogs(filtered); 

  }, [startDate, endDate, historyLogData]); // Chỉ phụ thuộc vào bộ lọc ngày và data gốc

  // Hàm reset bộ lọc ngày
  const handleResetFilter = () => {
    setStartDate("");
    setEndDate("");
    // useEffect sẽ tự động chạy lại và cập nhật displayedLogs về ban đầu
  };

  // --- BỎ CỘT "Khu vực" KHỎI TABLE_HEAD ---
  const TABLE_HEAD = ["Thời gian", "Sự kiện / Thông số", "Giá trị", "Người thực hiện/Nguồn"];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-4 p-6"> 
          <Typography variant="h6" color="white">
            Lịch sử Hoạt động Vườn
          </Typography>
        </CardHeader>

        {/* Phần Bộ lọc Ngày */}
        <CardBody className="flex flex-col md:flex-row items-end gap-4 px-6 pb-4 pt-0">
           <div className="w-full md:w-auto">
             <Input type="date" label="Từ ngày" value={startDate} onChange={(e) => setStartDate(e.target.value)} containerProps={{ className: "min-w-[180px]" }}/>
          </div>
          <div className="w-full md:w-auto">
            <Input type="date" label="Đến ngày" value={endDate} onChange={(e) => setEndDate(e.target.value)} containerProps={{ className: "min-w-[180px]" }}/>
          </div>
          {/* Bỏ nút Lọc vì dùng useEffect */}
           <div className="w-full md:w-auto"> 
              <Button 
                variant="outlined"
                onClick={handleResetFilter}
                className="w-full md:w-auto" 
              >
                Reset 
              </Button>
           </div>
        </CardBody>

        {/* Phần Bảng Lịch sử */}
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => ( // TABLE_HEAD đã được cập nhật
                  <th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedLogs.length > 0 ? (
                 displayedLogs.map(
                  // --- BỎ `zone` KHỎI DESTRUCTURING ---
                  ({ timestamp, event, value, actor }, key) => { 
                    const className = `py-3 px-5 ${key === displayedLogs.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                    const formattedTimestamp = new Date(timestamp).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'medium'}); 

                    return (
                      <tr key={timestamp + key}> 
                        <td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{formattedTimestamp}</Typography></td>
                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{event}</Typography></td>
                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{value}</Typography></td>
                        {/* --- ĐÃ BỎ TD CỦA ZONE --- */}
                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{actor}</Typography></td>
                      </tr>
                    );
                  }
                )
              ) : (
                  <tr>
                      {/* --- Cập nhật colSpan --- */}
                      <td colSpan={TABLE_HEAD.length} className="py-4 px-5 text-center text-blue-gray-500">
                          Không tìm thấy bản ghi lịch sử nào phù hợp với bộ lọc ngày.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default HistoryLog;