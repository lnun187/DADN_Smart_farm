import React, { useState, useEffect } from "react"; 
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option, 
  Alert, 
} from "@material-tailwind/react";
import {
  PencilIcon, 
  TrashIcon,  
  PlusIcon,   
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
} from "@heroicons/react/24/solid";

// Import context để lấy selectedRegion
import { useMaterialTailwindController } from "@/context";
// Import data mẫu
import { deviceData as allDeviceData } from "@/data/device-management-data.js"; 
import { zoneData } from "@/data/zone-management-data.js"; // Để lấy tên khu vực cho Select

export function DeviceManagement() {
  // === LẤY selectedRegion TỪ CONTEXT ===
  const [controller] = useMaterialTailwindController();
  const { selectedRegion } = controller; 

  // === STATE QUẢN LÝ ===
  // currentDeviceList giờ sẽ được cập nhật bởi useEffect dựa trên selectedRegion
  const [currentDeviceList, setCurrentDeviceList] = useState(allDeviceData); 
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState(null); 
  const [editFormData, setEditFormData] = useState({ name: '', type: '', location: '', id: '', status: '' }); 
  const [addDeviceForm, setAddDeviceForm] = useState({ name: "", id: "", type: "Sensor", location: "", status: "Online" });
  const [alertInfo, setAlertInfo] = useState({ open: false, color: 'green', message: '' });

  // === useEffect ĐỂ LỌC LẠI DANH SÁCH THIẾT BỊ KHI selectedRegion THAY ĐỔI ===
  useEffect(() => {
    console.log("DeviceManagement - Selected Region changed:", selectedRegion);
    if (selectedRegion === "all" || !selectedRegion) {
      setCurrentDeviceList(allDeviceData); 
    } else {
      // Lọc thiết bị theo zoneId 
      setCurrentDeviceList(allDeviceData.filter(device => device.zoneId === selectedRegion));
    }
  }, [selectedRegion]); // Chạy lại khi selectedRegion thay đổi


  // === HÀM TIỆN ÍCH CHO ALERT 
    const showAlert = (message, color = 'green') => { setAlertInfo({ open: true, color, message }); setTimeout(() => { setAlertInfo(prev => ({ ...prev, open: false })); }, 3000); };
    const hideAlert = () => { if (alertInfo.open) { setAlertInfo(prev => ({ ...prev, open: false })); }};

  // === HÀM XỬ LÝ DIALOGS ===

  // --- Dialog Thêm ---
  const handleOpenAddDialog = () => { 
      hideAlert(); 
      // Nếu một khu vực cụ thể đang được chọn trên Navbar, điền sẵn vào form
      const initialLocation = (selectedRegion && selectedRegion !== "all") 
          ? zoneData.find(z => z.id === selectedRegion)?.name || "" // Lấy tên khu vực từ zoneData
          : "";
      setAddDeviceForm({ name: "", id: "", type: "Sensor", location: initialLocation, status: "Online"});
      setOpenAddDialog(true); 
      setOpenEditDialog(false); setOpenDeleteDialog(false);
  };
  const handleCloseAddDialog = () => setOpenAddDialog(false);

    const handleAddDeviceFormChange = (e) => { const { name, value } = e.target; setAddDeviceForm(prev => ({ ...prev, [name]: value })); };
    const handleAddDeviceSelectChange = (fieldName, value) => { setAddDeviceForm(prev => ({ ...prev, [fieldName]: value })); };

  const handleAddNewDevice = () => {
    if (!addDeviceForm.name || !addDeviceForm.id || !addDeviceForm.type || !addDeviceForm.location ) {
        showAlert("Vui lòng điền đầy đủ thông tin và chọn Khu vực.", "red");
        return;
    }
    console.log("Thêm thiết bị mới:", addDeviceForm);
    // Tìm zoneId dựa trên addDeviceForm.location (tên khu vực)
    const selectedZoneObject = zoneData.find(zone => zone.name === addDeviceForm.location);
    const newDevice = {
        ...addDeviceForm,
        zoneId: selectedZoneObject ? selectedZoneObject.id : null, // Quan trọng: Gán zoneId
        addedDate: new Date().toISOString().split('T')[0] 
    };
    // Cập nhật vào allDeviceData (để giả lập lưu trữ toàn cục)
    allDeviceData.unshift(newDevice); // Thêm vào đầu mảng gốc
    // Cập nhật currentDeviceList dựa trên selectedRegion hiện tại
    if (selectedRegion === "all" || selectedRegion === newDevice.zoneId) {
        setCurrentDeviceList(prevList => [newDevice, ...prevList]); 
    } else {
         // Nếu đang xem khu vực khác, chỉ cần báo thành công, danh sách không đổi
    }
    showAlert(`Đã thêm thiết bị "${addDeviceForm.name}" thành công!`); 
    handleCloseAddDialog(); 
  };

  // --- Dialog Xóa --- (Cập nhật để lọc lại list sau khi xóa)
    const handleOpenDeleteDialog = (device) => { hideAlert(); setDeviceToDelete(device); setOpenDeleteDialog(true); setOpenAddDialog(false); setOpenEditDialog(false); };
    const handleCloseDeleteDialog = () => { setDeviceToDelete(null); setOpenDeleteDialog(false); };

  const handleConfirmDelete = () => { 
    if (deviceToDelete) { 
      console.log(`Đã xóa thiết bị: ${deviceToDelete.name} (ID: ${deviceToDelete.id})`);
      // Cập nhật allDeviceData
      const updatedAllDeviceData = allDeviceData.filter(device => device.id !== deviceToDelete.id);
      // Cập nhật lại deviceData (biến gốc) để các lần lọc sau đúng
      // Trong thực tế, đây sẽ là gọi API và lấy lại danh sách mới
      while(deviceData.length > 0) { deviceData.pop(); } // Xóa hết phần tử cũ
      updatedAllDeviceData.forEach(d => deviceData.push(d)); // Thêm lại
      
      // Cập nhật currentDeviceList (danh sách đang hiển thị)
      setCurrentDeviceList(prevList => prevList.filter(device => device.id !== deviceToDelete.id)); 
      
      showAlert(`Đã xóa thiết bị ${deviceToDelete.name} thành công!`);
      handleCloseDeleteDialog(); 
    }
  };

  // --- Dialog Sửa --- (Cập nhật để lọc lại list sau khi sửa)
    const handleOpenEditDialog = (device) => { hideAlert(); setDeviceToEdit(device); setEditFormData({ name: device.name, type: device.type, location: zoneData.find(z=>z.id === device.zoneId)?.name || device.location || "", id: device.id, status: device.status }); setOpenEditDialog(true); setOpenAddDialog(false); setOpenDeleteDialog(false); };
    const handleCloseEditDialog = () => { setDeviceToEdit(null); setOpenEditDialog(false); };
    const handleEditFormChange = (e) => { const { name, value } = e.target; setEditFormData(prev => ({ ...prev, [name]: value })); };
    const handleEditSelectChange = (name, value) => { setEditFormData(prev => ({ ...prev, [name]: value })); };

  const handleConfirmEdit = () => {
    if (deviceToEdit) {
      const selectedZoneObject = zoneData.find(zone => zone.name === editFormData.location);
      const updatedDeviceDataForList = {
          ...deviceToEdit, // Giữ lại các trường không sửa đổi từ deviceToEdit
          name: editFormData.name,
          type: editFormData.type,
          status: editFormData.status,
          location: editFormData.location, // Cập nhật location name
          zoneId: selectedZoneObject ? selectedZoneObject.id : deviceToEdit.zoneId, // Cập nhật zoneId
      };
      console.log(`Đã sửa thiết bị ID: ${deviceToEdit.id}`, updatedDeviceDataForList); 
      
      // Cập nhật allDeviceData
      const indexInAll = allDeviceData.findIndex(d => d.id === deviceToEdit.id);
      if (indexInAll !== -1) {
          allDeviceData[indexInAll] = updatedDeviceDataForList;
      }

      // Cập nhật currentDeviceList
      setCurrentDeviceList(prevList => 
        prevList.map(device => 
          device.id === deviceToEdit.id ? updatedDeviceDataForList : device
        )
      );
      showAlert("Cập nhật thông tin thiết bị thành công!");
      handleCloseEditDialog(); 
    }
  };

  // --- Hàm lấy style Chip --- 
    const getStatusChip = (status) => { switch (status?.toLowerCase()) { case "online": return { color: "green", icon: <CheckCircleIcon className="w-4 h-4 mr-1" />, text: "Online"}; case "offline": return { color: "blue-gray", icon: <XCircleIcon className="w-4 h-4 mr-1" />, text: "Offline" }; case "error": return { color: "red", icon: <ExclamationTriangleIcon className="w-4 h-4 mr-1" />, text: "Lỗi" }; default: return { color: "gray", icon: null, text: status || "N/A" }; }};

  // --- Cấu hình bảng ---
  const TABLE_HEAD = ["Tên Thiết bị", "Loại", "ID", 
    ...(selectedRegion === "all" || !selectedRegion ? ["Khu vực"] : []), 
    "Trạng thái", "Ngày thêm", "Hành động"
  ];

  // --- RENDER COMPONENT ---
  return (
    <>
      {/* Alert */}
      <div className="fixed top-4 right-4 z-[9999] w-auto max-w-md">
           <Alert open={alertInfo.open} color={alertInfo.color} icon={<CheckCircleIcon className="mt-px h-6 w-6" />} onClose={hideAlert} animate={{ mount: { y: 0 }, unmount: { y: -100 }, }}>{alertInfo.message}</Alert>
      </div>

      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
           <CardHeader variant="gradient" className="mb-8 p-6 flex justify-between items-center bg-gradient-to-tr from-green-600 to-green-300">
             <Typography variant="h6" color="white">
                Quản lý Thiết bị {selectedRegion && selectedRegion !== "all" ? `(${zoneData.find(z => z.id === selectedRegion)?.name || ''})` : '(Tất cả Khu vực)'}
             </Typography>
             <Button className="flex items-center gap-3" color="white" size="sm" onClick={handleOpenAddDialog}><PlusIcon strokeWidth={3} className="h-4 w-4" /> Thêm Thiết bị</Button>
           </CardHeader>
           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead><tr>{TABLE_HEAD.map((head) => (<th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography></th>))}</tr></thead>
                <tbody>
                  {currentDeviceList.length > 0 ? currentDeviceList.map(
                    (deviceItem, key) => {
                      const { id, name, type, location, status, addedDate, zoneId } = deviceItem; 
                      const className = `py-3 px-5 ${key === currentDeviceList.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                      const statusStyle = getStatusChip(status);
                      const zoneName = zoneData.find(z => z.id === zoneId)?.name || location || "N/A"; // Ưu tiên zoneId

                      return (
                        <tr key={id}>
                           <td className={className}><Typography variant="small" color="blue-gray" className="font-semibold">{name}</Typography></td>
                           <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{type}</Typography></td>
                           <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{id}</Typography></td>
                           {/* Hiển thị cột Khu vực có điều kiện */}
                           {(selectedRegion === "all" || !selectedRegion) && (
                               <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{zoneName}</Typography></td>
                           )}
                           <td className={className}><Chip variant="gradient" color={statusStyle.color} value={statusStyle.text} icon={statusStyle.icon} className="py-0.5 px-2 text-[11px] font-medium w-fit"/></td>
                           <td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{addedDate}</Typography></td>
                           <td className={`${className} flex gap-1`}> 
                              <Tooltip content="Sửa thiết bị"><IconButton variant="text" color="blue-gray" size="sm" onClick={() => handleOpenEditDialog(deviceItem)}><PencilIcon className="h-4 w-4" /></IconButton></Tooltip>
                              <Tooltip content="Xóa thiết bị"><IconButton variant="text" color="red" size="sm" onClick={() => handleOpenDeleteDialog(deviceItem)}><TrashIcon className="h-4 w-4" /></IconButton></Tooltip>
                           </td>
                        </tr>
                      );
                    }
                  ) : (
                    <tr><td colSpan={TABLE_HEAD.length} className="py-4 px-5 text-center text-blue-gray-500">Không có thiết bị nào {selectedRegion && selectedRegion !== "all" ? `trong ${zoneData.find(z => z.id === selectedRegion)?.name || 'khu vực này'}` : "phù hợp"}.</td></tr>
                  )}
                </tbody>
              </table>
           </CardBody>
        </Card>
      </div>

      {/* === DIALOGS === */}
      {/* Dialog Thêm */}
      <Dialog open={openAddDialog} handler={handleCloseAddDialog}>
         <DialogHeader>Thêm Thiết bị Mới</DialogHeader>
         <DialogBody divider className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
           <Input label="Tên Thiết bị" name="name" value={addDeviceForm.name} onChange={handleAddDeviceFormChange} required /> 
           <Input label="Mã/ID Thiết bị" name="id" value={addDeviceForm.id} onChange={handleAddDeviceFormChange} required />
           <Select label="Loại Thiết bị" name="type" value={addDeviceForm.type} onChange={(value) => handleAddDeviceSelectChange('type', value)}>
             <Option value="Sensor">Sensor</Option><Option value="Actuator">Actuator</Option>
           </Select>
           {/* Select Khu vực trong Dialog Thêm */}
           <Select 
             label="Khu vực" 
             name="location" 
             value={addDeviceForm.location} 
             onChange={(value) => handleAddDeviceSelectChange('location', value)}
             disabled={!!(selectedRegion && selectedRegion !== "all")} // Disable nếu một khu vực cụ thể đã được chọn trên Navbar
            >
             {zoneData.map(zone => (
                <Option key={zone.id} value={zone.name}>{zone.name}</Option> // Dùng zone.name cho value để khớp với state
             ))}
           </Select>
            <Select label="Trạng thái ban đầu" name="status" value={addDeviceForm.status} onChange={(value) => handleAddDeviceSelectChange('status', value)}>
             <Option value="Online">Online</Option><Option value="Offline">Offline</Option>
           </Select>
           <Typography variant="small" color="red" className="mt-2">*Lưu ý: .....</Typography>
         </DialogBody>
         <DialogFooter>
           <Button variant="text" color="red" onClick={handleCloseAddDialog} className="mr-1"><span>Hủy</span></Button>
           <Button variant="gradient" color="green" onClick={handleAddNewDevice}><span>Thêm</span></Button>
         </DialogFooter>
      </Dialog>
      
      {/* Dialog Xóa */}
      <Dialog open={openDeleteDialog} handler={handleCloseDeleteDialog} size="xs">
         {/* ... */}
      </Dialog>

      {/* Dialog Sửa */}
       <Dialog open={openEditDialog} handler={handleCloseEditDialog}>
          <DialogHeader>Chỉnh sửa Thiết bị</DialogHeader>
          <DialogBody divider className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            <Input label="Mã/ID Thiết bị" value={editFormData.id} disabled /> 
            <Input label="Tên Thiết bị" name="name" value={editFormData.name} onChange={handleEditFormChange} />
            <Select label="Loại Thiết bị" name="type" value={editFormData.type} onChange={(value) => handleEditSelectChange('type', value)} ><Option value="Sensor">Sensor</Option><Option value="Actuator">Actuator</Option></Select>
            {/* Select Khu vực trong Dialog Sửa */}
            <Select 
                label="Khu vực" 
                name="location" 
                value={editFormData.location} 
                onChange={(value) => handleEditSelectChange('location', value)}
            >
                {zoneData.map(zone => (
                    <Option key={zone.id} value={zone.name}>{zone.name}</Option>
                ))}
            </Select>
            <Select label="Trạng thái" name="status" value={editFormData.status} onChange={(value) => handleEditSelectChange('status', value)}><Option value="Online">Online</Option><Option value="Offline">Offline</Option><Option value="Error">Error</Option></Select>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleCloseEditDialog} className="mr-1"><span>Hủy</span></Button>
            <Button variant="gradient" color="green" onClick={handleConfirmEdit}><span>Lưu thay đổi</span></Button>
          </DialogFooter>
       </Dialog>
    </>
  );
}

export default DeviceManagement;