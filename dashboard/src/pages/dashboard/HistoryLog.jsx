import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";

export function HistoryLog() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await fetch("http://localhost:3001/control/get/areas");
        const data = await res.json();
        setAreas(data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách khu vực:", err);
        setAreas([]);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (selectedArea !== "all") params.append("areaId", selectedArea);
        if (startDate) params.append("start", startDate);
        if (endDate) params.append("end", endDate);

        const res = await fetch(`http://localhost:3001/record/history?${params.toString()}`);
        const data = await res.json();
        setDisplayedLogs(data);
      } catch (err) {
        console.error("Lỗi khi tải lịch sử:", err);
        setDisplayedLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [selectedArea, startDate, endDate]);

  const handleResetDateFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  const showAreaColumn = selectedArea === "all";
  const TABLE_HEAD = [
    "Thời gian",
    "Sự kiện / Thông số",
    "Giá trị",
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          className="mb-4 p-6 bg-gradient-to-tr from-green-600 to-green-300"
        >
          <Typography variant="h6" color="white">
            Lịch sử Hoạt động Vườn {" "}
            {selectedArea !== "all"
              ? `(${areas.find((a) => a._id === selectedArea)?.Name || `ID: ${selectedArea}`})`
              : "(Tất cả Khu vực)"}
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col md:flex-row items-end gap-4 px-6 pb-4 pt-0">
          <div className="w-full md:w-60">
            <Select
              label="Chọn Khu vực"
              value={selectedArea}
              onChange={(val) => setSelectedArea(val)}
            >
              <Option value="all">Tất cả Khu vực</Option>
              {areas.map((area) => (
                <Option key={area._id} value={area._id}>
                  {area.Name} - {area.Address}
                </Option>
              ))}
            </Select>
          </div>
          <Input
            type="date"
            label="Từ ngày"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            containerProps={{ className: "min-w-[180px]" }}
          />
          <Input
            type="date"
            label="Đến ngày"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            containerProps={{ className: "min-w-[180px]" }}
          />
          <Button
            variant="outlined"
            onClick={handleResetDateFilter}
            disabled={!startDate && !endDate}
          >
            Reset Ngày
          </Button>
        </CardBody>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="py-4 px-5 text-center text-blue-gray-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : displayedLogs.length > 0 ? (
                displayedLogs.map(({ device, description, time, value }, key) => {
                  const className = `py-3 px-5 ${
                    key === displayedLogs.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;

                  const formattedTimestamp = new Date(time).toLocaleString("vi-VN", {
                    dateStyle: "short",
                    timeStyle: "medium",
                  });

                  return (
                    <tr key={time + key}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {formattedTimestamp}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {device}
                        </Typography>
                        <Typography className="text-[11px] text-blue-gray-400 italic">
                          {description}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {value}
                        </Typography>
                      </td>

                    </tr>
                  );
                })
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
