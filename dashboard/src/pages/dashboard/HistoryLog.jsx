import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,

} from "@material-tailwind/react";


// Import context để lấy selectedRegion
import { useMaterialTailwindController } from "@/context";

import { historyLogData as allHistoryLogData } from "@/data/history-log-data.js"; 
import { zoneData } from "@/data/zone-management-data.js"; 

export function HistoryLog() {
  // === LẤY selectedRegion TỪ CONTEXT ===
  const [controller] = useMaterialTailwindController();
  const { selectedRegion } = controller; 

  // State cho bộ lọc ngày
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");   
  
  // State cho danh sách log hiển thị
  const [displayedLogs, setDisplayedLogs] = useState(allHistoryLogData); 

  // === useEffect ĐỂ LỌC LẠI DANH SÁCH KHI FILTER THAY ĐỔI ===
  useEffect(() => {
    console.log("HistoryLog - Selected Region:", selectedRegion, "Start:", startDate, "End:", endDate);

    const start = startDate ? new Date(startDate + "T00:00:00") : null;
    const end = endDate ? new Date(endDate + "T23:59:59") : null;

    let filtered = allHistoryLogData;

    // 1. Lọc theo Khu vực (selectedRegion từ Context)
    if (selectedRegion && selectedRegion !== "all") {
      filtered = filtered.filter(log => log.zoneId === selectedRegion);
    }

    // 2. Lọc theo Ngày (startDate, endDate)
    if (start || end) {
      filtered = filtered.filter(log => {
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
    }
    
    setDisplayedLogs(filtered); 

  }, [startDate, endDate, selectedRegion, allHistoryLogData]); // Thêm selectedRegion vào dependencies

  // Hàm reset bộ lọc ngày (bộ lọc khu vực được quản lý bởi Navbar)
  const handleResetDateFilter = () => {
    setStartDate("");
    setEndDate("");
    // useEffect sẽ tự động chạy lại
  };

  // Cấu hình bảng: Hiển thị cột "Khu vực" nếu đang xem "Tất cả Khu vực"
  const showZoneColumn = selectedRegion === "all" || !selectedRegion;
  const TABLE_HEAD = [
    "Thời gian", 
    "Sự kiện / Thông số", 
    "Giá trị", 
    ...(showZoneColumn ? ["Khu vực"] : []), // Thêm cột Khu vực có điều kiện
    "Người thực hiện/Nguồn"
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" className="mb-4 p-6 bg-gradient-to-tr from-green-600 to-green-300"> 
          <Typography variant="h6" color="white">
            Lịch sử Hoạt động Vườn 
            {selectedRegion && selectedRegion !== "all" ? `(${zoneData.find(z => z.id === selectedRegion)?.name || `ID: ${selectedRegion}`})` : '(Tất cả Khu vực)'}
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
           <div className="w-full md:w-auto"> 
              <Button 
                variant="outlined"
                onClick={handleResetDateFilter}
                className="w-full md:w-auto" 
                disabled={!startDate && !endDate} // Chỉ enable khi có ngày được chọn
              >
                Reset Ngày
              </Button>
           </div>
        </CardBody>

        {/* Phần Bảng Lịch sử */}
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedLogs.length > 0 ? (
                 displayedLogs.map(
                  ({ timestamp, event, value, zone, actor, zoneId }, key) => { // Thêm zoneId vào destructuring nếu có
                    const className = `py-3 px-5 ${key === displayedLogs.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                    const formattedTimestamp = new Date(timestamp).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'medium'}); 
                    const zoneNameToDisplay = zoneData.find(z => z.id === zoneId)?.name || zone || "N/A";


                    return (
                      <tr key={timestamp + key + (actor || "")}> {/* Thêm actor vào key để tăng tính duy nhất */}
                        <td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{formattedTimestamp}</Typography></td>
                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{event}</Typography></td>
                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{value}</Typography></td>
                        {showZoneColumn && ( // Chỉ hiển thị cột Khu vực nếu cần
                           <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{zoneNameToDisplay}</Typography></td>
                        )}
                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{actor}</Typography></td>
                      </tr>
                    );
                  }
                )
              ) : (
                  <tr>
                      <td colSpan={TABLE_HEAD.length} className="py-4 px-5 text-center text-blue-gray-500">
                          Không tìm thấy bản ghi lịch sử nào phù hợp với bộ lọc.
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