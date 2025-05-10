import React, { useState, useEffect } from "react"; 
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Typography,
  Tooltip,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Alert, // --- THÊM IMPORT ALERT ---
} from "@material-tailwind/react";
import { 
    PencilIcon, 
    CheckCircleIcon // --- THÊM ICON CHO ALERT ---
} from "@heroicons/react/24/solid";
import { useAuth } from "@/context/AuthContext"; 
import { ProfileInfoCard } from "@/widgets/cards"; 

export function AdminProfile() {
  const { user, userRole } = useAuth(); 

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editName, setEditName] = useState(user?.name || ""); 
  const [displayName, setDisplayName] = useState(user?.name || "Admin"); 

  // --- STATE CHO THÔNG BÁO THÀNH CÔNG ---
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleOpenEditDialog = () => {
    setEditName(user?.name || ""); 
    setShowSuccessAlert(false); // Ẩn thông báo cũ khi mở dialog mới
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // Xác nhận sửa tên (Giả lập)
  const handleConfirmEdit = () => {
    if (user) { // Kiểm tra user tồn tại trước khi sửa
        // TODO: Gọi API cập nhật tên ở đây sau này
        console.log(`Cập nhật tên Admin thành: ${editName} - Logic API sẽ thêm sau`);
        
        // Giả lập cập nhật tên hiển thị trên UI
        setDisplayName(editName); 
        
        // --- HIỂN THỊ THÔNG BÁO THÀNH CÔNG ---
        setShowSuccessAlert(true); 
        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000); 

        // Đóng dialog sau khi đã xử lý xong và set thông báo
        handleCloseEditDialog();
    } else {
        console.error("User context is not available.");
        handleCloseEditDialog(); 
    }
  };

  const profileDetails = {
    "Tên": displayName, 
    "Email": user?.email || "N/A",
    "Vai trò": "Quản trị viên", 
  };

  return (
    <>
      {/* Ảnh bìa */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/modern.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          {/* Phần Avatar và Tên/Vai trò */}
          <div className="mb-1 flex items-center justify-between flex-wrap gap-6"> {/* Giảm mb */}
             <div className="flex items-center gap-6">
                <Avatar src="/img/bruce-mars.jpeg" alt={displayName} size="xl" variant="rounded" className="rounded-lg shadow-lg shadow-blue-gray-500/40"/>
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">{displayName}</Typography>
                  <Typography variant="small" className="font-normal text-blue-gray-600">Quản trị viên</Typography>
                </div>
             </div>
             <Button variant="outlined" className="flex items-center gap-2" onClick={handleOpenEditDialog}>
               <PencilIcon className="h-4 w-4" /> Chỉnh sửa hồ sơ
             </Button>
           </div>

           {/* --- THÔNG BÁO THÀNH CÔNG --- */}
           <div className="px-4 pb-4 pt-0"> 
              <Alert 
                 open={showSuccessAlert} 
                 color="green"
                 icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
                 onClose={() => setShowSuccessAlert(false)}
                 animate={{
                   mount: { y: 0 },
                   unmount: { y: -100 }, // Hiệu ứng trượt lên khi ẩn
                 }}
                 className="max-w-screen-md mx-auto" // Giới hạn chiều rộng và căn giữa (tùy chọn)
                >
                 Cập nhật thông tin thành công!
              </Alert>
           </div>


          {/* Phần hiển thị thông tin chi tiết */}
          <div className="gird-cols-1 grid gap-12 px-4"> 
            <ProfileInfoCard
              title="Thông tin Hồ sơ"
              details={profileDetails}
            />
          </div>
        </CardBody>
      </Card>

      {/* === DIALOG SỬA TÊN ADMIN === */}
       <Dialog open={openEditDialog} handler={handleCloseEditDialog} size="xs">
         <DialogHeader>Chỉnh sửa Tên</DialogHeader>
         <DialogBody divider>
           <Input label="Tên hiển thị mới" value={editName} onChange={(e) => setEditName(e.target.value)} />
         </DialogBody>
         <DialogFooter>
           <Button variant="text" color="red" onClick={handleCloseEditDialog} className="mr-1"><span>Hủy</span></Button>
           <Button variant="gradient" color="green" onClick={handleConfirmEdit}><span>Lưu thay đổi</span></Button>
         </DialogFooter>
       </Dialog>
    </>
  );
}

export default AdminProfile;