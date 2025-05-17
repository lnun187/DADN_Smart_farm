import React from "react";
import { useState, useEffect } from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Textarea,
  Button,
} from "@material-tailwind/react";


const initialMessages = {
  gray: "Hệ thống đang bảo trì định kỳ từ 22h đến 4h sáng ngày mai.",
  green: "Cảm biến nhiệt độ hoạt động ổn định.",
  orange: "Nhiệt độ khu vực 3 đã vượt quá 35°C. Vui lòng kiểm tra lại.",
  red: "Không nhận tín hiệu từ cảm biến độ ẩm khu vực 2. Cần kiểm tra khẩn cấp.",
};

export function Notifications() {

  // const alerts = ["gray", "green", "orange", "red"]; 
  const saved = localStorage.getItem("authInfo");
  const userId = saved ? JSON.parse(saved).user.id : null;
  const [alertMessages, setAlertMessages] = useState([]);
  const [showAlerts, setShowAlerts] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://localhost:3001/staff/notification/${userId}`);
        const data = await res.json();
        console.log("📥 Notifications nhận được từ API:", data);
        const messages = [];
        const visibility = {};

        data.forEach((noti, index) => {
          const key = `${noti.level}-${index}`;
          messages.push({ key, message: noti.message, level: noti.level });
          visibility[key] = true;
        });

        setAlertMessages(messages);
        setShowAlerts(visibility);
      } catch (err) {
        console.error("Lỗi khi lấy notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  // const [showAlerts, setShowAlerts] = React.useState(() =>
  //   Object.fromEntries(alerts.map((color) => [color, true]))
  // );
  // const [alertMessages, setAlertMessages] = React.useState(initialMessages);
  // const [editMode, setEditMode] = React.useState(false);
  // const [editedMessage, setEditedMessage] = React.useState(alertMessages.gray);
  // const [newMessage, setNewMessage] = React.useState("");

  const handleClose = (color) => {
    setShowAlerts((prev) => ({ ...prev, [color]: false }));
  };

  const handleSave = () => {
    setAlertMessages((prev) => ({ ...prev, gray: editedMessage }));
    setEditMode(false);
  };

  const handleAddNote = () => {
    const newAlertKey = `note-${Date.now()}`;
    setAlertMessages((prev) => ({
      [newAlertKey]: newMessage, 
      ...prev, 
    }));
    setShowAlerts((prev) => ({ ...prev, [newAlertKey]: true }));
    setNewMessage(""); 
  };

  const getAlertColor = (level = "") => {
    if (level === "gray") return "gray";
    if (level === "green") return "green";
    if (level === "orange") return "amber";
    if (level === "red") return "red";
    if (level.startsWith("note")) return "blue-gray";
    return "gray";
  };
    
  const sortedAlertMessages = [...alertMessages];


  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4 flex items-center justify-between"
        >
          <Typography variant="h5" color="blue-gray">
            Cảnh báo từ hệ thống
          </Typography>
          <Button size="sm" variant="outlined" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Hủy" : "Chỉnh sửa"}
          </Button>
        </CardHeader>

        <CardBody className="flex flex-col gap-4 p-4">
          {sortedAlertMessages.map(({ key, message, level }) => (
            // <Alert
            //   key={key}
            //   open={showAlerts[key]}
            //   color={key.startsWith('note') ? "red" : "green"}  
            //   onClose={() => handleClose(key)}
            // >
            //   {message}
            // </Alert>
            <Alert
              key={key}
              open={showAlerts[key]}
              color={getAlertColor(level)}
              onClose={() => handleClose(key)}
            >
              {message}
            </Alert>
          ))}

          {editMode && (
            <div className="mt-4 space-y-2">
              <Typography variant="small" className="text-blue-gray-600">
                Chỉnh sửa cảnh báo bảo trì (gray):
              </Typography>
              <Textarea
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                rows={3}
              />
              <Button color="green" onClick={handleSave}>
                Lưu thay đổi
              </Button>
            </div>
          )}

          <div className="mt-4 space-y-2">
            <Typography variant="small" className="text-blue-gray-600">
              Thêm ghi chú mới:
            </Typography>
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={3}
            />
            <Button color="blue" onClick={handleAddNote}>
              Thêm ghi chú
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;
