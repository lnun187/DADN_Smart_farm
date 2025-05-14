import React, { useState, useEffect } from "react"; 
import {
  Card, CardHeader, CardBody, Typography, Avatar, Chip, Tooltip, IconButton,
  Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Checkbox, 
  Select, Option, Alert, 
} from "@material-tailwind/react";
import {
  PencilIcon, UserPlusIcon, LockClosedIcon, LockOpenIcon, TrashIcon, CheckCircleIcon 
} from "@heroicons/react/24/solid";

// Import context và data
import { useMaterialTailwindController } from "@/context";
import { staffData as allStaffData } from "@/data/staff-management-data.js"; 
import { zoneData } from "@/data/zone-management-data.js"; // Để lấy tên khu vực

const ALL_POSSIBLE_ROLES = ["Nhân viên", "Giám sát", "Admin"]; 

export function UserManagement() {
  // === LẤY selectedRegion TỪ CONTEXT ===
  const [controller] = useMaterialTailwindController();
  const { selectedRegion } = controller; 

  // === STATE QUẢN LÝ ===
  const [currentStaffList, setCurrentStaffList] = useState(allStaffData); 
  const [openAddDialog, setOpenAddDialog] = useState(false);           
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);       
  const [staffToDelete, setStaffToDelete] = useState(null);             
  const [openEditDialog, setOpenEditDialog] = useState(false);         
  const [staffToEdit, setStaffToEdit] = useState(null);               
  const [editFormData, setEditFormData] = useState({ email: '', name: '', joinedDate: '', role: [], status: '', zoneId: '' }); 
  const [addStaffForm, setAddStaffForm] = useState({ name: "", email: "", password: "", role: ["Nhân viên"], status: "active", zoneId: ""});
  const [alertInfo, setAlertInfo] = useState({ open: false, color: 'green', message: '' });

  // === useEffect ĐỂ LỌC DANH SÁCH NHÂN VIÊN KHI selectedRegion THAY ĐỔI ===
  useEffect(() => {
    console.log("UserManagement - Selected Region:", selectedRegion);
    if (selectedRegion === "all" || !selectedRegion) {
      setCurrentStaffList(allStaffData); 
    } else {
      setCurrentStaffList(allStaffData.filter(staff => staff.zoneId === selectedRegion));
    }
    // Đóng các dialog khi đổi region
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
  }, [selectedRegion]); 

  // === HÀM TIỆN ÍCH CHO ALERT ===
  const showAlert = (message, color = 'green') => { setAlertInfo({ open: true, color, message }); setTimeout(() => { setAlertInfo(prev => ({ ...prev, open: false })); }, 3000); };
  const hideAlert = () => { if (alertInfo.open) { setAlertInfo(prev => ({ ...prev, open: false })); }};

  // === HÀM XỬ LÝ DIALOGS ===

  const handleOpenAddDialog = () => { 
      hideAlert(); 
      setAddStaffForm({ 
          name: "", email: "", password: "", role: ["Nhân viên"], status: "active",
          zoneId: (selectedRegion && selectedRegion !== "all") ? selectedRegion : "" 
      });
      setOpenAddDialog(true); 
      setOpenEditDialog(false); setOpenDeleteDialog(false);
  };
  const handleCloseAddDialog = () => setOpenAddDialog(false);
  const handleAddStaffFormChange = (e) => { const { name, value } = e.target; setAddStaffForm(prev => ({ ...prev, [name]: value })); };
  const handleAddStaffSelectChange = (fieldName, value) => { setAddStaffForm(prev => ({ ...prev, [fieldName]: value })); };
  const handleAddStaffRoleCheckboxChange = (roleName) => { setAddStaffForm(prev => { const currentRoles = prev.role; const newRoles = currentRoles.includes(roleName) ? currentRoles.filter(r => r !== roleName) : [...currentRoles, roleName]; return { ...prev, role: newRoles }; }); };
  const handleAddNewStaff = () => {
    if (!addStaffForm.name || !addStaffForm.email || !addStaffForm.password || !addStaffForm.zoneId) {
        showAlert("Vui lòng điền đủ Tên, Email, Mật khẩu và chọn Khu vực.", "red");
        return;
    }
    const newStaffMember = {
        img: "/img/default-avatar.png", 
        ...addStaffForm, 
        joinedDate: new Date().toISOString().split('T')[0] 
    };
    // Cập nhật vào allStaffData để các lần filter sau lấy đúng
    const updatedAllStaffData = [newStaffMember, ...allStaffData];
    while(allStaffData.length > 0) { allStaffData.pop(); } 
    updatedAllStaffData.forEach(s => allStaffData.push(s)); 

    if (selectedRegion === "all" || selectedRegion === newStaffMember.zoneId) {
      setCurrentStaffList(prevList => [newStaffMember, ...prevList]); 
    } else {
      // Nếu đang xem khu vực khác, chỉ cần báo thành công, danh sách không đổi
      // nhưng vì useEffect sẽ chạy lại nên nó sẽ tự lọc đúng
    }
    showAlert(`Đã thêm nhân viên "${addStaffForm.name}" thành công!`); 
    handleCloseAddDialog(); 
  };

  // --- Dialog Xóa ---
  const handleOpenDeleteDialog = (staff) => { hideAlert(); setStaffToDelete(staff); setOpenDeleteDialog(true); setOpenAddDialog(false); setOpenEditDialog(false); };
  const handleCloseDeleteDialog = () => { setStaffToDelete(null); setOpenDeleteDialog(false); };
  const handleConfirmDelete = () => { 
    if (staffToDelete) { 
      const updatedAllStaffData = allStaffData.filter(staff => staff.email !== staffToDelete.email);
      while(allStaffData.length > 0) { allStaffData.pop(); } 
      updatedAllStaffData.forEach(s => allStaffData.push(s)); 
      
      setCurrentStaffList(prevList => prevList.filter(staff => staff.email !== staffToDelete.email)); 
      showAlert(`Đã xóa nhân viên ${staffToDelete.name} thành công!`); 
      handleCloseDeleteDialog(); 
    }
  };

  // --- Dialog Sửa ---
  const handleOpenEditStaffDialog = (staff) => {
    hideAlert();
    setStaffToEdit(staff); 
    setEditFormData({ 
        email: staff.email, name: staff.name, joinedDate: staff.joinedDate, 
        role: [...staff.role], status: staff.status, zoneId: staff.zoneId || "" 
    });
    setOpenEditDialog(true); 
    setOpenAddDialog(false); setOpenDeleteDialog(false);
  };
  const handleCloseEditStaffDialog = () => { setStaffToEdit(null); setOpenEditDialog(false); };
  const handleEditStaffFormChange = (e) => { const { name, value } = e.target; setEditFormData(prev => ({ ...prev, [name]: value })); };
  const handleRoleCheckboxChange = (roleName) => { setEditFormData(prev => { const currentRoles = prev.role; const newRoles = currentRoles.includes(roleName) ? currentRoles.filter(r => r !== roleName) : [...currentRoles, roleName]; return { ...prev, role: newRoles }; }); };
  const handleEditStaffSelectChange = (name, value) => { setEditFormData(prev => ({ ...prev, [name]: value })); };
  const handleConfirmEditStaff = () => {
    if (staffToEdit) {
      if (!editFormData.zoneId){ showAlert("Vui lòng chọn Khu vực Phụ trách.", "red"); return; }
      const updatedStaffMember = { ...staffToEdit, ...editFormData };
      
      const indexInAll = allStaffData.findIndex(s => s.email === staffToEdit.email);
      if (indexInAll !== -1) { allStaffData[indexInAll] = updatedStaffMember; }

      // Cập nhật currentStaffList:
      // Nếu sau khi sửa, zoneId của staff không còn khớp với selectedRegion (và selectedRegion không phải "all") thì xóa khỏi list hiển thị
      // Ngược lại, nếu khớp hoặc đang xem "all", thì cập nhật thông tin
      if (selectedRegion !== "all" && updatedStaffMember.zoneId !== selectedRegion) {
           setCurrentStaffList(prevList => prevList.filter(s => s.email !== updatedStaffMember.email));
      } else {
           setCurrentStaffList(prevList => prevList.map(s => s.email === staffToEdit.email ? updatedStaffMember : s));
      }

      showAlert("Cập nhật thông tin nhân viên thành công!"); 
      handleCloseEditStaffDialog(); 
    }
  };

  // --- Khóa/Mở khóa ---
  const handleToggleBlockStaff = (email, currentStatus) => {
    const action = currentStatus === 'active' ? 'Khóa' : 'Mở khóa';
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    
    // Cập nhật allStaffData
    const indexInAll = allStaffData.findIndex(s => s.email === email);
    if (indexInAll !== -1) { allStaffData[indexInAll].status = newStatus; }

    setCurrentStaffList(prevList => prevList.map(staff => staff.email === email ? { ...staff, status: newStatus } : staff ));
    showAlert(action === 'Khóa' ? `Đã khóa tài khoản ${email}!` : `Đã mở khóa tài khoản ${email}!`); 
  };

  // === CẤU HÌNH BẢNG ===
  const showZoneColumnInTable = selectedRegion === "all" || !selectedRegion;
  const TABLE_HEAD = ["Nhân viên", "Chức vụ", 
    ...(showZoneColumnInTable ? ["Khu vực Phụ trách"] : []),
    "Trạng thái", "Ngày tham gia", "Hành động"
  ];

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
                <Typography variant="h6" color="white">
                    Danh sách Nhân viên {selectedRegion && selectedRegion !== "all" ? `(${zoneData.find(z => z.id === selectedRegion)?.name || ''})` : '(Tất cả Khu vực)'}
                </Typography>
                <Button className="flex items-center gap-3" color="white" size="sm" onClick={handleOpenAddDialog}><UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm Nhân viên</Button>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead><tr>{TABLE_HEAD.map((head) => (<th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography></th>))}</tr></thead>
                    <tbody>
                        {currentStaffList.length > 0 ? currentStaffList.map(
                            (staffItem, key) => { 
                                const { img, name, email, role, status, joinedDate, zoneId } = staffItem;
                                const className = `py-3 px-5 ${key === currentStaffList.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                                const zoneName = zoneData.find(z => z.id === zoneId)?.name || "Chưa gán";
                                return (
                                    <tr key={email}>
                                        <td className={className}><div className="flex items-center gap-4"><Avatar src={img} alt={name} size="sm" variant="rounded" /><div><Typography variant="small" color="blue-gray" className="font-semibold">{name}</Typography><Typography className="text-xs font-normal text-blue-gray-500">{email}</Typography></div></div></td>
                                        <td className={className}>{role.map((r, index) => ( <Chip key={index} variant="ghost" size="sm" value={r} className="mr-1 mb-1 inline-block text-xs"/>))}</td>
                                        {showZoneColumnInTable && (
                                            <td className={className}><Typography className="text-xs font-normal text-blue-gray-500">{zoneName}</Typography></td>
                                        )}
                                        <td className={className}><Chip variant="gradient" color={status === "active" ? "green" : "blue-gray"} value={status === "active" ? "Hoạt động" : "Đã khóa"} className="py-0.5 px-2 text-[11px] font-medium w-fit"/></td>
                                        <td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{joinedDate}</Typography></td>
                                        <td className={`${className} flex gap-1`}> 
                                            <Tooltip content="Sửa thông tin"><IconButton variant="text" color="blue-gray" size="sm" onClick={() => handleOpenEditStaffDialog(staffItem)}><PencilIcon className="h-4 w-4" /></IconButton></Tooltip>
                                            <Tooltip content={status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}><IconButton variant="text" color={status === "active" ? "deep-orange" : "green"} size="sm" onClick={() => handleToggleBlockStaff(email, status)}>{status === "active" ? <LockClosedIcon className="h-4 w-4" /> : <LockOpenIcon className="h-4 w-4" />}</IconButton></Tooltip>
                                            <Tooltip content="Xóa nhân viên"><IconButton variant="text" color="red" size="sm" onClick={() => handleOpenDeleteDialog(staffItem)}><TrashIcon className="h-4 w-4" /></IconButton></Tooltip>
                                        </td>
                                    </tr>
                                );
                            }
                        ) : (
                            <tr><td colSpan={TABLE_HEAD.length} className="py-4 px-5 text-center text-blue-gray-500">Không có nhân viên nào {selectedRegion && selectedRegion !== "all" ? `trong ${zoneData.find(z => z.id === selectedRegion)?.name || 'khu vực này'}` : "phù hợp"}.</td></tr>
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
      </div>

      {/* Dialog Thêm Nhân viên */}
      <Dialog open={openAddDialog} handler={handleCloseAddDialog}>
         <DialogHeader>Thêm Nhân viên Mới</DialogHeader>
          <DialogBody divider className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            <Input label="Họ và Tên" name="name" value={addStaffForm.name} onChange={handleAddStaffFormChange} required/> 
            <Input type="email" label="Email" name="email" value={addStaffForm.email} onChange={handleAddStaffFormChange} required/> 
            <Input type="password" label="Mật khẩu" name="password" value={addStaffForm.password} onChange={handleAddStaffFormChange} required/>
            <Select 
                label="Khu vực Phụ trách" 
                name="zoneId" 
                value={addStaffForm.zoneId} 
                onChange={(value) => handleAddStaffSelectChange('zoneId', value)}
                disabled={!!(selectedRegion && selectedRegion !== "all")} 
                required
            >
                <Option value="">-- Chọn Khu vực --</Option> {/* Thêm option trống */}
                {zoneData.map(zone => <Option key={zone.id} value={zone.id}>{zone.name}</Option>)}
            </Select>
             {/* Có thể thêm Checkbox/Select cho Role và Status nếu muốn set ngay khi thêm */}
            <Typography variant="small" color="red" className="mt-2">*Lưu ý: Mật khẩu sẽ được gửi đi.</Typography>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleCloseAddDialog} className="mr-1"><span>Hủy</span></Button>
            <Button variant="gradient" color="green" onClick={handleAddNewStaff}><span>Thêm</span></Button>
          </DialogFooter>
       </Dialog>

      {/* Dialog Xóa */}
      <Dialog open={openDeleteDialog} handler={handleCloseDeleteDialog} size="xs">
        <DialogHeader>Xác nhận Xóa</DialogHeader>
        <DialogBody divider>Bạn có chắc chắn muốn xóa nhân viên <span className="font-semibold">{staffToDelete?.name}</span> ({staffToDelete?.email}) không? Hành động này không thể hoàn tác.</DialogBody>
        <DialogFooter>
          <Button variant="text" color="blue-gray" onClick={handleCloseDeleteDialog} className="mr-1"><span>Hủy</span></Button>
          <Button variant="gradient" color="red" onClick={handleConfirmDelete}><span>Xác nhận Xóa</span></Button>
        </DialogFooter>
      </Dialog>

      {/* Dialog Sửa Nhân viên */}
       <Dialog open={openEditDialog} handler={handleCloseEditStaffDialog}>
         <DialogHeader>Chỉnh sửa thông tin Nhân viên</DialogHeader>
         <DialogBody divider className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
           <Input label="Họ và Tên" name="name" value={editFormData.name} onChange={handleEditStaffFormChange} />
           <Input label="Email" name="email" value={editFormData.email} disabled />
           <Select 
                label="Khu vực Phụ trách" 
                name="zoneId" 
                value={editFormData.zoneId} 
                onChange={(value) => handleEditStaffSelectChange('zoneId', value)}
            >
                <Option value="">-- Bỏ gán Khu vực --</Option> {/* Option bỏ gán */}
                {zoneData.map(zone => <Option key={zone.id} value={zone.id}>{zone.name}</Option>)}
           </Select>
           <div><Typography variant="small" color="blue-gray" className="mb-1 font-medium">Chức vụ / Vai trò</Typography><div className="grid grid-cols-2 gap-x-4 gap-y-1">{ALL_POSSIBLE_ROLES.map((roleName) => (<Checkbox key={roleName} label={<Typography variant="small">{roleName}</Typography>} checked={editFormData.role.includes(roleName)} onChange={() => handleRoleCheckboxChange(roleName)} containerProps={{ className: "-ml-2.5 -mt-2.5" }}/>))}</div></div>
           <Input type="date" label="Ngày tham gia" name="joinedDate" value={editFormData.joinedDate} onChange={handleEditStaffFormChange} />
           <Select label="Trạng thái" name="status" value={editFormData.status} onChange={(value) => handleEditStaffSelectChange('status', value)}><Option value="active">Hoạt động</Option><Option value="blocked">Đã khóa</Option></Select>
         </DialogBody>
         <DialogFooter>
           <Button variant="text" color="red" onClick={handleCloseEditStaffDialog} className="mr-1"><span>Hủy</span></Button>
           <Button variant="gradient" color="green" onClick={handleConfirmEditStaff}><span>Lưu thay đổi</span></Button>
         </DialogFooter>
       </Dialog>
    </>
  );
}

export default UserManagement;