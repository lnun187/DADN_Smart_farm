import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Select,
  Option,
  Textarea,
  IconButton, // Thêm IconButton
} from "@material-tailwind/react";
import { 
    BellAlertIcon, // Icon cho tab Yêu cầu
    ChatBubbleLeftRightIcon, // Icon cho tab Gửi Note
    CheckIcon, // Icon cho nút Duyệt
    XMarkIcon, // Icon cho nút Từ chối
    PaperAirplaneIcon // Icon cho nút Gửi
} from "@heroicons/react/24/solid"; 

// Import dữ liệu mẫu
import pendingRequestsData, { staffListForNotifications } from "@/data/admin-requests-data.js"; 

export function AdminNotificationCenter() {
  const [activeTab, setActiveTab] = useState("requests"); // State quản lý tab đang active
  const [requests, setRequests] = useState(pendingRequestsData); // State quản lý danh sách yêu cầu
  
  // State cho form Gửi Note
  const [recipient, setRecipient] = useState("all"); // Mặc định gửi cho tất cả
  const [noteMessage, setNoteMessage] = useState("");

  // --- Hàm xử lý phê duyệt/từ chối (Giả lập) ---
  const handleRequestAction = (requestId, action) => {
      // TODO: Gọi API duyệt/từ chối ở đây sau này
      console.log(`Action: ${action} on Request ID: ${requestId} - Logic API sẽ thêm sau`);
      // Giả lập xóa yêu cầu khỏi danh sách chờ duyệt
      setRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));
  };

  // --- Hàm xử lý gửi Note (Giả lập) ---
   const handleSendNote = (e) => {
       e.preventDefault(); // Ngăn form submit nếu dùng form tag
       // TODO: Gọi API gửi note ở đây sau này
       console.log(`Gửi note đến: ${recipient}, Nội dung: "${noteMessage}" - Logic API sẽ thêm sau`);
       // Reset form sau khi gửi (ví dụ)
       setRecipient("all");
       setNoteMessage("");
       alert("Đã gửi thông báo"); // Thông báo giả lập
   };


  // --- Dữ liệu cấu hình cho Tabs ---
  const tabData = [
    {
      label: "Yêu cầu cần duyệt",
      value: "requests",
      icon: BellAlertIcon,
      desc: `Xem và phê duyệt các yêu cầu từ nhân viên.`,
    },
    {
      label: "Gửi Thông báo / Note",
      value: "send-note",
      icon: ChatBubbleLeftRightIcon,
      desc: `Soạn và gửi tin nhắn đến nhân viên.`,
    },
    // { // Tab Lịch sử (Tùy chọn thêm sau)
    //   label: "Lịch sử Cảnh báo",
    //   value: "history",
    //   icon: ClockIcon, 
    //   desc: `Xem lại các cảnh báo hệ thống quan trọng.`,
    // },
  ];

  return (
    <div className="mt-12">
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <TabsHeader className="mb-4">
          {tabData.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {/* === Tab Panel: Yêu cầu cần duyệt === */}
          <TabPanel key="requests" value="requests">
             <Card>
               <CardBody>
                 <Typography variant="h6" color="blue-gray" className="mb-4">
                   Danh sách Yêu cầu đang chờ xử lý ({requests.length})
                 </Typography>
                 {requests.length > 0 ? (
                   <div className="space-y-4">
                     {requests.map((req) => (
                       <Card key={req.id} shadow={false} className="border border-blue-gray-100 p-4">
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            {/* Thông tin yêu cầu */}
                            <div className="flex-1">
                               <Typography variant="small" color="blue-gray" className="font-semibold">
                                  [{req.type}] - Từ: {req.requesterName || req.requester}
                               </Typography>
                               <Typography variant="small" color="blue-gray" className="font-normal mt-1">
                                 {req.details}
                               </Typography>
                               <Typography variant="small" color="gray" className="font-normal text-xs mt-1">
                                 {new Date(req.timestamp).toLocaleString('vi-VN')}
                               </Typography>
                            </div>
                            {/* Nút hành động */}
                            <div className="flex gap-2 mt-2 md:mt-0">
                               <Button 
                                  size="sm" 
                                  color="green" 
                                  variant="gradient" 
                                  className="flex items-center gap-1"
                                  onClick={() => handleRequestAction(req.id, 'approve')}
                                >
                                  <CheckIcon strokeWidth={3} className="h-3.5 w-3.5"/> Duyệt
                               </Button>
                               <Button 
                                  size="sm" 
                                  color="red" 
                                  variant="gradient" 
                                  className="flex items-center gap-1"
                                  onClick={() => handleRequestAction(req.id, 'reject')}
                                >
                                 <XMarkIcon strokeWidth={3} className="h-3.5 w-3.5"/> Từ chối
                               </Button>
                            </div>
                         </div>
                       </Card>
                     ))}
                   </div>
                 ) : (
                    <Typography color="blue-gray" className="text-center">Không có yêu cầu nào đang chờ xử lý.</Typography>
                 )}
               </CardBody>
             </Card>
          </TabPanel>

          {/* === Tab Panel: Gửi Thông báo / Note === */}
           <TabPanel key="send-note" value="send-note">
             <Card>
                <CardHeader variant="gradient" color="blue" className="mb-4 p-6">
                   <Typography variant="h6" color="white">Soạn Thông báo / Ghi chú</Typography>
                </CardHeader>
                <CardBody>
                   {/* Sử dụng form để bao bọc khi submit bằng Enter */}
                   <form onSubmit={handleSendNote} className="flex flex-col gap-6">
                      <Select 
                         label="Gửi đến" 
                         value={recipient} 
                         onChange={(value) => setRecipient(value)}
                         animate={{mount: { y: 0 }, unmount: { y: 25 }}}
                        >
                         {staffListForNotifications.map(staff => (
                            <Option key={staff.value} value={staff.value}>{staff.label}</Option>
                         ))}
                      </Select>
                      
                      <Textarea 
                         label="Nội dung tin nhắn" 
                         rows={6} 
                         value={noteMessage} 
                         onChange={(e) => setNoteMessage(e.target.value)} 
                         required // Yêu cầu nhập nội dung
                        />
                      
                       <Button 
                          type="submit" // Để kích hoạt onSubmit của form
                          color="blue" 
                          className="flex items-center justify-center gap-2" 
                          disabled={!noteMessage.trim()} // Vô hiệu hóa nếu chưa nhập nội dung
                        >
                          <PaperAirplaneIcon className="h-4 w-4"/> Gửi đi
                       </Button>
                   </form>
                </CardBody>
             </Card>
          </TabPanel>

          {/* === Tab Panel: Lịch sử Cảnh báo (Ví dụ) === */}
          {/* <TabPanel key="history" value="history">
             <Card>
                <CardBody>
                   <Typography variant="h6" color="blue-gray" className="mb-4">Lịch sử Cảnh báo Hệ thống</Typography>
                   <Typography>Nội dung lịch sử cảnh báo sẽ hiển thị ở đây...</Typography>
                   // Có thể dùng lại component bảng hoặc danh sách Alert như trang Notifications
                </CardBody>
             </Card>
          </TabPanel> */}

        </TabsBody>
      </Tabs>
    </div>
  );
}

export default AdminNotificationCenter;