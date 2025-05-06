import React, { useState } from "react"; 
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  // Bỏ Chip nếu không dùng trong bảng này
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea, // Dùng Textarea cho mô tả
  Alert, 
} from "@material-tailwind/react";
import {
  PencilIcon, 
  TrashIcon,  
  PlusIcon,   
  CheckCircleIcon, 
  // Bỏ các icon không dùng khác nếu có
} from "@heroicons/react/24/solid";

// Import dữ liệu mẫu (Đảm bảo file này tồn tại và đúng đường dẫn)
import { zoneData } from "@/data/zone-management-data.js"; 

export function ZoneManagement() {
  // === STATE QUẢN LÝ ===
  const [currentZoneList, setCurrentZoneList] = useState(zoneData);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [zoneToDelete, setZoneToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [zoneToEdit, setZoneToEdit] = useState(null); 
  const [editFormData, setEditFormData] = useState({ id: '', name: '', description: '' }); 
  const [addFormData, setAddFormData] = useState({ name: '', description: '' }); 
  const [alertInfo, setAlertInfo] = useState({ open: false, color: 'green', message: '' });

  // === HÀM TIỆN ÍCH CHO ALERT ===
  const showAlert = (message, color = 'green') => { setAlertInfo({ open: true, color, message }); setTimeout(() => { setAlertInfo(prev => ({ ...prev, open: false })); }, 3000); };
  const hideAlert = () => { if (alertInfo.open) { setAlertInfo(prev => ({ ...prev, open: false })); }};

  // === HÀM XỬ LÝ DIALOGS ===

  // --- Dialog Thêm ---
  const handleOpenAddDialog = () => { hideAlert(); setAddFormData({ name: '', description: ''}); setOpenAddDialog(!openAddDialog); };
  const handleAddFormChange = (e) => { const { name, value } = e.target; setAddFormData(prev => ({ ...prev, [name]: value })); };
  const handleAddNewZone = () => {
    // TODO: Gọi API thêm khu vực với addFormData
    console.log("Thêm khu vực mới:", addFormData);
    const newZone = { id: `ZONE${Date.now().toString().slice(-3)}`, ...addFormData, deviceCount: 0, createdDate: new Date().toISOString().split('T')[0] };
    setCurrentZoneList(prev => [newZone, ...prev]); 
    showAlert(`Đã thêm khu vực "${addFormData.name}" thành công!`);
    handleOpenAddDialog(); 
  };

  // --- Dialog Xóa ---
  const handleOpenDeleteDialog = (zone) => { hideAlert(); setZoneToDelete(zone); setOpenDeleteDialog(true); };
  const handleCloseDeleteDialog = () => { setZoneToDelete(null); setOpenDeleteDialog(false); };
  const handleConfirmDelete = () => {
    if (zoneToDelete) {
      // TODO: Gọi API xóa khu vực với zoneToDelete.id
      console.log(`Đã xóa khu vực: ${zoneToDelete.name} (ID: ${zoneToDelete.id})`);
      setCurrentZoneList(prevList => prevList.filter(zone => zone.id !== zoneToDelete.id));
      showAlert(`Đã xóa khu vực ${zoneToDelete.name} thành công!`);
      handleCloseDeleteDialog();
    }
  };

  // --- Dialog Sửa ---
  const handleOpenEditDialog = (zone) => {
    hideAlert();
    setZoneToEdit(zone); 
    setEditFormData({ id: zone.id, name: zone.name, description: zone.description });
    setOpenEditDialog(true); 
  };
  const handleCloseEditDialog = () => { setZoneToEdit(null); setOpenEditDialog(false); };
  const handleEditFormChange = (e) => { const { name, value } = e.target; setEditFormData(prev => ({ ...prev, [name]: value })); };
  const handleConfirmEdit = () => {
    if (zoneToEdit) {
      // TODO: Gọi API sửa khu vực với editFormData
      console.log(`Đã sửa khu vực ID: ${zoneToEdit.id}`, editFormData);
      setCurrentZoneList(prevList => 
        prevList.map(zone => 
          zone.id === zoneToEdit.id ? { ...zone, name: editFormData.name, description: editFormData.description } : zone
        )
      );
      showAlert(`Cập nhật khu vực "${editFormData.name}" thành công!`);
      handleCloseEditDialog(); 
    }
  };

  // === CẤU HÌNH BẢNG ===
  const TABLE_HEAD = ["Tên Khu vực", "Mô tả", "Số lượng Thiết bị", "Ngày tạo", "Hành động"];

  // === RENDER COMPONENT ===
  return (
    <>
      {/* Alert Chung */}
      <div className="fixed top-4 right-4 z-[9999] w-auto max-w-md">
           <Alert open={alertInfo.open} color={alertInfo.color} icon={<CheckCircleIcon className="mt-px h-6 w-6" />} onClose={hideAlert} animate={{ mount: { y: 0 }, unmount: { y: -100 }, }}>{alertInfo.message}</Alert>
      </div>

      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
           {/* CardHeader */}
           <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
             <Typography variant="h6" color="white">Quản lý Khu vực</Typography>
             <Button className="flex items-center gap-3" color="white" size="sm" onClick={handleOpenAddDialog}><PlusIcon strokeWidth={3} className="h-4 w-4" /> Thêm Khu vực</Button>
           </CardHeader>
           {/* CardBody và Table */}

           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                {/* thead */}
                <thead><tr>{TABLE_HEAD.map((head) => (<th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography></th>))}</tr></thead>
                {/* tbody */}
                <tbody>
                  {currentZoneList.map(
                    (zoneItem, key) => { 
                      const { id, name, description, deviceCount, createdDate } = zoneItem;
                      const className = `py-3 px-5 ${key === currentZoneList.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                      return (
                        <tr key={id}>
                           <td className={className}><Typography variant="small" color="blue-gray" className="font-semibold">{name}</Typography></td>
                           
                           {/* --- CẬP NHẬT CỘT MÔ TẢ VỚI TOOLTIP --- */}
                           <td className={className}>
                             <Tooltip content={description} placement="bottom-start"> 
                               {/* Đặt Tooltip bao ngoài Typography */}
                               <Typography className="text-xs font-normal text-blue-gray-500 max-w-xs truncate">
                                 {description}
                               </Typography>
                             </Tooltip>
                           </td>
                           
                           <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{deviceCount}</Typography></td>
                           <td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{createdDate}</Typography></td>
                           <td className={`${className} flex gap-1`}> 
                              <Tooltip content="Sửa Khu vực"><IconButton variant="text" color="blue-gray" size="sm" onClick={() => handleOpenEditDialog(zoneItem)}><PencilIcon className="h-4 w-4" /></IconButton></Tooltip>
                              <Tooltip content="Xóa Khu vực"><IconButton variant="text" color="red" size="sm" onClick={() => handleOpenDeleteDialog(zoneItem)}><TrashIcon className="h-4 w-4" /></IconButton></Tooltip>
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

      {/* Dialog Thêm Khu vực */}
      <Dialog open={openAddDialog} handler={handleOpenAddDialog}>
         <DialogHeader>Thêm Khu vực Mới</DialogHeader>
         <DialogBody divider className="flex flex-col gap-4">
           <Input label="Tên Khu vực" name="name" value={addFormData.name} onChange={handleAddFormChange} /> 
           <Textarea label="Mô tả" name="description" value={addFormData.description} onChange={handleAddFormChange} />
         </DialogBody>
         <DialogFooter>
           <Button variant="text" color="red" onClick={handleOpenAddDialog} className="mr-1"><span>Hủy</span></Button>
           <Button variant="gradient" color="green" onClick={handleAddNewZone}><span>Thêm</span></Button>
         </DialogFooter>
       </Dialog>
      
      {/* Dialog Xóa Khu vực */}
      <Dialog open={openDeleteDialog} handler={handleCloseDeleteDialog} size="xs">
         <DialogHeader>Xác nhận Xóa</DialogHeader>
         <DialogBody divider>Bạn có chắc chắn muốn xóa khu vực <span className="font-semibold">{zoneToDelete?.name}</span> không? Các thiết bị và lịch sử liên quan có thể bị ảnh hưởng.</DialogBody>
         <DialogFooter>
            <Button variant="text" color="blue-gray" onClick={handleCloseDeleteDialog} className="mr-1"><span>Hủy</span></Button>
            <Button variant="gradient" color="red" onClick={handleConfirmDelete}><span>Xác nhận Xóa</span></Button>
         </DialogFooter>
      </Dialog>

      {/* Dialog Sửa Khu vực */}
       <Dialog open={openEditDialog} handler={handleCloseEditDialog}>
          <DialogHeader>Chỉnh sửa Khu vực</DialogHeader>
          <DialogBody divider className="flex flex-col gap-4">
            <Input label="ID Khu vực" value={editFormData.id} disabled /> 
            <Input label="Tên Khu vực" name="name" value={editFormData.name} onChange={handleEditFormChange} />
            <Textarea label="Mô tả" name="description" value={editFormData.description} onChange={handleEditFormChange} />
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleCloseEditDialog} className="mr-1"><span>Hủy</span></Button>
            <Button variant="gradient" color="green" onClick={handleConfirmEdit}><span>Lưu thay đổi</span></Button>
          </DialogFooter>
       </Dialog>
    </>
  );
}

export default ZoneManagement;