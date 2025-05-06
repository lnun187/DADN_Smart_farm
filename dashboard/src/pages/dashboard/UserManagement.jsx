import React, { useState } from "react"; 
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Checkbox, 
  Select,   
  Option,   
  Alert, // Import Alert
} from "@material-tailwind/react";
import {
  PencilIcon,
  UserPlusIcon,
  LockClosedIcon,
  LockOpenIcon,
  TrashIcon, 
  CheckCircleIcon // Import Icon cho Alert
} from "@heroicons/react/24/solid";

// Import dữ liệu mẫu
import { staffData } from "@/data/staff-management-data.js"; 

const ALL_POSSIBLE_ROLES = ["Nhân viên", "Giám sát khu vực 1", "Giám sát khu vực 2", "Admin"]; 

export function UserManagement() {
  // === STATE QUẢN LÝ ===
  const [currentStaffList, setCurrentStaffList] = useState(staffData); 
  const [openAddDialog, setOpenAddDialog] = useState(false);           
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);       
  const [staffToDelete, setStaffToDelete] = useState(null);             
  const [openEditDialog, setOpenEditDialog] = useState(false);         
  const [staffToEdit, setStaffToEdit] = useState(null);               
  const [editFormData, setEditFormData] = useState({ email: '', name: '', joinedDate: '', role: [], status: '' }); 
  
  // --- STATE CHO ALERT THÔNG BÁO CHUNG ---
  const [alertInfo, setAlertInfo] = useState({ 
      open: false, 
      color: 'green', 
      message: '' 
  });

  // Hàm hiển thị Alert và tự động ẩn
  const showAlert = (message, color = 'green') => {
      setAlertInfo({ open: true, color, message });
      setTimeout(() => {
          setAlertInfo(prev => ({ ...prev, open: false })); // Chỉ tắt cờ open
      }, 3000); // Tự ẩn sau 3 giây
  };

  // Hàm ẩn Alert (khi mở dialog mới hoặc đóng thủ công)
   const hideAlert = () => {
       if (alertInfo.open) { // Chỉ cập nhật nếu đang mở để tránh re-render thừa
          setAlertInfo(prev => ({ ...prev, open: false }));
       }
   };


  // === HÀM XỬ LÝ ===

  // --- Dialog Thêm ---
  const handleOpenAddDialog = () => { hideAlert(); setOpenAddDialog(!openAddDialog); };
  const handleAddNewStaff = () => {
    console.log("Thêm nhân viên mới - Logic API sẽ thêm sau");
    // TODO: Sau khi thêm thành công (API trả về), gọi showAlert
    // showAlert("Thêm nhân viên thành công!"); 
    handleOpenAddDialog(); 
  };

  // --- Dialog Xóa ---
  const handleOpenDeleteDialog = (staff) => { 
      hideAlert(); 
      setStaffToDelete(staff); 
      setOpenDeleteDialog(true); 
  };
  const handleCloseDeleteDialog = () => {
      setStaffToDelete(null); 
      setOpenDeleteDialog(false); 
  };
  const handleConfirmDelete = () => {
    if (staffToDelete) {
      console.log(`Đã xóa nhân viên: ${staffToDelete.name} (${staffToDelete.email}) - Logic API sẽ thêm sau`);
      setCurrentStaffList(prevList => prevList.filter(staff => staff.email !== staffToDelete.email));
      handleCloseDeleteDialog(); 
      // --- Hiển thị Alert Xóa thành công ---
      showAlert(`Đã xóa nhân viên ${staffToDelete.name} thành công!`);
    }
  };

  // --- Dialog Sửa ---
  const handleOpenEditStaffDialog = (staff) => {
    hideAlert();
    setStaffToEdit(staff); 
    setEditFormData({ email: staff.email, name: staff.name, joinedDate: staff.joinedDate, role: [...staff.role], status: staff.status });
    setOpenEditDialog(true); 
  };
  const handleCloseEditStaffDialog = () => {
    setStaffToEdit(null);
    setOpenEditDialog(false);
  };

    const handleEditStaffFormChange = (e) => { const { name, value } = e.target; setEditFormData(prev => ({ ...prev, [name]: value })); };
    const handleRoleCheckboxChange = (roleName) => { setEditFormData(prev => { const currentRoles = prev.role; const newRoles = currentRoles.includes(roleName) ? currentRoles.filter(r => r !== roleName) : [...currentRoles, roleName]; return { ...prev, role: newRoles }; }); };
    const handleEditStaffSelectChange = (name, value) => { setEditFormData(prev => ({ ...prev, [name]: value })); };

  const handleConfirmEditStaff = () => {
    if (staffToEdit) {
      console.log(`Đã sửa nhân viên Email: ${staffToEdit.email}`, editFormData);
      setCurrentStaffList(prevList => 
        prevList.map(staff => 
          staff.email === staffToEdit.email ? { ...staff, ...editFormData } : staff
        )
      );
      handleCloseEditStaffDialog(); 
      // --- Hiển thị Alert Sửa thành công ---
      showAlert("Cập nhật thông tin nhân viên thành công!"); 
    }
  };

  // --- Khóa/Mở khóa ---
  const handleToggleBlockStaff = (email, currentStatus) => {
    const action = currentStatus === 'active' ? 'Khóa' : 'Mở khóa';
    console.log(`${action} nhân viên với email: ${email} - Logic API sẽ thêm sau`);
    setCurrentStaffList(prevList => 
      prevList.map(staff => 
        staff.email === email ? { ...staff, status: staff.status === 'active' ? 'blocked' : 'active' } : staff
      )
    );
    // --- Hiển thị Alert Khóa/Mở khóa thành công ---
    const successMessage = action === 'Khóa' 
      ? `Đã khóa tài khoản ${email} thành công!` 
      : `Đã mở khóa tài khoản ${email} thành công!`;
    showAlert(successMessage); 
  };

  // === CẤU HÌNH BẢNG ===
  const TABLE_HEAD = ["Nhân viên", "Chức vụ", "Trạng thái", "Ngày tham gia", "Hành động"];

  // === RENDER COMPONENT ===
  return (
    <>
      {/* --- ALERT CHUNG CHO CÁC HÀNH ĐỘNG --- */}
      {/* Đặt ở vị trí cố định trên màn hình */}
      <div className="fixed top-4 right-4 z-[9999] w-auto max-w-md"> {/* Tăng z-index */}
           <Alert 
              open={alertInfo.open} 
              color={alertInfo.color}
              icon={<CheckCircleIcon className="mt-px h-6 w-6" />} // Dùng icon chung
              onClose={hideAlert} // Cho phép đóng thủ công bằng hàm hideAlert
              animate={{
                mount: { y: 0 },
                unmount: { y: -100 }, 
              }}
             >
             {alertInfo.message} {/* Hiển thị message từ state */}
           </Alert>
      </div>

      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
           {/* CardHeader */}
           <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
               <Typography variant="h6" color="white">Danh sách Nhân viên</Typography>
               <Button className="flex items-center gap-3" color="white" size="sm" onClick={handleOpenAddDialog}><UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm Nhân viên</Button>
            </CardHeader>
           {/* CardBody và Table */}
           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
             <table className="w-full min-w-[640px] table-auto">
                {/* thead */}
                <thead><tr>{TABLE_HEAD.map((head) => (<th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left"><Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{head}</Typography></th>))}</tr></thead>
                {/* tbody */}
                <tbody>
                  {currentStaffList.map(
                    (staffItem, key) => { 
                      const { img, name, email, role, status, joinedDate } = staffItem;
                      const className = `py-3 px-5 ${key === currentStaffList.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                      return (
                        <tr key={email}>
                           {/* Các td hiển thị */}
                           <td className={className}><div className="flex items-center gap-4"><Avatar src={img} alt={name} size="sm" variant="rounded" /><div><Typography variant="small" color="blue-gray" className="font-semibold">{name}</Typography><Typography className="text-xs font-normal text-blue-gray-500">{email}</Typography></div></div></td>
                           <td className={className}>{role.map((r, index) => ( <Chip key={index} variant="ghost" size="sm" value={r} className="mr-1 mb-1 inline-block text-xs"/>))}</td>
                           <td className={className}><Chip variant="gradient" color={status === "active" ? "green" : "blue-gray"} value={status === "active" ? "Hoạt động" : "Đã khóa"} className="py-0.5 px-2 text-[11px] font-medium w-fit"/></td>
                           <td className={className}><Typography className="text-xs font-semibold text-blue-gray-600">{joinedDate}</Typography></td>
                          {/* Cột Hành động */}
                          <td className={`${className} flex gap-1`}> 
                             <Tooltip content="Sửa thông tin"><IconButton variant="text" color="blue-gray" size="sm" onClick={() => handleOpenEditStaffDialog(staffItem)}><PencilIcon className="h-4 w-4" /></IconButton></Tooltip>
                             <Tooltip content={status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}><IconButton variant="text" color={status === "active" ? "deep-orange" : "green"} size="sm" onClick={() => handleToggleBlockStaff(email, status)}>{status === "active" ? <LockClosedIcon className="h-4 w-4" /> : <LockOpenIcon className="h-4 w-4" />}</IconButton></Tooltip>
                             <Tooltip content="Xóa nhân viên"><IconButton variant="text" color="red" size="sm" onClick={() => handleOpenDeleteDialog(staffItem)}><TrashIcon className="h-4 w-4" /></IconButton></Tooltip>
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
      {/* Dialog Thêm */}
      <Dialog open={openAddDialog} handler={handleOpenAddDialog}>
         {/* ... */}
         <DialogHeader>Thêm Nhân viên Mới</DialogHeader><DialogBody divider className="flex flex-col gap-4"><Input label="Họ và Tên" name="name" /><Input type="email" label="Email" name="email" /><Input type="password" label="Mật khẩu" name="password" /><Typography variant="small" color="red" className="mt-2">*Lưu ý: ...</Typography></DialogBody><DialogFooter><Button variant="text" color="red" onClick={handleOpenAddDialog} className="mr-1"><span>Hủy</span></Button><Button variant="gradient" color="green" onClick={handleAddNewStaff}><span>Lưu</span></Button></DialogFooter>
      </Dialog>
      {/* Dialog Xóa */}
      <Dialog open={openDeleteDialog} handler={handleCloseDeleteDialog} size="xs">
         {/* ... */}
         <DialogHeader>Xác nhận Xóa</DialogHeader><DialogBody divider>Bạn có chắc chắn muốn xóa nhân viên ...</DialogBody><DialogFooter><Button variant="text" color="blue-gray" onClick={handleCloseDeleteDialog} className="mr-1"><span>Hủy</span></Button><Button variant="gradient" color="red" onClick={handleConfirmDelete}><span>Xác nhận Xóa</span></Button></DialogFooter>
      </Dialog>
      {/* Dialog Sửa */}
       <Dialog open={openEditDialog} handler={handleCloseEditStaffDialog}>
          <DialogHeader>Chỉnh sửa thông tin Nhân viên</DialogHeader>
          <DialogBody divider className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
            <Input label="Họ và Tên" name="name" value={editFormData.name} onChange={handleEditStaffFormChange} />
            <Input label="Email" name="email" value={editFormData.email} disabled />
            <div><Typography variant="small" color="blue-gray" className="mb-1 font-medium">Chức vụ / Vai trò</Typography><div className="grid grid-cols-2 gap-x-4 gap-y-1">{ALL_POSSIBLE_ROLES.map((roleName) => (<Checkbox key={roleName} label={<Typography variant="small">{roleName}</Typography>} checked={editFormData.role.includes(roleName)} onChange={() => handleRoleCheckboxChange(roleName)} containerProps={{ className: "-ml-2.5 -mt-2.5" }}/>))}</div></div>
            <Input type="date" label="Ngày tham gia" name="joinedDate" value={editFormData.joinedDate} onChange={handleEditStaffFormChange} />
            <Select label="Trạng thái" name="status" value={editFormData.status} onChange={(value) => handleEditStaffSelectChange('status', value)}><Option value="active">Hoạt động (Active)</Option><Option value="blocked">Đã khóa (Blocked)</Option></Select>
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