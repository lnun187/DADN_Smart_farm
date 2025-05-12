import React, { useState, useEffect } from "react";
import {
  Typography, Card, CardHeader, CardBody, IconButton, Tooltip, Button, Chip,
  Dialog, DialogHeader, DialogBody, DialogFooter, Input, Switch,
} from "@material-tailwind/react";
import { 
    ClockIcon, UsersIcon, CogIcon, MapIcon, BellAlertIcon,
    ExclamationTriangleIcon, XMarkIcon, CheckIcon as ApproveIcon,

} from "@heroicons/react/24/solid"; 
import { useNavigate } from "react-router-dom";

// Import widgets
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";

// Import context
import { useMaterialTailwindController } from "@/context";

// Import data mẫu
import { deviceData as allDeviceData } from "@/data/device-management-data.js";
import { staffData as allStaffData } from "@/data/staff-management-data.js";
import { zoneData } from "@/data/zone-management-data.js";
import { pendingRequestsData as allPendingRequestsDataFromDataFile } from "@/data/admin-requests-data.js";
import { 
    statisticsCardsData as allControlDeviceCardsDataGlobal,
    statisticsChartsData as allHumidityCharts,
    statisticsTempData as allTempCharts,
    statisticsLuxData as allLuxCharts 
} from "@/data"; 

