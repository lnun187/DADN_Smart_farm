import React, { useState, useEffect, useRef } from "react";
import {
  ThermometerSun,
  Droplets,
  Sun,
  Waves,
  Fan,
  Lightbulb,
  Droplet,
} from "lucide-react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function SingleLineChart({ title, data, color, pointsCount = 7 }) {
  // Nhãn cho biểu đồ tuần
  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  // Nhãn cho biểu đồ tháng (4 tuần)
  const monthWeeks = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];

  const labels = pointsCount === 7 ? weekDays : monthWeeks;

  const chartData = labels.map((label, index) => ({
    name: label,
    Giá_trị:
      data && data.length >= pointsCount && data[index] != null
        ? parseFloat(data[index].toFixed(2))
        : null,
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full max-w-full h-[300px]">
      <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Giá_trị"
            stroke={color}
            connectNulls={false}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AdminDashboard() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [deviceData, setDeviceData] = useState({});
  const [devices, setDevices] = useState([]);
  const [controlValues, setControlValues] = useState({});
  const [staticsData, setStaticsData] = useState(null); // Dữ liệu biểu đồ tuần/tháng
  const lastToastTimeRef = useRef({});

  useEffect(() => {
    fetch("http://localhost:3001/control/get/areas")
      .then((res) => res.json())
      .then((data) => setAreas(data))
      .catch((err) => console.error("Lỗi khi lấy khu vực:", err));
  }, []);

  useEffect(() => {
    let intervalId;

    const fetchSensorData = () => {
      if (!selectedArea) return;

      fetch(`http://localhost:3001/record/get/${selectedArea}`)
        .then((res) => res.json())
        .then((data) => {
          setDeviceData(data);
          checkWarnings(data);
        })
        .catch((err) => console.error("Lỗi khi lấy dữ liệu thiết bị:", err));

      fetch(`http://localhost:3001/control/get/devices/${selectedArea}`)
        .then((res) => res.json())
        .then((data) => setDevices(data))
        .catch((err) => console.error("Lỗi khi lấy thiết bị:", err));

      fetch(`http://localhost:3001/record/statics?areaId=${selectedArea}`)
        .then((res) => res.json())
        .then((data) => setStaticsData(data))
        .catch((err) =>
          console.error("Lỗi khi lấy dữ liệu thống kê biểu đồ:", err)
        );
    };

    if (selectedArea) {
      fetchSensorData();
      intervalId = setInterval(fetchSensorData, 10000);
    }

    return () => clearInterval(intervalId);
  }, [selectedArea]);

  const checkWarnings = (data) => {
    const warnings = {
      temperature: data.temperatureWarning,
      humidity: data.humidityWarning,
      light: data.lightWarning,
      soilMoisture: data.soilMoistureWarning,
    };

    const now = Date.now();

    Object.entries(warnings).forEach(([key, isWarning]) => {
      if (isWarning) {
        const lastShown = lastToastTimeRef.current[key] || 0;
        if (now - lastShown >= 10000) {
          toast.error(`${key} vượt ngưỡng!`);
          lastToastTimeRef.current[key] = now;
        }
      }
    });
  };

  const handleInputChange = (feed, value) => {
    setControlValues((prevValues) => ({
      ...prevValues,
      [feed]: value,
    }));
  };

  const handleControl = (feed, value) => {
    fetch(`http://localhost:3001/staff/controlDevice/${feed}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => console.error("Lỗi khi gửi lệnh:", err));
  };

  // Trả về class đỏ nếu warning = true
  const getCardBgClass = (field) => {
    return deviceData[`${field}Warning`] ? "bg-red-200" : "bg-white";
  };

  return (
    <div className="p-6 space-y-6">
      <ToastContainer position="top-right" autoClose={5000} />

      <Typography variant="h4" color="blue-gray">
        Bảng điều khiển Admin
      </Typography>

      <div className="w-72">
        <Select
          label="Chọn khu vực"
          value={selectedArea}
          onChange={setSelectedArea}
          disabled={areas.length === 0}
        >
          {areas.map((area) => (
            <Option key={area._id} value={area._id}>
              {area.Name} - {area.Address}
            </Option>
          ))}
        </Select>
      </div>

      {selectedArea && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatisticsCard
              title="Nhiệt độ"
              className={getCardBgClass("temperature")}
              icon={<ThermometerSun className="text-yellow-500 w-6 h-6" />}
              value={`${deviceData.temperature ?? "-"} °C`}
            />
            <StatisticsCard
              title="Độ ẩm không khí"
              className={getCardBgClass("humidity")}
              icon={<Droplets className="text-yellow-500 w-6 h-6" />}
              value={`${deviceData.humidity ?? "-"} %`}
            />
            <StatisticsCard
              title="Ánh sáng"
              className={getCardBgClass("light")}
              icon={<Sun className="text-yellow-500 w-6 h-6" />}
              value={`${deviceData.light ?? "-"} lux`}
            />
            <StatisticsCard
              title="Độ ẩm đất"
              className={getCardBgClass("soilMoisture")}
              icon={<Waves className="text-yellow-500 w-6 h-6" />}
              value={`${deviceData.soilMoisture ?? "-"} %`}
            />
            <StatisticsCard
              title="Trạng thái quạt"
              icon={<Fan className="text-yellow-500 w-6 h-6" />}
              value={deviceData.fanStatus ?? "-"}
            />
            <StatisticsCard
              title="Trạng thái đèn LED"
              icon={<Lightbulb className="text-yellow-500 w-6 h-6" />}
              value={deviceData.ledStatus ?? "-"}
            />
            <StatisticsCard
              title="Trạng thái bơm"
              icon={<Droplet className="text-yellow-500 w-6 h-6" />}
              value={deviceData.pumpStatus ?? "-"}
            />
          </div>

          {/* Biểu đồ theo tuần */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {staticsData && (
              <>
                <SingleLineChart
                  title="Nhiệt độ (°C) - Theo tuần"
                  data={staticsData.temperature.weeklyAvg}
                  color="#8884d8"
                  pointsCount={7}
                />
                <SingleLineChart
                  title="Độ ẩm (%) - Theo tuần"
                  data={staticsData.humidity.weeklyAvg}
                  color="#82ca9d"
                  pointsCount={7}
                />
                <SingleLineChart
                  title="Ánh sáng (lux) - Theo tuần"
                  data={staticsData.light.weeklyAvg}
                  color="#ffc658"
                  pointsCount={7}
                />
              </>
            )}
          </div>

          {/* Biểu đồ theo tháng */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {staticsData && (
              <>
                <SingleLineChart
                  title="Nhiệt độ (°C) - Theo tháng"
                  data={staticsData.temperature.monthlyAvg}
                  color="#8884d8"
                  pointsCount={4}
                />
                <SingleLineChart
                  title="Độ ẩm (%) - Theo tháng"
                  data={staticsData.humidity.monthlyAvg}
                  color="#82ca9d"
                  pointsCount={4}
                />
                <SingleLineChart
                  title="Ánh sáng (lux) - Theo tháng"
                  data={staticsData.light.monthlyAvg}
                  color="#ffc658"
                  pointsCount={4}
                />
              </>
            )}
          </div>
        </>
      )}

      {selectedArea && devices.length > 0 && (
        <Card className="mt-6">
          <CardBody>
            <Typography variant="h5" color="blue-gray">
              Điều khiển thiết bị
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {devices.map((device) => {
                const { Description, Name, _id } = device;
                let icon, control;

                if (Description.includes("FAN")) {
                  icon = <Fan className="text-blue-500 w-6 h-6" />;
                  control = (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        label="Tốc độ (0 - 250)"
                        min={0}
                        max={250}
                        value={
                          controlValues[Description] !== undefined
                            ? controlValues[Description]
                            : ""
                        }
                        onChange={(e) =>
                          handleInputChange(Description, Number(e.target.value))
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() =>
                          handleControl(Description, controlValues[Description])
                        }
                      >
                        OK
                      </Button>
                    </div>
                  );
                } else if (Description.includes("RGB_LED")) {
                  icon = <Lightbulb className="text-yellow-500 w-6 h-6" />;
                  control = (
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={controlValues[Description] || "#000000"}
                        onChange={(e) =>
                          handleInputChange(Description, e.target.value)
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() =>
                          handleControl(Description, controlValues[Description])
                        }
                      >
                        OK
                      </Button>
                    </div>
                  );
                } else if (Description.includes("PUMP")) {
                  icon = <Droplet className="text-cyan-600 w-6 h-6" />;
                  control = (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleControl(Description, 1)}
                      >
                        Bật
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleControl(Description, 0)}
                      >
                        Tắt
                      </Button>
                    </div>
                  );
                } else {
                  return null;
                }

                return (
                  <Card key={_id} className="p-4 shadow-lg border rounded-2xl">
                    <div className="flex items-center gap-4 mb-3">
                      {icon}
                      <Typography variant="h6" color="blue-gray">
                        {Name}
                      </Typography>
                    </div>
                    {control}
                  </Card>
                );
              })}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default AdminDashboard;