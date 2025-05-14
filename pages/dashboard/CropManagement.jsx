import React, { useState, useEffect } from "react";
import {
  Card, CardHeader, CardBody, Typography, Tooltip, IconButton, Button,
  Dialog, DialogHeader, DialogBody, DialogFooter, Input, Alert, Switch,
  Select, Option, Chip, Textarea,
} from "@material-tailwind/react";
import {
  PencilIcon, TrashIcon, PlusIcon, CheckCircleIcon, 
  BeakerIcon, 
} from "@heroicons/react/24/solid";


import { useMaterialTailwindController } from "@/context";
import { definedCropsData as allDefinedCropsData } from "@/data/defined-crops-data.js"; 
import { zoneData } from "@/data/zone-management-data.js"; 

export function CropManagement() {
  const [controller] = useMaterialTailwindController();
  const { selectedRegion } = controller; 

  const [currentCropProfiles, setCurrentCropProfiles] = useState(allDefinedCropsData);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [cropToDelete, setCropToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [cropToEdit, setCropToEdit] = useState(null); 
  
  const initialFormData = {
    tree_id: '', name: '', alive: true, plantingTime: '',
    tempMin: '', tempMax: '', humidityMin: '', humidityMax: '',
    lightMin: '', lightMax: '', soilMoistureMin: '', soilMoistureMax: '',
    zoneId: '', 
  };
  const [editFormData, setEditFormData] = useState(initialFormData); 
  const [addFormData, setAddFormData] = useState(initialFormData); 
  
  const [alertInfo, setAlertInfo] = useState({ open: false, color: 'green', message: '' });

  useEffect(() => {
    console.log("CropProfilesManagement - Selected Region:", selectedRegion);
    if (selectedRegion === "all" || !selectedRegion) {
      setCurrentCropProfiles(allDefinedCropsData); 
    } else {
      // Lọc profile cây theo zoneId
      setCurrentCropProfiles(
        allDefinedCropsData.filter(crop => crop.zoneId === selectedRegion || !crop.zoneId) // Hiển thị cả những cây chưa gán zoneId
      );
    }

    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
  }, [selectedRegion]); 

    const showAlert = (message, color = 'green') => { setAlertInfo({ open: true, color, message }); setTimeout(() => { setAlertInfo(prev => ({ ...prev, open: false })); }, 3000); };
    const hideAlert = () => { if (alertInfo.open) { setAlertInfo(prev => ({ ...prev, open: false })); }};

  const handleOpenAddDialog = () => { 
    hideAlert(); 
    setAddFormData({
        ...initialFormData, 
        zoneId: (selectedRegion && selectedRegion !== "all") ? selectedRegion : "" 
    }); 
    setOpenAddDialog(true); 
    setOpenEditDialog(false); setOpenDeleteDialog(false); 
  };
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const handleAddFormSelectChange = (fieldName, value) => { 
    setAddFormData(prev => ({ ...prev, [fieldName]: value }));
  };
  const handleAddFormSwitchChange = (e) => { 
    const { name, checked } = e.target;
    setAddFormData(prev => ({ ...prev, [name]: checked }));
  };
    const handleAddFormChange = (e) => { const { name, value, type, checked } = e.target; setAddFormData(prev => ({ ...prev, [name]: type === 'checkbox' || type === 'switch' ? checked : value })); };


  const handleAddNewCropProfile = () => {
    if (!addFormData.name.trim() || !addFormData.tree_id.trim()) {
        showAlert("Mã cây và Tên cây không được để trống.", "red"); return;
    }
    if (!addFormData.zoneId && addFormData.zoneId !== null) { 
        showAlert("Vui lòng chọn Khu vực áp dụng.", "red"); return;
    }

    const newCropProfile = { 
        ...addFormData,
        tempMin: Number(addFormData.tempMin) || 0, tempMax: Number(addFormData.tempMax) || 0,
        humidityMin: Number(addFormData.humidityMin) || 0, humidityMax: Number(addFormData.humidityMax) || 0,
        lightMin: Number(addFormData.lightMin) || 0, lightMax: Number(addFormData.lightMax) || 0,
        soilMoistureMin: Number(addFormData.soilMoistureMin) || 0, soilMoistureMax: Number(addFormData.soilMoistureMax) || 0,
    };

    allDefinedCropsData.unshift(newCropProfile);
    // Cập nhật currentCropProfiles dựa trên selectedRegion
    if (selectedRegion === "all" || !selectedRegion || newCropProfile.zoneId === selectedRegion || !newCropProfile.zoneId) {
      setCurrentCropProfiles(prev => [newCropProfile, ...prev]);
    }
    showAlert(`Đã thêm profile cây "${addFormData.name}" thành công!`); 
    handleCloseAddDialog(); 
  };

    const handleOpenDeleteDialog = (crop) => { hideAlert(); setCropToDelete(crop); setOpenDeleteDialog(true); setOpenAddDialog(false); setOpenEditDialog(false);};
    const handleCloseDeleteDialog = () => { setCropToDelete(null); setOpenDeleteDialog(false); };
    const handleConfirmDelete = () => { if (cropToDelete) { const updatedAllData = allDefinedCropsData.filter(c => c.tree_id !== cropToDelete.tree_id); while(allDefinedCropsData.length > 0) { allDefinedCropsData.pop(); } updatedAllData.forEach(c => allDefinedCropsData.push(c)); setCurrentCropProfiles(prev => prev.filter(c => c.tree_id !== cropToDelete.tree_id)); showAlert(`Đã xóa profile cây "${cropToDelete.name}" thành công!`); handleCloseDeleteDialog(); }};


  const handleOpenEditDialog = (crop) => {
    hideAlert();
    setCropToEdit(crop); 
    setEditFormData({ ...crop, zoneId: crop.zoneId || "" }); 
    setOpenEditDialog(true); 
    setOpenAddDialog(false); setOpenDeleteDialog(false);
  };

  const handleEditFormSelectChange = (fieldName, value) => { 
    setEditFormData(prev => ({ ...prev, [fieldName]: value }));
  };
  const handleEditFormSwitchChange = (e) => { 
    const { name, checked } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: checked }));
  };

    const handleCloseEditDialog = () => { setCropToEdit(null); setOpenEditDialog(false); };
    const handleEditFormChange = (e) => { const { name, value, type, checked } = e.target; setEditFormData(prev => ({ ...prev, [name]: type === 'checkbox' || type === 'switch' ? checked : value })); };

  const handleConfirmEdit = () => { 
    if (cropToEdit) { 
      if(!editFormData.name.trim()){ showAlert("Tên cây không được để trống.", "red"); return;} 
      if (!editFormData.zoneId && editFormData.zoneId !== null) { showAlert("Vui lòng chọn Khu vực áp dụng.", "red"); return; }

        const updatedCropProfile = { 
            ...editFormData,
            tempMin: Number(editFormData.tempMin) || 0, tempMax: Number(editFormData.tempMax) || 0,
            humidityMin: Number(editFormData.humidityMin) || 0, humidityMax: Number(editFormData.humidityMax) || 0,
            lightMin: Number(editFormData.lightMin) || 0, lightMax: Number(editFormData.lightMax) || 0,
            soilMoistureMin: Number(editFormData.soilMoistureMin) || 0, soilMoistureMax: Number(editFormData.soilMoistureMax) || 0,
        };

      const indexInAll = allDefinedCropsData.findIndex(c => c.tree_id === cropToEdit.tree_id);
      if (indexInAll !== -1) { allDefinedCropsData[indexInAll] = updatedCropProfile; }
      
      if (selectedRegion === "all" || !selectedRegion || updatedCropProfile.zoneId === selectedRegion || !updatedCropProfile.zoneId) {
          setCurrentCropProfiles(prevList => prevList.map(c => c.tree_id === cropToEdit.tree_id ? updatedCropProfile : c )); 
      } else {
          setCurrentCropProfiles(prevList => prevList.filter(c => c.tree_id !== cropToEdit.tree_id));
      }
      showAlert(`Cập nhật profile cây "${editFormData.name}" thành công!`); 
      handleCloseEditDialog(); 
    }
  };
  
  const showZoneIdColumnInTable = selectedRegion === "all" || !selectedRegion;
  const TABLE_HEAD = [
    "Mã Cây", "Tên Cây trồng", 
    ...(showZoneIdColumnInTable ? ["Khu vực Áp dụng"] : []), // Thêm cột Khu vực có điều kiện
    "Nhiệt độ (°C)", "Độ ẩm KK (%)", 
    "Ánh sáng (Lux)", "Độ ẩm Đất (%)", "Alive", "Hành động"
  ];

  // === RENDER COMPONENT ===
  return (
    <>
      {/* Alert Chung */}
      <div className="fixed top-4 right-4 z-[9999] w-auto max-w-md"><Alert open={alertInfo.open} /* ... */ >{alertInfo.message}</Alert></div>

      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
            <CardHeader variant="gradient" className="mb-8 p-6 flex justify-between items-center bg-gradient-to-tr from-green-600 to-green-300">
                <Typography variant="h6" color="white">
                    Quản lý Cây trồng {selectedRegion && selectedRegion !== "all" ? `(${zoneData.find(z => z.id === selectedRegion)?.name || selectedRegion})` : "(Tất cả Khu vực)"}
                </Typography>
                <Button className="flex items-center gap-3" color="white" size="sm" onClick={handleOpenAddDialog}><PlusIcon strokeWidth={3} className="h-4 w-4" /> Thêm Profile Cây</Button>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[1000px] table-auto">
                    <thead><tr>{TABLE_HEAD.map((head) => (<th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography></th>))}</tr></thead>
                    <tbody>
                        {currentCropProfiles.map(
                            (cropItem, key) => { 
                                const { tree_id, name, alive, plantingTime, tempMin, tempMax, humidityMin, humidityMax, lightMin, lightMax, soilMoistureMin, soilMoistureMax, zoneId } = cropItem;
                                const className = `py-3 px-5 ${key === currentCropProfiles.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                                const appliedZoneName = zoneData.find(z => z.id === zoneId)?.name || (zoneId ? "Khu vực không xác định" : "Chung / Chưa gán");
                                return (
                                    <tr key={tree_id}>
                                        <td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{tree_id}</Typography></td>
                                        <td className={className}><Typography variant="small" color="blue-gray" className="font-semibold">{name}</Typography></td>
                                        {showZoneIdColumnInTable && (
                                            <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{appliedZoneName}</Typography></td>
                                        )}
                                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{tempMin} - {tempMax}</Typography></td>
                                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{humidityMin} - {humidityMax}</Typography></td>
                                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{lightMin} - {lightMax}</Typography></td>
                                        <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{soilMoistureMin} - {soilMoistureMax}</Typography></td>
                                        <td className={className}><Chip color={alive ? "green" : "red"} value={alive ? "Yes" : "No"} size="sm" className="text-xs w-fit" /></td>
                                        <td className={`${className} flex gap-1`}> 
                                            {/* Nút xem chi tiết có thể không cần thiết nếu bảng đã đủ thông tin */}
                                            <Tooltip content="Sửa Profile"><IconButton variant="text" color="blue-gray" size="sm" onClick={() => handleOpenEditDialog(cropItem)}><PencilIcon className="h-4 w-4" /></IconButton></Tooltip>
                                            <Tooltip content="Xóa Profile"><IconButton variant="text" color="red" size="sm" onClick={() => handleOpenDeleteDialog(cropItem)}><TrashIcon className="h-4 w-4" /></IconButton></Tooltip>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                         {currentCropProfiles.length === 0 && (
                            <tr><td colSpan={TABLE_HEAD.length} className="py-4 px-5 text-center text-blue-gray-500">Không có profile cây trồng nào {selectedRegion && selectedRegion !== "all" ? `phù hợp với Khu vực ${zoneData.find(z => z.id === selectedRegion)?.name || selectedRegion}` : "được định nghĩa"}.</td></tr>
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
      </div>

      {/* Dialog Thêm Profile Cây */}
      <Dialog open={openAddDialog} handler={handleCloseAddDialog} size="lg">
         <DialogHeader>Thêm Profile Cây trồng Mới</DialogHeader>
          <DialogBody divider className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-4">
            <Input label="Mã Cây (ID)" name="tree_id" value={addFormData.tree_id} onChange={handleAddFormChange} required /> 
            <Input label="Tên Cây trồng" name="name" value={addFormData.name} onChange={handleAddFormChange} required/> 
            <Textarea label="Mô tả/Thời gian trồng" name="plantingTime" value={addFormData.plantingTime} onChange={handleAddFormChange} rows={2}/>
            {/* Select Khu vực áp dụng */}
            <Select 
                label="Khu vực Áp dụng (Tùy chọn)" 
                name="zoneId" 
                value={addFormData.zoneId} 
                onChange={(value) => handleAddFormSelectChange('zoneId', value)}
                disabled={!!(selectedRegion && selectedRegion !== "all")} 
            >
                <Option value="">-- Chung (Không chọn khu vực) --</Option>
                {zoneData.map(zone => <Option key={zone.id} value={zone.id}>{zone.name}</Option>)}
            </Select>
            <div className="md:col-span-2"><hr className="my-2"/></div>
            <Input type="number" label="Nhiệt độ Min (°C)" name="tempMin" value={addFormData.tempMin} onChange={handleAddFormChange} />
            <Input type="number" label="Nhiệt độ Max (°C)" name="tempMax" value={addFormData.tempMax} onChange={handleAddFormChange} />
            <Input type="number" label="Độ ẩm KK Min (%)" name="humidityMin" value={addFormData.humidityMin} onChange={handleAddFormChange} />
            <Input type="number" label="Độ ẩm KK Max (%)" name="humidityMax" value={addFormData.humidityMax} onChange={handleAddFormChange} />
            <Input type="number" label="Ánh sáng Min (Lux)" name="lightMin" value={addFormData.lightMin} onChange={handleAddFormChange} />
            <Input type="number" label="Ánh sáng Max (Lux)" name="lightMax" value={addFormData.lightMax} onChange={handleAddFormChange} />
            <Input type="number" label="Độ ẩm Đất Min (%)" name="soilMoistureMin" value={addFormData.soilMoistureMin} onChange={handleAddFormChange} />
            <Input type="number" label="Độ ẩm Đất Max (%)" name="soilMoistureMax" value={addFormData.soilMoistureMax} onChange={handleAddFormChange} />
            <div className="md:col-span-2 flex items-center">
                <Switch id="add-alive-crop" name="alive" label="Còn sống/Đã chết?" checked={addFormData.alive} onChange={handleAddFormChange} color="green"/>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleCloseAddDialog} className="mr-1"><span>Hủy</span></Button>
            <Button variant="gradient" color="green" onClick={handleAddNewCropProfile}><span>Thêm Profile</span></Button>
          </DialogFooter>
       </Dialog>

      {/* Dialog Xóa */}
      <Dialog open={openDeleteDialog} handler={handleCloseDeleteDialog} size="xs">
        {/* ... */}
      </Dialog>

       {/* Dialog Sửa Profile Cây */}
       <Dialog open={openEditDialog} handler={handleCloseEditDialog} size="lg">
         <DialogHeader>Chỉnh sửa Profile Cây trồng</DialogHeader>
         <DialogBody divider className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-4">
           <Input label="Mã Cây (ID)" name="tree_id" value={editFormData.tree_id} disabled /> 
           <Input label="Tên Cây trồng" name="name" value={editFormData.name} onChange={handleEditFormChange} required/>
           <Textarea label="Mô tả/Thời gian trồng" name="plantingTime" value={editFormData.plantingTime} onChange={handleEditFormChange} rows={2}/>
           <Select 
                label="Khu vực Áp dụng (Tùy chọn)" 
                name="zoneId" 
                value={editFormData.zoneId} 
                onChange={(value) => handleEditFormSelectChange('zoneId', value)}
            >
                <Option value="">-- Chung (Bỏ gán Khu vực) --</Option>
                {zoneData.map(zone => <Option key={zone.id} value={zone.id}>{zone.name}</Option>)}
           </Select>
           <div className="md:col-span-2"><hr className="my-2"/></div>
           <Input type="number" label="Nhiệt độ Min (°C)" name="tempMin" value={editFormData.tempMin} onChange={handleEditFormChange} />
           <Input type="number" label="Nhiệt độ Max (°C)" name="tempMax" value={editFormData.tempMax} onChange={handleEditFormChange} />
           <Input type="number" label="Độ ẩm KK Min (%)" name="humidityMin" value={editFormData.humidityMin} onChange={handleEditFormChange} />
           <Input type="number" label="Độ ẩm KK Max (%)" name="humidityMax" value={editFormData.humidityMax} onChange={handleEditFormChange} />
           <Input type="number" label="Ánh sáng Min (Lux)" name="lightMin" value={editFormData.lightMin} onChange={handleEditFormChange} />
           <Input type="number" label="Ánh sáng Max (Lux)" name="lightMax" value={editFormData.lightMax} onChange={handleEditFormChange} />
           <Input type="number" label="Độ ẩm Đất Min (%)" name="soilMoistureMin" value={editFormData.soilMoistureMin} onChange={handleEditFormChange} />
           <Input type="number" label="Độ ẩm Đất Max (%)" name="soilMoistureMax" value={editFormData.soilMoistureMax} onChange={handleEditFormChange} />
            <div className="md:col-span-2 flex items-center">
                <Switch id="edit-alive-crop" name="alive" label="Tình trạng hiện tại?" checked={editFormData.alive} onChange={handleEditFormChange} color="green"/>
            </div>
         </DialogBody>
         <DialogFooter>
           <Button variant="text" color="red" onClick={handleCloseEditDialog} className="mr-1"><span>Hủy</span></Button>
           <Button variant="gradient" color="green" onClick={handleConfirmEdit}><span>Lưu thay đổi</span></Button>
         </DialogFooter>
       </Dialog>
        {/* BEGIN DIALOGS XÓA */}
        <Dialog open={openDeleteDialog} handler={handleCloseDeleteDialog} size="xs"><DialogHeader>Xác nhận Xóa Profile Cây trồng</DialogHeader><DialogBody divider>Bạn có chắc chắn muốn xóa profile cho cây <span className="font-semibold">{cropToDelete?.name}</span> (ID: {cropToDelete?.tree_id}) không?</DialogBody><DialogFooter><Button variant="text" color="blue-gray" onClick={handleCloseDeleteDialog} className="mr-1"><span>Hủy</span></Button><Button variant="gradient" color="red" onClick={handleConfirmDelete}><span>Xác nhận Xóa</span></Button></DialogFooter></Dialog>
        {/* END DIALOGS XÓA */}
    </>
  );
}

export default CropManagement;