export function AdminDashboard() {
  const [controller] = useMaterialTailwindController();
  const { selectedRegion } = controller; 
  const navigate = useNavigate();

  const [kpiAdminData, setKpiAdminData] = useState({
    zoneName: "Tất cả Khu vực", totalDevices: 0, onlineDevices: 0, errorDevicesCount: 0,
    activeStaff: 0, totalStaff: 0, pendingRequestsCount: 0,
  });
  const [currentErrorDevicesList, setCurrentErrorDevicesList] = useState([]);
  const [currentPendingRequestsList, setCurrentPendingRequestsList] = useState([]);
  const [environmentChartsToDisplay, setEnvironmentChartsToDisplay] = useState([]);
  const [currentZoneNameForDisplay, setCurrentZoneNameForDisplay] = useState("Tất cả Khu vực");

  const [openPowerDialog, setOpenPowerDialog] = useState(false); 
  const [openLightDialog, setOpenLightDialog] = useState(false); 
  const [openPumpDialog, setOpenPumpDialog] = useState(false);   
  const [fanAutoMode, setFanAutoMode] = useState(false); 
  const [fanPower, setFanPower] = useState(50);
  const [lightLevel, setLightLevel] = useState(70); 
  const [lightColor, setLightColor] = useState("#ffffff"); 
  const [pumpAutoMode, setPumpAutoMode] = useState(false); 
  const [pumpPower, setPumpPower] = useState(60);
  const [fanMode, setFanMode] = useState(true); 

  // State để quản lý bản sao của allPendingRequestsDataFromDataFile
  const [internalAllPendingRequests, setInternalAllPendingRequests] = useState([...allPendingRequestsDataFromDataFile]);

  useEffect(() => {
    let relevantDeviceData = allDeviceData;
    let relevantStaffData = allStaffData; 
    let pendingRelevantRequests = internalAllPendingRequests.filter(r => r.status === 'pending');
    let zoneNameToDisplay = "Tất cả Khu vực";
    
    const targetZone = zoneData.find(z => z.id === selectedRegion);
    if (targetZone) { zoneNameToDisplay = targetZone.name; } 
    else if (selectedRegion !== "all" && selectedRegion) { zoneNameToDisplay = `Khu vực ID: ${selectedRegion}`; }
    setCurrentZoneNameForDisplay(zoneNameToDisplay);

    if (selectedRegion && selectedRegion !== "all") {
      relevantDeviceData = allDeviceData.filter(d => d.zoneId === selectedRegion);
      relevantStaffData = allStaffData.filter(s => s.zoneId === selectedRegion || !s.zoneId); 
      pendingRelevantRequests = pendingRelevantRequests.filter(r => r.zoneId === selectedRegion);
    }
    
    setKpiAdminData({
        zoneName: zoneNameToDisplay,
        totalDevices: relevantDeviceData.length,
        onlineDevices: relevantDeviceData.filter(d => d.status?.toLowerCase() === 'online').length,
        errorDevicesCount: relevantDeviceData.filter(d => d.status?.toLowerCase() === 'error').length,
        activeStaff: relevantStaffData.filter(s => s.status === 'active').length,
        totalStaff: relevantStaffData.length,
        pendingRequestsCount: pendingRelevantRequests.length,
    });

    setCurrentErrorDevicesList(relevantDeviceData.filter(d => d.status?.toLowerCase() === 'error'));
    setCurrentPendingRequestsList(pendingRelevantRequests.slice(0, 3)); 

    const combinedCharts = [];
    const chartTitleSuffix = zoneNameToDisplay === "Tất cả Khu vực" ? "(Tổng hợp)" : `(${zoneNameToDisplay})`;
    const updateTitles = (charts, suffix) => charts.map(chart => ({ ...chart, title: `${chart.title.replace(/ \([\s\S]*?\)$/g, '')} ${suffix}` }));
    if (allHumidityCharts) combinedCharts.push(...updateTitles(allHumidityCharts, chartTitleSuffix));
    if (allTempCharts) combinedCharts.push(...updateTitles(allTempCharts, chartTitleSuffix));
    if (allLuxCharts) combinedCharts.push(...updateTitles(allLuxCharts, chartTitleSuffix));
    setEnvironmentChartsToDisplay(combinedCharts);

  }, [selectedRegion, internalAllPendingRequests]); 


   const handleRequestAction = (requestId, action) => {
      setInternalAllPendingRequests(prev => prev.filter(req => req.id !== requestId));
      // useEffect sẽ tự động cập nhật kpiData và currentPendingRequestsList
      console.log(`AdminDashboard Action: ${action} on Request ID: ${requestId} - Giả lập đã xử lý và xóa khỏi danh sách gốc.`);
   };

  const handleControlCardClick = (title) => {
    console.log(`Control card clicked: ${title} for region: ${currentZoneNameForDisplay}`);
    if (title === "Công suất Quạt" || title.toLowerCase().includes("quạt")) { setOpenPowerDialog(true); } 
    else if (title === "Điều chỉnh Ánh sáng" || title.toLowerCase().includes("ánh sáng")) { setOpenLightDialog(true); } 
    else if (title === "Điều chỉnh Bơm nước" || title.toLowerCase().includes("bơm nước")) { setOpenPumpDialog(true); }
  };

  const adminKpiCardsToDisplay = [
      { color: "blue", icon: MapIcon, title: "Đang xem", value: kpiAdminData.zoneName, footer: { label: kpiAdminData.zoneName === "Tất cả Khu vực" ? `Tổng: ${zoneData.length} khu vực` : " " },},
      { color: "green", icon: CogIcon, title: "Thiết bị Online", value: `${kpiAdminData.onlineDevices} / ${kpiAdminData.totalDevices}`, footer: { label: kpiAdminData.errorDevicesCount > 0 ? `${kpiAdminData.errorDevicesCount} thiết bị lỗi` : "Hoạt động tốt", color: kpiAdminData.errorDevicesCount > 0 ? "text-red-500" : "text-green-500" }, },
      { color: "orange", icon: UsersIcon, title: "Nhân viên HĐ", value: `${kpiAdminData.activeStaff} / ${kpiAdminData.totalStaff}`, footer: { label: `${kpiAdminData.totalStaff - kpiAdminData.activeStaff} bị khóa` },}, 
      { color: "red", icon: BellAlertIcon, title: "Yêu cầu duyệt", value: kpiAdminData.pendingRequestsCount, footer: { label: "Cần xử lý" },},
  ];

  const TABLE_HEAD_ERRORS = ["Tên Thiết bị Lỗi", "ID"]; 
  const TABLE_HEAD_REQUESTS = ["Loại Yêu cầu", "Người gửi", "Chi tiết", "Hành động"];

  return (
    <div className="mt-12">
      {/* === HÀNG THẺ THỐNG KÊ KPI CỦA ADMIN === */}
      <Typography variant="h5" color="blue-gray" className="mb-4 ml-1">Tổng quan Hệ thống</Typography>
      <div className="mb-12 grid gap-y-6 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {adminKpiCardsToDisplay.map(({ icon, title, footer, value, color }) => (
          <StatisticsCard key={title} color={color} icon={React.createElement(icon, { className: "w-6 h-6 text-white",})} title={<Typography variant="small" color="blue-gray" className="font-medium uppercase">{title}</Typography>} value={<Typography variant="h4" color="blue-gray">{value}</Typography>} footer={footer && (<Typography className="font-normal text-blue-gray-600">{footer.value && <strong className={footer.color || 'text-green-500'}>{footer.value}</strong>}&nbsp;{footer.label}</Typography>)} />
        ))}
      </div>

      {/* === HÀNG CÁC THẺ ĐIỀU KHIỂN THIẾT BỊ === */}
      <Typography variant="h5" color="blue-gray" className="mb-4 ml-1 mt-10">
        Điều khiển Nhanh Thiết bị {currentZoneNameForDisplay !== "Tất cả Khu vực" ? `(${currentZoneNameForDisplay})` : "(Toàn hệ thống)"}
      </Typography>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {/* SỬ DỤNG allControlDeviceCardsDataGlobal TRỰC TIẾP */}
        {allControlDeviceCardsDataGlobal.map(({ icon, title, footer, value: initialValue, ...rest }) => {
          let dynamicValue = initialValue; 
          if (title === "Chế độ quay Quạt") { dynamicValue = fanMode ? "ON" : "OFF"; } 
          else if (title === "Công suất Quạt") { dynamicValue = fanAutoMode ? "Tự động" : `${fanPower}%`; } 
          else if (title === "Điều chỉnh Ánh sáng") { dynamicValue = `${lightLevel}%`;  } 
          else if (title === "Điều chỉnh Bơm nước") { dynamicValue = pumpAutoMode ? "Tự động" : `${pumpPower}%`; } 
          
          const isClickable = ["Công suất Quạt", "Điều chỉnh Ánh sáng", "Điều chỉnh Bơm nước", "Chế độ quay Quạt"].includes(title);

          return (
            <div key={title} onClick={isClickable ? () => handleControlCardClick(title) : undefined} className={isClickable ? "cursor-pointer" : ""}>
              <StatisticsCard {...rest} title={title} value={dynamicValue} icon={React.createElement(icon, { className: "w-6 h-6 text-white" })} footer={<Typography className="font-normal text-blue-gray-600">{footer.value && <strong className={footer.color || "text-green-500"}>{footer.value}</strong>}&nbsp;{footer.label}</Typography>}/>
            </div>
          );
        })}
      </div>

      {/* === HÀNG BIỂU ĐỒ MÔI TRƯỜNG === */}
      <Typography variant="h5" color="blue-gray" className="mb-4 ml-1 mt-10">
        Biểu đồ Xu hướng Môi trường {currentZoneNameForDisplay !== "Tất cả Khu vực" ? `(${currentZoneNameForDisplay})` : ""}
      </Typography>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3"> 
        {environmentChartsToDisplay.map((props, index) => ( 
          <StatisticsChart key={`${props.title}-${index}-${selectedRegion}`} {...props} footer={<Typography variant="small" className="flex items-center font-normal text-blue-gray-600"><ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />&nbsp;{props.footer || "dữ liệu gần đây"}</Typography>}/>
        ))}
      </div>

      {/* === HÀNG BẢNG THIẾT BỊ LỖI VÀ YÊU CẦU CHỜ DUYỆT === */}
      <div className="mb-4 grid grid-cols-1 gap-y-12 gap-x-6 xl:grid-cols-2">
        <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader variant="gradient" color="red" className="mb-4 p-4"><Typography variant="h6" color="white">Thiết bị đang gặp lỗi ({currentErrorDevicesList.length})</Typography></CardHeader>
            <CardBody className="overflow-x-auto px-0 pt-0 pb-2 max-h-72"><table className="w-full min-w-[300px] table-auto"><thead><tr>{TABLE_HEAD_ERRORS.map(head => <th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography></th>)}</tr></thead><tbody>{currentErrorDevicesList.length > 0 ? currentErrorDevicesList.map(({ id, name }, key) => { const className = `py-3 px-5 ${key === currentErrorDevicesList.length - 1 ? "" : "border-b border-blue-gray-50"}`; return ( <tr key={id}><td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{name}</Typography></td><td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{id}</Typography></td></tr> ); }) : (<tr><td colSpan={TABLE_HEAD_ERRORS.length} className="py-3 px-5 text-center text-blue-gray-500">Không có thiết bị nào đang lỗi {currentZoneNameForDisplay !== "Tất cả Khu vực" ? `trong ${currentZoneNameForDisplay}` : ""}.</td></tr>)}</tbody></table></CardBody></Card>
        <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader variant="gradient" color="orange" className="mb-4 p-4"><Typography variant="h6" color="white">Yêu cầu chờ duyệt ({kpiAdminData.pendingRequestsCount})</Typography></CardHeader>{/* SỬA Ở ĐÂY */}
            <CardBody className="overflow-x-auto px-0 pt-0 pb-2 max-h-72">
                <table className="w-full min-w-[440px] table-auto">
                    <thead><tr>{TABLE_HEAD_REQUESTS.map(head => <th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography></th>)}</tr></thead>
                    <tbody>
                       {currentPendingRequestsList.length > 0 ? currentPendingRequestsList.map((req, key) => { const className = `py-3 px-5 ${key === currentPendingRequestsList.length - 1 ? "" : "border-b border-blue-gray-50"}`; return ( <tr key={req.id}><td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{req.type}</Typography></td><td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{req.requesterName || req.requester}</Typography></td><td className={className}><Typography className="text-xs font-normal text-blue-gray-500 max-w-[150px] truncate" title={req.details}>{req.details}</Typography></td><td className={`${className} flex gap-1`}><Tooltip content="Duyệt"><IconButton variant="text" color="green" size="sm" onClick={() => handleRequestAction(req.id, 'approve')}><ApproveIcon className="h-4 w-4"/></IconButton></Tooltip><Tooltip content="Từ chối"><IconButton variant="text" color="red" size="sm" onClick={() => handleRequestAction(req.id, 'reject')}><XMarkIcon className="h-4 w-4"/></IconButton></Tooltip></td></tr> ); }) : (<tr><td colSpan={TABLE_HEAD_REQUESTS.length} className="py-3 px-5 text-center text-blue-gray-500">Không có yêu cầu nào {currentZoneNameForDisplay !== "Tất cả Khu vực" ? `cho ${currentZoneNameForDisplay}` : ""}.</td></tr>)}
                    </tbody>
                </table>
                {/* SỬA ĐIỀU KIỆN VÀ ONCLICK CHO NÚT NÀY */}
                {(kpiAdminData.pendingRequestsCount > 0 && kpiAdminData.pendingRequestsCount > currentPendingRequestsList.length) && ( 
                      <div className="p-4 text-center">
                           <Button 
                             size="sm" 
                             variant="text" 
                             onClick={() => navigate('/dashboard/admin-notifications', { state: { activeTab: 'requests' }})}
                            >
                                Xem tất cả ({kpiAdminData.pendingRequestsCount}) yêu cầu
                            </Button>
                       </div>
                  )}
            </CardBody>
        </Card>
      </div>

      {/* === DIALOGS ĐIỀU KHIỂN THIẾT BỊ === */}
      <Dialog open={openPowerDialog} handler={() => setOpenPowerDialog(false)}><DialogHeader>Điều chỉnh công suất quạt {currentZoneNameForDisplay !== "Tất cả Khu vực" ? `(${currentZoneNameForDisplay})` : ""}</DialogHeader><DialogBody divider className="space-y-4"><div className="flex items-center justify-between"><Typography variant="small">Chế độ tự động:</Typography><Switch checked={fanAutoMode} onChange={() => setFanAutoMode(!fanAutoMode)} color="green" label={fanAutoMode ? "Bật" : "Tắt"}/></div>{!fanAutoMode && (<><Typography variant="small">Công suất: <span className="font-bold">{fanPower}%</span></Typography><Input type="range" min="0" max="100" value={fanPower} onChange={(e) => setFanPower(Number(e.target.value))} className="w-full accent-green-500"/></>)}</DialogBody><DialogFooter><Button variant="text" color="red" onClick={() => setOpenPowerDialog(false)}>Đóng</Button></DialogFooter></Dialog>
      <Dialog open={openPumpDialog} handler={() => setOpenPumpDialog(false)}><DialogHeader>Điều chỉnh công suất bơm nước {currentZoneNameForDisplay !== "Tất cả Khu vực" ? `(${currentZoneNameForDisplay})` : ""}</DialogHeader><DialogBody divider className="space-y-4"><div className="flex items-center justify-between"><Typography variant="small">Chế độ tự động:</Typography><Switch checked={pumpAutoMode} onChange={() => setPumpAutoMode(!pumpAutoMode)} color="blue" label={pumpAutoMode ? "Bật" : "Tắt"}/></div>{!pumpAutoMode && (<><Typography variant="small">Công suất: <span className="font-bold">{pumpPower}%</span></Typography><Input type="range" min="0" max="100" value={pumpPower} onChange={(e) => setPumpPower(Number(e.target.value))} className="w-full accent-blue-500"/></>)}</DialogBody><DialogFooter><Button variant="text" color="red" onClick={() => setOpenPumpDialog(false)}>Đóng</Button></DialogFooter></Dialog>
      <Dialog open={openLightDialog} handler={() => setOpenLightDialog(false)}><DialogHeader>Điều chỉnh ánh sáng {currentZoneNameForDisplay !== "Tất cả Khu vực" ? `(${currentZoneNameForDisplay})` : ""}</DialogHeader><DialogBody divider className="space-y-6"><div><Typography variant="small">Độ sáng: <span className="font-bold">{lightLevel}%</span></Typography><Input type="range" min="0" max="100" value={lightLevel} onChange={(e) => setLightLevel(Number(e.target.value))} className="w-full accent-yellow-500"/></div><div><Typography variant="small">Màu ánh sáng:</Typography><Input type="color" value={lightColor} onChange={(e) => setLightColor(e.target.value)} className="w-16 h-10 p-0 border-2 border-gray-300 rounded"/></div></DialogBody><DialogFooter><Button variant="text" color="red" onClick={() => setOpenLightDialog(false)}>Đóng</Button></DialogFooter></Dialog>
    </div>
  );
}

export default AdminDashboard;