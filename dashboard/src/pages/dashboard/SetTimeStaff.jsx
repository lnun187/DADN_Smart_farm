  import React, { useState, useEffect } from "react";
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
  import axios from "axios";

  // const gardenAreas = ["Khu Vườn 1", "Khu B", "Khu C", "Khu nhà kính", "Vườn phía Đông"];
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
  const periods = ["SA", "CH"];

  export function SettimeStaff() {
    const [gardenAreas, setGardenAreas] = useState([]);
    const [area, setArea] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [period, setPeriod] = useState("");
    const [note, setNote] = useState("");
    const [success, setSuccess] = useState(false);
    const [requests, setRequests] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const auth = JSON.parse(localStorage.getItem("authInfo"));

    useEffect(() => { 
      const fetchGardenAreas = async () => {
        try {
          // Gọi API để lấy danh sách khu vực
          console.log("Day la userID", auth.user.id);
          const response = await axios.get(`http://localhost:3001/staff/getArea/${auth.user.id}`);
          console.log("Dữ liệu API trả về:", response.data); // Kiểm tra dữ liệu
          if (response.data) {
            setGardenAreas(response.data);
          }
        } catch (error) {
          console.error("Lỗi khi tải danh sách khu vực:", error);
          alert("Có lỗi xảy ra khi tải danh sách khu vực.");
        }
      };

      const fetchSchedules = async () => {
        try {
          const [resPending, resApproved] = await Promise.all([
            axios.get(`http://localhost:3001/staff/watering/pending/${auth.user.id}`),
            axios.get(`http://localhost:3001/staff/watering/approved/${auth.user.id}`),
          ]);
          setPendingRequests(resPending.data);
          setApprovedRequests(resApproved.data);
        } catch (error) {
          console.error("Lỗi khi tải lịch tưới:", error);
        }
      };

      fetchSchedules(); // Gọi hàm fetchSchedules
      fetchGardenAreas(); // Gọi hàm fetchGardenAreas
      console.log("Day la userID", pendingRequests);
    }, [auth.user.id]);
    
    const handleSubmit = async () => {
      if (!area || !date || !hour || !minute || !period) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      const time = `${date} ${hour}:${minute} ${period}`;
      // const endTime = `${date} ${endHour}:${endMinute} ${periodEnd}`;

      const newRequest = {
        Staff_id: auth.user.id,
        area,
        time,
        note,
        createdAt: new Date().toLocaleString(),
      };
      console.log("Yêu cầu mới:", newRequest);
      try {
        const response = await fetch(`http://localhost:3001/staff/watering/request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRequest),
        })

        if (!response.ok) {
          throw new Error("Failed to create watering schedule");
        }
        const result = {
          Name: newRequest.area,
          Time: newRequest.time,
          Note: newRequest.note,
          createdAt: newRequest.createdAt,
        }
        setPendingRequests([result, ...pendingRequests]);
        setSuccess(true);

        // Reset form
        setArea("");
        setDate("");
        setHour("");
        setMinute("");
        setPeriod("");
        // setEndHour("");
        // setEndMinute("");
        // setPeriodEnd("");
        setNote("");

      } catch (error) {
        console.error("Error creating watering schedule:", error);
        alert("Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại.");
        return;
      }
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
                 {gardenAreas.map((areaObj) => (
                  <Option key={areaObj._id} value={areaObj.Name}> {/* Sử dụng _id để làm key và value */}
                    {areaObj.Name} {/* Hiển thị tên khu vực */}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Ngày tưới */}
            <div>
              <Typography variant="small" className="mb-1">Ngày tưới</Typography>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            {/* Giờ tưới */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Typography variant="small" className="mb-1">Giờ</Typography>
                <Select label="Giờ" value={hour} onChange={(val) => setHour(val || "")}>
                  {hours.map((h) => (
                    <Option key={h} value={h}>{h}</Option>
                  ))}
                </Select>
              </div>
              <div>
                <Typography variant="small" className="mb-1">Phút</Typography>
                <Select label="Phút" value={minute} onChange={(val) => setMinute(val || "")}>
                  {minutes.map((m) => (
                    <Option key={m} value={m}>{m}</Option>
                  ))}
                </Select>
              </div>
              <div>
                <Typography variant="small" className="mb-1">Buổi</Typography>
                <Select label="SA / CH" value={period} onChange={(val) => setPeriod(val || "")}>
                  {periods.map((p) => (
                    <Option key={p} value={p}>{p}</Option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Giờ kết thúc */}
            {/* <div className="grid grid-cols-3 gap-4">
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
            </div> */}

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

        {pendingRequests.length > 0 && (
          <Card>
            <CardHeader floated={false} shadow={false} className="bg-blue-50 p-4 border-b border-blue-200">
              <Typography variant="h6" color="blue">
                Danh sách yêu cầu đã tạo
              </Typography>
            </CardHeader>
            <CardBody className="p-6">
              <div className="flex flex-col gap-4">
                {pendingRequests.map((req, index) => (
                  <div key={index} className="border p-4 rounded-lg bg-white shadow-sm">
                    <Typography className="font-semibold text-blue-800">Khu vực: {req.Name}</Typography>
                    <Typography className="text-sm text-gray-600">
                      Thời gian: {req.Time} <br />
                    </Typography>
                    {req.note && <Typography className="italic text-sm mt-1">📝 {req.Note}</Typography>}
                    <Typography className="text-xs text-gray-400 mt-1">Tạo lúc: {req.createdAt}</Typography>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        {approvedRequests.length > 0 && (
          <Card>
            <CardHeader floated={false} shadow={false} className="bg-green-50 p-4 border-b border-green-200">
              <Typography variant="h6" color="green">
                Danh sách yêu cầu đã được duyệt
              </Typography>
            </CardHeader>
            <CardBody className="p-6">
              <div className="flex flex-col gap-4"> 
                {approvedRequests.map((req, index) => (
                  <div key={index} className="border p-4 rounded-lg bg-white shadow-sm">
                    <Typography className="font-semibold text-green-800">Khu vực: {req.Name}</Typography>
                    <Typography className="text-sm text-gray-600">
                      Thời gian: {req.Time} <br />
                    </Typography>
                    {req.note && <Typography className="italic text-sm mt-1">📝 {req.Note}</Typography>}
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