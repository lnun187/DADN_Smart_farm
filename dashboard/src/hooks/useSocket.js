import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@/context/AuthContext";

export function useSocket(serverUrl) {
  const socketRef = useRef(null);
  const { user } = useAuth();  // Giả sử user.id là Staff_id hoặc Manager_id
  console.log("user", user);

  useEffect(() => {
    // Kiểm tra nếu user chưa đăng nhập thì không kết nối socket
    if (!user) return;

    socketRef.current = io(serverUrl);
    
    socketRef.current.on("connect", () => {
      console.log('Socket connected:', socketRef.current.id);
      // Đăng ký ngay userId với server
      socketRef.current.emit("authenticate", user); 
    });

    // Lắng nghe sự kiện "new-schedule" khi socket kết nối thành công
    socketRef.current.on("new-schedule", (data) => {
      console.log("Lịch tưới mới:", data);
      alert(`Lịch tưới mới được thêm! Lịch: ${data.schedule._id} - Thời gian: ${data.schedule.Time}`);
    });

    socketRef.current.on("changed-status", (data) => {
      console.log("Đã thay đổi status:", data);
      if (data == "approved") {alert(`Quản lí đã duyệt lịch tưới của bạn`);}
      else if (data == "rejected"){alert ('Quản lí đã từ chối lịch tưới của bạn');}
    });


    socketRef.current.on("new-note", ({ message }) => {
      alert(`Ối dồi ôi, có thông báo mới!`);
    });

    // Cleanup khi component unmount hoặc socket bị ngắt kết nối
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [serverUrl, user]);  // Hook phụ thuộc vào serverUrl và user

  return socketRef.current;
}
