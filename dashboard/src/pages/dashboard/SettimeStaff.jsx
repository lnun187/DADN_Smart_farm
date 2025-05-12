import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Alert,
  Select,
  Option,
} from "@material-tailwind/react";

const gardenAreas = ["Khu A", "Khu B", "Khu C", "Khu nhà kính", "Vườn phía Đông"];
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
const periods = ["SA", "CH"];

export function SettimeStaff() {
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [periodStart, setPeriodStart] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);
  const [requests, setRequests] = useState([]);

  const handleSubmit = () => {
    if (!area || !date || !startHour || !startMinute || !periodStart || !endHour || !endMinute || !periodEnd) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const startTime = `${date} ${startHour}:${startMinute} ${periodStart}`;
    const endTime = `${date} ${endHour}:${endMinute} ${periodEnd}`;

    const newRequest = {
      area,
      startTime,
      endTime,
      note,
      createdAt: new Date().toLocaleString(),
    };

    setRequests([newRequest, ...requests]);
    setSuccess(true);

    // Reset form
    setArea("");
    setDate("");
    setStartHour("");
    setStartMinute("");
    setPeriodStart("");
    setEndHour("");
    setEndMinute("");
    setPeriodEnd("");
    setNote("");
  };

  return (
    <div className="mx-auto my-10 max-w-4xl px-4">
      <Card className="shadow-lg mb-8">
        <CardHeader floated={false} shadow={false} className="bg-green-100 p-4 border-b border-green-300">
          <Typography variant="h5" color="green">
            Tạo Lịch Chăm Sóc Vườn
          </Typography>
          
        </CardHeader>

        <CardBody className="flex flex-col gap-6 p-6">
          {success && (
            <Alert color="green" onClose={() => setSuccess(false)}>
              ✅ Yêu cầu đã được gửi thành công.
            </Alert>
          )}

          {/* Khu vực */}
          <div>
            <Typography variant="small" className="mb-1">Chọn khu vực</Typography>
            <Select label="Khu vực" value={area} onChange={(val) => setArea(val || "")}>
              {gardenAreas.map((areaName) => (
                <Option key={areaName} value={areaName}>
                  {areaName}
                </Option>
              ))}
            </Select>
          </div>

          {/* Ngày tưới */}
          <div>
            <Typography variant="small" className="mb-1">Ngày tưới</Typography>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          {/* Giờ bắt đầu */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Typography variant="small" className="mb-1">Giờ bắt đầu</Typography>
              <Select label="Giờ" value={startHour} onChange={(val) => setStartHour(val || "")}>
                {hours.map((h) => (
                  <Option key={h} value={h}>{h}</Option>
                ))}
              </Select>
            </div>
            <div>
              <Typography variant="small" className="mb-1">Phút bắt đầu</Typography>
              <Select label="Phút" value={startMinute} onChange={(val) => setStartMinute(val || "")}>
                {minutes.map((m) => (
                  <Option key={m} value={m}>{m}</Option>
                ))}
              </Select>
            </div>
            <div>
              <Typography variant="small" className="mb-1">Buổi</Typography>
              <Select label="SA / CH" value={periodStart} onChange={(val) => setPeriodStart(val || "")}>
                {periods.map((p) => (
                  <Option key={p} value={p}>{p}</Option>
                ))}
              </Select>
            </div>
          </div>

          {/* Giờ kết thúc */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Typography variant="small" className="mb-1">Giờ kết thúc</Typography>
              <Select label="Giờ" value={endHour} onChange={(val) => setEndHour(val || "")}>
                {hours.map((h) => (
                  <Option key={h} value={h}>{h}</Option>
                ))}
              </Select>
            </div>
            <div>
              <Typography variant="small" className="mb-1">Phút kết thúc</Typography>
              <Select label="Phút" value={endMinute} onChange={(val) => setEndMinute(val || "")}>
                {minutes.map((m) => (
                  <Option key={m} value={m}>{m}</Option>
                ))}
              </Select>
            </div>
            <div>
              <Typography variant="small" className="mb-1">Buổi</Typography>
              <Select label="SA / CH" value={periodEnd} onChange={(val) => setPeriodEnd(val || "")}>
                {periods.map((p) => (
                  <Option key={p} value={p}>{p}</Option>
                ))}
              </Select>
            </div>
          </div>

          {/* Ghi chú */}
          <div>
            <Typography variant="small" className="mb-1">Ghi chú</Typography>
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Điền ghi chú nếu có"
            />
          </div>

          <Button color="green" onClick={handleSubmit} fullWidth>
            Gửi yêu cầu tưới cây
          </Button>
        </CardBody>
      </Card>

      
      {requests.length > 0 && (
        <Card>
          <CardHeader floated={false} shadow={false} className="bg-blue-50 p-4 border-b border-blue-200">
            <Typography variant="h6" color="blue">
              Danh sách yêu cầu đã tạo
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <div className="flex flex-col gap-4">
              {requests.map((req, index) => (
                <div key={index} className="border p-4 rounded-lg bg-white shadow-sm">
                  <Typography className="font-semibold text-green-800">Khu vực: {req.area}</Typography>
                  <Typography className="text-sm text-gray-600">
                    Từ: {req.startTime} &nbsp; → &nbsp; Đến: {req.endTime}
                  </Typography>
                  {req.note && <Typography className="italic text-sm mt-1">📝 {req.note}</Typography>}
                  <Typography className="text-xs text-gray-400 mt-1">Tạo lúc: {req.createdAt}</Typography>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default SettimeStaff;
