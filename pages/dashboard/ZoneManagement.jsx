import React, { useState } from "react"; 
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea, 
  Alert, 
  Chip, 
} from "@material-tailwind/react";
import {
  PencilIcon, 
  TrashIcon,  
  PlusIcon,   
  CheckCircleIcon,
  EyeIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon, 

} from "@heroicons/react/24/solid";

// Import dữ liệu mẫu
import { zoneData } from "@/data/zone-management-data.js"; 
import { deviceData } from "@/data/device-management-data.js"; 
import { cropData } from "@/data/crop-management-data.js"; 

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
  const [openZoneDetailDialog, setOpenZoneDetailDialog] = useState(false);
  const [selectedZoneForDetail, setSelectedZoneForDetail] = useState(null);
  const [devicesInSelectedZone, setDevicesInSelectedZone] = useState([]);
  const [cropsInSelectedZone, setCropsInSelectedZone] = useState([]);

  // === HÀM TIỆN ÍCH CHO ALERT ===
  const showAlert = (message, color = 'green') => { setAlertInfo({ open: true, color, message }); setTimeout(() => { setAlertInfo(prev => ({ ...prev, open: false })); }, 3000); };
  const hideAlert = () => { if (alertInfo.open) { setAlertInfo(prev => ({ ...prev, open: false })); }};

  // === HÀM XỬ LÝ DIALOGS ===

  // --- Dialog Thêm Khu vực ---
  const handleOpenAddDialog = () => { 
    hideAlert(); 
    setAddFormData({ name: '', description: ''}); 
    setOpenAddDialog(true); 
    setOpenEditDialog(false); 
    setOpenDeleteDialog(false); 
    setOpenZoneDetailDialog(false); 
  };
  const handleAddFormChange = (e) => { 
    const { name, value } = e.target; 
    setAddFormData(prev => ({ ...prev, [name]: value })); 
  };
  const handleAddNewZone = () => { 
    if (!addFormData.name.trim()) { 
      showAlert("Tên khu vực không được để trống.", "red"); 
      return; 
    } 
    const newZone = { 
      id: `ZONE${Date.now().toString().slice(-3)}`, 
      ...addFormData, 
      // deviceCount: 0, // Sẽ tính động
      createdDate: new Date().toISOString().split('T')[0] 
    }; 
    setCurrentZoneList(prev => [newZone, ...prev]); 
    showAlert(`Đã thêm khu vực "${addFormData.name}" thành công!`);
    setOpenAddDialog(false); 
  };

  // --- Dialog Xóa Khu vực ---
  const handleOpenDeleteDialog = (zone) => { 
    hideAlert(); 
    setZoneToDelete(zone); 
    setOpenDeleteDialog(true); 
    setOpenAddDialog(false); 
    setOpenEditDialog(false); 
    setOpenZoneDetailDialog(false);
  };
  const handleCloseDeleteDialog = () => { 
    setZoneToDelete(null); 
    setOpenDeleteDialog(false); 
  };
  const handleConfirmDelete = () => { 
    if (zoneToDelete) { 
      setCurrentZoneList(prevList => prevList.filter(zone => zone.id !== zoneToDelete.id)); 
      showAlert(`Đã xóa khu vực ${zoneToDelete.name} thành công!`); 
      handleCloseDeleteDialog(); 
    }
  };

  // --- Dialog Sửa Khu vực ---
  const handleOpenEditDialog = (zone) => { 
    hideAlert(); 
    setZoneToEdit(zone); 
    setEditFormData({ id: zone.id, name: zone.name, description: zone.description }); 
    setOpenEditDialog(true); 
    setOpenAddDialog(false); 
    setOpenDeleteDialog(false); 
    setOpenZoneDetailDialog(false);
  };
  const handleCloseEditDialog = () => { 
    setZoneToEdit(null); 
    setOpenEditDialog(false); 
  };
  const handleEditFormChange = (e) => { 
    const { name, value } = e.target; 
    setEditFormData(prev => ({ ...prev, [name]: value })); 
  };
  const handleConfirmEdit = () => { 
    if (zoneToEdit) { 
      if(!editFormData.name.trim()){ 
        showAlert("Tên khu vực không được để trống.", "red"); 
        return;
      } 
      setCurrentZoneList(prevList => 
        prevList.map(zone => 
          zone.id === zoneToEdit.id ? { ...zone, name: editFormData.name, description: editFormData.description } : zone 
        )
      ); 
      showAlert(`Cập nhật khu vực "${editFormData.name}" thành công!`); 
      handleCloseEditDialog(); 
    }
  };
  
  // --- Dialog Xem Chi tiết Khu vực ---
  const handleOpenZoneDetailDialog = (zone) => {
    hideAlert();
    setSelectedZoneForDetail(zone);
    const devices = deviceData.filter(device => device.zoneId === zone.id); 
    setDevicesInSelectedZone(devices);
    const crops = cropData.filter(crop => crop.zoneId === zone.id);
    setCropsInSelectedZone(crops);
    setOpenZoneDetailDialog(true);
    setOpenAddDialog(false); 
    setOpenEditDialog(false); 
    setOpenDeleteDialog(false);
  };
  const handleCloseZoneDetailDialog = () => {
    setSelectedZoneForDetail(null);
    setDevicesInSelectedZone([]);
    setCropsInSelectedZone([]);
    setOpenZoneDetailDialog(false);
  };

  // Hàm lấy style cho Chip trạng thái thiết bị
  const getDeviceStatusChip = (status) => { 
    switch (status?.toLowerCase()) { 
      case "online": return { color: "green", icon: <CheckCircleIcon className="w-4 h-4 mr-1" />, text: "Online"}; 
      case "offline": return { color: "blue-gray", icon: <XCircleIcon className="w-4 h-4 mr-1" />, text: "Offline" }; 
      case "error": return { color: "red", icon: <ExclamationTriangleIcon className="w-4 h-4 mr-1" />, text: "Lỗi" }; 
      default: return { color: "gray", icon: null, text: status || "N/A" }; 
    }
  };

  // === CẤU HÌNH BẢNG ===
  const TABLE_HEAD_ZONES = ["Tên Khu vực", "Mô tả", "Số Thiết bị", "Số Cây trồng", "Ngày tạo", "Hành động"];
  const TABLE_HEAD_DEVICES_IN_ZONE = ["Tên Thiết bị", "Loại", "ID", "Trạng thái"];
  const TABLE_HEAD_CROPS_IN_ZONE = ["Tên Cây trồng", "Giống", "Ngày trồng", "Dự kiến Thu hoạch", "Ghi chú"];

  // === RENDER COMPONENT ===
  return (
    <>
      {/* Alert Chung */}
      <div className="fixed top-4 right-4 z-[9999] w-auto max-w-md">
           <Alert open={alertInfo.open} color={alertInfo.color} icon={<CheckCircleIcon className="mt-px h-6 w-6" />} onClose={hideAlert} animate={{ mount: { y: 0 }, unmount: { y: -100 }, }}>{alertInfo.message}</Alert>
      </div>

      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
            <CardHeader variant="gradient" className="mb-8 p-6 flex justify-between items-center bg-gradient-to-tr from-green-600 to-green-300">
                <Typography variant="h6" color="white">Quản lý Khu vực</Typography>
                <Button className="flex items-center gap-3" color="white" size="sm" onClick={handleOpenAddDialog}><PlusIcon strokeWidth={3} className="h-4 w-4" /> Thêm Khu vực</Button>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead><tr>{TABLE_HEAD_ZONES.map((head) => (<th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography></th>))}</tr></thead>
                    <tbody>
                        {currentZoneList.map(
                            (zoneItem, key) => { 
                                const { id, name, description, /* deviceCount, */ createdDate } = zoneItem; // Bỏ deviceCount cố định
                                const className = `py-3 px-5 ${key === currentZoneList.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                                
                                // Tính số lượng thiết bị và cây trồng động
                                const devicesInThisZone = deviceData.filter(d => d.zoneId === id).length;
                                const cropsInThisZone = cropData.filter(c => c.zoneId === id).length;

                                return (
                                    <tr key={id}>
                                        <td className={className}><Tooltip content="Xem chi tiết Khu vực"><Typography variant="small" color="blue-gray" className="font-semibold cursor-pointer hover:text-blue-600" onClick={() => handleOpenZoneDetailDialog(zoneItem)}>{name}</Typography></Tooltip></td>
                                        <td className={className}><Tooltip content={description} placement="bottom-start"><Typography className="text-xs font-normal text-blue-gray-500 max-w-xs truncate">{description}</Typography></Tooltip></td>
                                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{devicesInThisZone}</Typography></td>
                                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{cropsInThisZone}</Typography></td>
                                        <td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{createdDate}</Typography></td>
                                        <td className={`${className} flex gap-1`}> 
                                            <Tooltip content="Xem Chi tiết"><IconButton variant="text" color="light-blue" size="sm" onClick={() => handleOpenZoneDetailDialog(zoneItem)}><EyeIcon className="h-4 w-4" /></IconButton></Tooltip>
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
          <Input label="Tên Khu vực" name="name" value={addFormData.name} onChange={handleAddFormChange} required/> 
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
        <DialogBody divider>
            Bạn có chắc chắn muốn xóa khu vực <span className="font-semibold">{zoneToDelete?.name}</span> không? 
            Các thiết bị và cây trồng liên quan có thể cần được gán lại hoặc sẽ bị mất liên kết.
        </DialogBody>
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
          <Input label="Tên Khu vực" name="name" value={editFormData.name} onChange={handleEditFormChange} required/>
          <Textarea label="Mô tả" name="description" value={editFormData.description} onChange={handleEditFormChange} />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleCloseEditDialog} className="mr-1"><span>Hủy</span></Button>
          <Button variant="gradient" color="green" onClick={handleConfirmEdit}><span>Lưu thay đổi</span></Button>
        </DialogFooter>
      </Dialog>

      {/* Dialog Xem Chi tiết Khu vực */}
      <Dialog open={openZoneDetailDialog} handler={handleCloseZoneDetailDialog} size="xl"> 
        <DialogHeader>Chi tiết Khu vực: {selectedZoneForDetail?.name || "N/A"}</DialogHeader>
        <DialogBody divider className="max-h-[80vh] overflow-y-auto space-y-6 p-6">
            {/* Thông tin chung khu vực */}
            <div>
                <Typography variant="h6" color="blue-gray" className="border-b pb-1 mb-2">Thông tin chung</Typography>
                <Typography className="text-sm text-gray-700"><span className="font-semibold">Mô tả:</span> {selectedZoneForDetail?.description || "Không có mô tả."}</Typography>
                <Typography className="text-sm text-gray-700"><span className="font-semibold">Ngày tạo:</span> {selectedZoneForDetail?.createdDate || "N/A"}</Typography>
            </div>
            
            {/* Danh sách Thiết bị */}
            <div>
                <Typography variant="h6" color="blue-gray" className="border-b pb-1 mb-2">Danh sách Thiết bị ({devicesInSelectedZone.length})</Typography>
                {devicesInSelectedZone.length > 0 ? (
                    <div className="overflow-x-auto"><table className="w-full min-w-[500px] table-auto">
                        <thead><tr>{TABLE_HEAD_DEVICES_IN_ZONE.map(head => <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50/50 py-2 px-3 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-500">{head}</Typography></th>)}</tr></thead>
                        <tbody>{devicesInSelectedZone.map(device => { const statusStyle = getDeviceStatusChip(device.status); return ( <tr key={device.id} className="hover:bg-gray-50"><td className="py-2 px-3 border-b border-blue-gray-50"><Typography variant="small" color="blue-gray" className="font-semibold">{device.name}</Typography></td><td className="py-2 px-3 border-b border-blue-gray-50"><Typography className="text-xs font-normal text-blue-gray-500">{device.type}</Typography></td><td className="py-2 px-3 border-b border-blue-gray-50"><Typography className="text-xs font-normal text-blue-gray-500">{device.id}</Typography></td><td className="py-2 px-3 border-b border-blue-gray-50"><Chip variant="ghost" size="sm" color={statusStyle.color} value={statusStyle.text} icon={statusStyle.icon} className="text-xs"/></td></tr> ); })}</tbody>
                    </table></div>
                ) : ( <Typography className="text-sm text-gray-600 italic">Khu vực này chưa có thiết bị nào được gán.</Typography> )}
            </div>

            {/* Phần Hiển thị Cây trồng */}
            <div>
                <Typography variant="h6" color="blue-gray" className="border-b pb-1 mb-2">Cây trồng trong Khu vực ({cropsInSelectedZone.length})</Typography>
                {cropsInSelectedZone.length > 0 ? (
                     <div className="overflow-x-auto"><table className="w-full min-w-[600px] table-auto">
                        <thead><tr>{TABLE_HEAD_CROPS_IN_ZONE.map(head => <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50/50 py-2 px-3 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-500">{head}</Typography></th>)}</tr></thead>
                        <tbody>{cropsInSelectedZone.map(crop => ( <tr key={crop.id} className="hover:bg-gray-50"><td className="py-2 px-3 border-b border-blue-gray-50"><Typography variant="small" color="blue-gray" className="font-semibold">{crop.cropName}</Typography></td><td className="py-2 px-3 border-b border-blue-gray-50"><Typography className="text-xs font-normal text-blue-gray-500">{crop.variety}</Typography></td><td className="py-2 px-3 border-b border-blue-gray-50"><Typography className="text-xs font-normal text-blue-gray-500">{crop.plantDate}</Typography></td><td className="py-2 px-3 border-b border-blue-gray-50"><Typography className="text-xs font-normal text-blue-gray-500">{crop.expectedHarvestDate}</Typography></td><td className="py-2 px-3 border-b border-blue-gray-50"><Typography className="text-xs font-normal text-blue-gray-500 max-w-xs truncate" title={crop.notes}>{crop.notes}</Typography></td></tr> ))}</tbody>
                    </table></div>
                ) : ( <Typography className="text-sm text-gray-600 italic">Chưa có thông tin cây trồng nào cho khu vực này.</Typography> )}
            </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="blue-gray" onClick={handleCloseZoneDetailDialog}>Đóng</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ZoneManagement;