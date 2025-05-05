import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

const alerts = ["gray", "green", "orange", "red"];

const alertMessages = {
  gray: "Hệ thống đang bảo trì định kỳ từ 22h đến 4h sáng ngày mai.",
  green: "Cảm biến nhiệt độ hoạt động ổn định.",
  orange: "Nhiệt độ khu vực 3 đã vượt quá 35°C. Vui lòng kiểm tra lại.",
  red: "Không nhận tín hiệu từ cảm biến độ ẩm khu vực 2. Cần kiểm tra khẩn cấp.",
};

export function Notifications() {
  const [showAlerts, setShowAlerts] = React.useState(() =>
    Object.fromEntries(alerts.map((color) => [color, true]))
  );

  const handleClose = (color) => {
    setShowAlerts((prev) => ({ ...prev, [color]: false }));
  };

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Cảnh báo từ hệ thống
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          {alerts.map((color) => (
            <Alert
              key={color}
              open={showAlerts[color]}
              color={color}
              onClose={() => handleClose(color)}
            >
              {alertMessages[color]}
            </Alert>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;
