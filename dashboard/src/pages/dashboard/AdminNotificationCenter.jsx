import React, { useState, useEffect, useMemo } from "react"; 
import {
  Tabs, TabsHeader, TabsBody, Tab, TabPanel, Card, CardBody, CardHeader,
  Typography, Button, Select, Option, Textarea, IconButton,
} from "@material-tailwind/react";
import { 
    BellAlertIcon, ChatBubbleLeftRightIcon, CheckIcon, 
    XMarkIcon, PaperAirplaneIcon 
} from "@heroicons/react/24/solid"; 


import { useMaterialTailwindController } from "@/context";

import { pendingRequestsData as allPendingRequestsData, staffListForNotifications as allStaffForNotifications } from "@/data/admin-requests-data.js"; 
import { zoneData } from "@/data/zone-management-data.js"; 

export function AdminNotificationCenter() {
  // === LẤY selectedRegion TỪ CONTEXT ===
  const [controller] = useMaterialTailwindController();
  const { selectedRegion } = controller;

  const [activeTab, setActiveTab] = useState("requests"); 
  const [displayedRequests, setDisplayedRequests] = useState([]); 
  const [recipient, setRecipient] = useState("all"); 
  const [noteMessage, setNoteMessage] = useState("");

  // === LỌC DANH SÁCH NHÂN VIÊN CHO DROPDOWN GỬI NOTE ===
  const filteredStaffListForNotifications = useMemo(() => {
    if (!selectedRegion || selectedRegion === "all") {
      return allStaffForNotifications; 
    }

    const staffInZone = allStaffForNotifications.filter(
      staff => staff.value === "all" || staff.zoneId === selectedRegion
    );

    return staffInZone;
  }, [selectedRegion, allStaffForNotifications]);

  // Reset recipient nếu nó không còn trong danh sách mới
  useEffect(() => {
      if (!filteredStaffListForNotifications.find(staff => staff.value === recipient)) {
          setRecipient("all"); 
      }
  }, [filteredStaffListForNotifications, recipient]);


  // === useEffect ĐỂ LỌC YÊU CẦU KHI selectedRegion THAY ĐỔI ===
  useEffect(() => {
    let filteredRequests = allPendingRequestsData.filter(r => r.status === 'pending');
    if (selectedRegion && selectedRegion !== "all") {
      filteredRequests = filteredRequests.filter(req => req.zoneId === selectedRegion);
    }
    setDisplayedRequests(filteredRequests);
  }, [selectedRegion]); 

  // === HÀM XỬ LÝ ===
    const handleRequestAction = (requestId, action) => { console.log(`Action: ${action} on Request ID: ${requestId}`); const originalRequestIndex = allPendingRequestsData.findIndex(req => req.id === requestId); if (originalRequestIndex !== -1) { allPendingRequestsData.splice(originalRequestIndex, 1); } setDisplayedRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));};
    const handleSendNote = (e) => { e.preventDefault(); console.log(`Gửi note đến: ${recipient}, Nội dung: "${noteMessage}"`); setRecipient("all"); setNoteMessage(""); alert("Đã gửi thông báo/note! (Giả lập)"); };


  // --- Dữ liệu cấu hình cho Tabs --- 
    const tabData = [ { label: "Yêu cầu cần duyệt", value: "requests", icon: BellAlertIcon }, { label: "Gửi Thông báo / Note", value: "send-note", icon: ChatBubbleLeftRightIcon }];

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
          {/* === Tab Panel: Yêu cầu cần duyệt (SỬ DỤNG displayedRequests) === */}
          <TabPanel key="requests" value="requests">
             <Card><CardBody><Typography variant="h6" color="blue-gray" className="mb-4">Danh sách Yêu cầu {selectedRegion && selectedRegion !== "all" ? `(${zoneData.find(z => z.id === selectedRegion)?.name || selectedRegion})` : ""} ({displayedRequests.length})</Typography>{displayedRequests.length > 0 ? (<div className="space-y-4">{displayedRequests.map((req) => (<Card key={req.id} shadow={false} className="border border-blue-gray-100 p-4"><div className="flex flex-col md:flex-row md:items-center justify-between gap-2"><div className="flex-1"><Typography variant="small" color="blue-gray" className="font-semibold">[{req.type}] - Từ: {req.requesterName || req.requester}{(selectedRegion === "all" || !selectedRegion) && req.zoneId && (<span className="text-xs text-gray-600 ml-2">(KV: {zoneData.find(z => z.id === req.zoneId)?.name || req.zoneId})</span>)}</Typography><Typography variant="small" color="blue-gray" className="font-normal mt-1">{req.details}</Typography><Typography variant="small" color="gray" className="font-normal text-xs mt-1">{new Date(req.timestamp).toLocaleString('vi-VN')}</Typography></div><div className="flex gap-2 mt-2 md:mt-0"><Button size="sm" color="green" variant="gradient" className="flex items-center gap-1" onClick={() => handleRequestAction(req.id, 'approve')}><CheckIcon strokeWidth={3} className="h-3.5 w-3.5"/> Duyệt</Button><Button size="sm" color="red" variant="gradient" className="flex items-center gap-1" onClick={() => handleRequestAction(req.id, 'reject')}><XMarkIcon strokeWidth={3} className="h-3.5 w-3.5"/> Từ chối</Button></div></div></Card>))}</div>) : (<Typography color="blue-gray" className="text-center">Không có yêu cầu nào {selectedRegion && selectedRegion !== "all" ? `cho ${zoneData.find(z => z.id === selectedRegion)?.name || 'khu vực này'}` : ""}.</Typography>)}</CardBody></Card>
          </TabPanel>

          {/* === Tab Panel: Gửi Thông báo / Note (SỬ DỤNG filteredStaffListForNotifications) === */}
           <TabPanel key="send-note" value="send-note">
             <Card>
                <CardHeader variant="gradient" color="blue" className="mb-4 p-6">
                   <Typography variant="h6" color="white">Soạn Thông báo / Ghi chú {selectedRegion && selectedRegion !== "all" ? ` (cho Khu vực: ${zoneData.find(z => z.id === selectedRegion)?.name || selectedRegion})` : ""}</Typography>
                </CardHeader>
                <CardBody>
                   <form onSubmit={handleSendNote} className="flex flex-col gap-6">
                      <Select 
                         label="Gửi đến" 
                         value={recipient} 
                         onChange={(value) => setRecipient(value)}
                         animate={{mount: { y: 0 }, unmount: { y: 25 }}}
                        >
                         {/* --- SỬ DỤNG DANH SÁCH ĐÃ LỌC --- */}
                         {filteredStaffListForNotifications.map(staff => (
                            <Option key={staff.value} value={staff.value}>{staff.label}</Option>
                         ))}
                      </Select>
                      
                      <Textarea label="Nội dung tin nhắn" rows={6} value={noteMessage} onChange={(e) => setNoteMessage(e.target.value)} required />
                      <Button type="submit" color="blue" className="flex items-center justify-center gap-2" disabled={!noteMessage.trim() || !recipient}><PaperAirplaneIcon className="h-4 w-4"/> Gửi đi</Button>
                   </form>
                </CardBody>
             </Card>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default AdminNotificationCenter;