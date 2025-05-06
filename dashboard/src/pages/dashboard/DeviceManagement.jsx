import React, { useState } from "react"; 
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

import { deviceData } from "@/data/device-management-data.js"; 

export function DeviceManagement() {
  // === STATE QUẢN LÝ === (Giữ nguyên)
  const [currentDeviceList, setCurrentDeviceList] = useState(deviceData);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState(null); 
  // Bỏ 'location' khỏi đây nếu muốn, nhưng để cũng không ảnh hưởng nhiều ở bước giả lập
  const [editFormData, setEditFormData] = useState({ name: '', type: '', location: '', id: '', status: '' }); 
  const [alertInfo, setAlertInfo] = useState({ open: false, color: 'green', message: '' });

  // === HÀM TIỆN ÍCH CHO ALERT === (Giữ nguyên)

    const showAlert = (message, color = 'green') => { setAlertInfo({ open: true, color, message }); setTimeout(() => { setAlertInfo(prev => ({ ...prev, open: false })); }, 3000); };
    const hideAlert = () => { if (alertInfo.open) { setAlertInfo(prev => ({ ...prev, open: false })); }};


  // === HÀM XỬ LÝ DIALOGS === (Giữ nguyên logic, chỉ bỏ phần liên quan UI Khu vực nếu cần)

  // --- Dialog Thêm ---
  const handleOpenAddDialog = () => { hideAlert(); setOpenAddDialog(!openAddDialog); };
  const handleAddNewDevice = () => { console.log("Thêm..."); handleOpenAddDialog(); };

  // --- Dialog Xóa ---
  const handleOpenDeleteDialog = (device) => { hideAlert(); setDeviceToDelete(device); setOpenDeleteDialog(true); };
  const handleCloseDeleteDialog = () => { setDeviceToDelete(null); setOpenDeleteDialog(false); };
  const handleConfirmDelete = () => { if (deviceToDelete) { console.log(`Xóa: ...`); setCurrentDeviceList(prev => prev.filter(d => d.id !== deviceToDelete.id)); showAlert(`Đã xóa thiết bị ${deviceToDelete.name} thành công!`); handleCloseDeleteDialog(); }};

  // --- Dialog Sửa ---
  const handleOpenEditDialog = (device) => {
    hideAlert();
    setDeviceToEdit(device); 
    // Vẫn lấy location vào state, nhưng sẽ không hiển thị/sửa trong dialog nữa
    setEditFormData({ name: device.name, type: device.type, location: device.location, id: device.id, status: device.status });
    setOpenEditDialog(true); 
  };
  const handleCloseEditDialog = () => { setDeviceToEdit(null); setOpenEditDialog(false); };
  const handleEditFormChange = (e) => { const { name, value } = e.target; setEditFormData(prev => ({ ...prev, [name]: value })); };
  const handleEditSelectChange = (name, value) => { setEditFormData(prev => ({ ...prev, [name]: value })); };
  const handleConfirmEdit = () => {
    if (deviceToEdit) {
      // Logic cập nhật vẫn dùng ...editFormData nên không cần sửa
      console.log(`Đã sửa thiết bị ID: ${deviceToEdit.id}`, editFormData); 
      setCurrentDeviceList(prevList => prevList.map(device => device.id === deviceToEdit.id ? { ...device, ...editFormData } : device));
      showAlert("Cập nhật thông tin thiết bị thành công!");
      handleCloseEditDialog(); 
    }
  };

  // --- Hàm lấy style Chip (Giữ nguyên) ---
    const getStatusChip = (status) => { switch (status?.toLowerCase()) { case "online": return { color: "green", icon: <CheckCircleIcon className="w-4 h-4 mr-1" />, text: "Online"}; case "offline": return { color: "blue-gray", icon: <XCircleIcon className="w-4 h-4 mr-1" />, text: "Offline" }; case "error": return { color: "red", icon: <ExclamationTriangleIcon className="w-4 h-4 mr-1" />, text: "Lỗi" }; default: return { color: "gray", icon: null, text: status || "N/A" }; }};


  // --- BỎ "Khu vực" KHỎI CẤU HÌNH BẢNG ---
  const TABLE_HEAD = ["Tên Thiết bị", "Loại", "ID", "Trạng thái", "Ngày thêm", "Hành động"];

  // --- RENDER COMPONENT ---
  return (
    <>
      {/* Alert */}
      <div className="fixed top-4 right-4 z-[9999] w-auto max-w-md">
           <Alert open={alertInfo.open} color={alertInfo.color} icon={<CheckCircleIcon className="mt-px h-6 w-6" />} onClose={hideAlert} animate={{ mount: { y: 0 }, unmount: { y: -100 }, }}>{alertInfo.message}</Alert>
      </div>

      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
           {/* CardHeader */}
           <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
             <Typography variant="h6" color="white">Quản lý Thiết bị</Typography>
             <Button className="flex items-center gap-3" color="white" size="sm" onClick={handleOpenAddDialog}><PlusIcon strokeWidth={3} className="h-4 w-4" /> Thêm Thiết bị</Button>
           </CardHeader>
           {/* CardBody và Table */}
           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                {/* thead - dùng TABLE_HEAD đã cập nhật */}
                <thead><tr>{TABLE_HEAD.map((head) => (<th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography></th>))}</tr></thead>
                {/* tbody */}
                <tbody>
                  {currentDeviceList.map(
                    (deviceItem, key) => {
                      // --- BỎ `location` KHỎI DESTRUCTURING ---
                      const { id, name, type, status, addedDate } = deviceItem; 
                      const className = `py-3 px-5 ${key === currentDeviceList.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                      const statusStyle = getStatusChip(status);
                      return (
                        <tr key={id}>
                           {/* Các td hiển thị */}
                           <td className={className}><Typography variant="small" color="blue-gray" className="font-semibold">{name}</Typography></td>
                           <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{type}</Typography></td>
                           <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{id}</Typography></td>
                           {/* --- ĐÃ BỎ TD CHO LOCATION --- */}
                           <td className={className}><Chip variant="gradient" color={statusStyle.color} value={statusStyle.text} icon={statusStyle.icon} className="py-0.5 px-2 text-[11px] font-medium w-fit"/></td>
                           <td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{addedDate}</Typography></td>
                           {/* Cột Hành động */}
                           <td className={`${className} flex gap-1`}> 
                              <Tooltip content="Sửa thiết bị"><IconButton variant="text" color="blue-gray" size="sm" onClick={() => handleOpenEditDialog(deviceItem)}><PencilIcon className="h-4 w-4" /></IconButton></Tooltip>
                              <Tooltip content="Xóa thiết bị"><IconButton variant="text" color="red" size="sm" onClick={() => handleOpenDeleteDialog(deviceItem)}><TrashIcon className="h-4 w-4" /></IconButton></Tooltip>
                           </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
           </CardBody>
        </Card>
      </div>

      {/* === DIALOGS === */}
      {/* Dialog Thêm --- BỎ SELECT KHU VỰC --- */}
      <Dialog open={openAddDialog} handler={handleOpenAddDialog}>
         <DialogHeader>Thêm Thiết bị Mới</DialogHeader>
         <DialogBody divider className="flex flex-col gap-4">
           <Input label="Tên Thiết bị" name="name" /> 
           <Input label="Mã/ID Thiết bị" name="id" />
           <Select label="Loại Thiết bị" name="type"><Option value="Sensor">Sensor</Option><Option value="Actuator">Actuator</Option></Select>
           {/* <Select label="Khu vực" name="location"><Option value="Khu vực 1">KV 1</Option>...</Select> */} {/* Đã bỏ */}
           <Typography variant="small" color="red" className="mt-2">*Lưu ý: Chỉ là giao diện mẫu...</Typography>
         </DialogBody>
         <DialogFooter>
           <Button variant="text" color="red" onClick={handleOpenAddDialog} className="mr-1"><span>Hủy</span></Button>
           <Button variant="gradient" color="green" onClick={handleAddNewDevice}><span>Lưu</span></Button>
         </DialogFooter>
      </Dialog>
      
      {/* Dialog Xóa (Giữ nguyên) */}
      <Dialog open={openDeleteDialog} handler={handleCloseDeleteDialog} size="xs">
         <DialogHeader>Xác nhận Xóa</DialogHeader>
         <DialogBody divider>Bạn có chắc chắn muốn xóa thiết bị ...</DialogBody>
         <DialogFooter>
            <Button variant="text" color="blue-gray" onClick={handleCloseDeleteDialog} className="mr-1"><span>Hủy</span></Button>
            <Button variant="gradient" color="red" onClick={handleConfirmDelete}><span>Xác nhận Xóa</span></Button>
         </DialogFooter>
      </Dialog>

      {/* Dialog Sửa --- BỎ SELECT KHU VỰC --- */}
       <Dialog open={openEditDialog} handler={handleCloseEditDialog}>
          <DialogHeader>Chỉnh sửa Thiết bị</DialogHeader>
          <DialogBody divider className="flex flex-col gap-4">
            <Input label="Mã/ID Thiết bị" value={editFormData.id} disabled /> 
            <Input label="Tên Thiết bị" name="name" value={editFormData.name} onChange={handleEditFormChange} />
            <Select label="Loại Thiết bị" name="type" value={editFormData.type} onChange={(value) => handleEditSelectChange('type', value)} ><Option value="Sensor">Sensor</Option><Option value="Actuator">Actuator</Option></Select>
            {/* <Select label="Khu vực" name="location" value={editFormData.location} ... </Select> */} {/* Đã bỏ */}
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