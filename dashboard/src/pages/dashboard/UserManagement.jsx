import React, { useState, useEffect } from "react";
import {
  Card, CardHeader, CardBody, Typography, Chip, Tooltip, IconButton,
  Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input,
  Select, Option
} from "@material-tailwind/react";
import {
  PencilIcon, UserPlusIcon
} from "@heroicons/react/24/solid";

const API_URL = "http://localhost:3001/control/users";
const REGISTER_URL = "http://localhost:3001/control/register";
const AREA_URL = "http://localhost:3001/control/get/areas"; // Giả định API trả danh sách khu vực

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [areas, setAreas] = useState([]);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Role: "staff",
    Status: true,
  });

  const [addFormData, setAddFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    Role: "staff",
    ManagerId: "681adef74ceb18a5562e13eb",
    AreaId: ""
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Lỗi khi fetch users:", err);
    }
  };

  const fetchAreas = async () => {
    try {
      const res = await fetch(AREA_URL);
      const data = await res.json();
      setAreas(data);
    } catch (err) {
      console.error("Lỗi khi fetch areas:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAreas();
  }, []);

  const handleEditSubmit = async () => {
    const url = `http://localhost:3001/control/adjustusers/${editingUser._id}`;
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      const data = await res.json();
      if (res.ok) {
        setOpenEditDialog(false);
        fetchUsers();
        setEditingUser(null);
      } else {
        alert(data.error || "Lỗi khi cập nhật người dùng");
      }
    } catch (err) {
      console.error("Lỗi cập nhật người dùng:", err);
    }
  };

  const handleAddSubmit = async () => {
    try {
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addFormData),
      });
      const data = await res.json();
      if (res.ok) {
        setOpenAddDialog(false);
        fetchUsers();
        setAddFormData({
          Name: "",
          Email: "",
          Phone: "",
          Password: "",
          Role: "staff",
          ManagerId: "681adef74ceb18a5562e13eb",
          AreaId: ""
        });
      } else {
        alert(data.message || "Lỗi khi thêm nhân viên");
      }
    } catch (err) {
      console.error("Lỗi thêm nhân viên:", err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditFormData({
      Name: user.Name,
      Email: user.Email,
      Phone: user.Phone,
      Role: user.Role,
      Status: user.RoleInfo?.StaffStatus ?? true,
    });
    setOpenEditDialog(true);
  };

  return (
    <>
      <Card className="mt-4">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Danh sách nhân viên
            </Typography>
            <Button
              className="flex items-center gap-2"
              onClick={() => setOpenAddDialog(true)}
            >
              <UserPlusIcon className="h-4 w-4" /> Thêm nhân viên
            </Button>
          </div>
        </CardHeader>

        <CardBody>
          {users.map((user) => (
            <div key={user._id} className="flex items-center justify-between py-2 border-b">
              <div>
                <Typography variant="h6">{user.Name}</Typography>
                <Typography variant="small" color="gray">Email: {user.Email}</Typography>
                <Typography variant="small" color="gray">SĐT: {user.Phone}</Typography>
                <Typography variant="small" color="gray">Vai trò: {user.Role}</Typography>

                {user.RoleInfo?.isStaff && (
                  <Typography variant="small" color="gray">
                    Trạng thái:{" "}
                    <Chip
                      value={user.RoleInfo.StaffStatus ? "Đang hoạt động" : "Tạm ngưng"}
                      color={user.RoleInfo.StaffStatus ? "green" : "red"}
                      size="sm"
                      className="ml-1 inline-block"
                    />
                  </Typography>
                )}

                {user.RoleInfo?.ManagedAreas?.length > 0 && (
                  <div className="mt-1">
                    <Typography variant="small" color="gray">Khu vực quản lý:</Typography>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {user.RoleInfo.ManagedAreas.map((area) => (
                        <li key={area._id}>{area.Name || area._id}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Tooltip content="Sửa">
                  <IconButton onClick={() => handleEditClick(user)}>
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* === DIALOG SỬA === */}
      <Dialog open={openEditDialog} handler={() => setOpenEditDialog(false)}>
        <DialogHeader>Sửa nhân viên</DialogHeader>
        <DialogBody>
          <div className="space-y-3">
            <Input label="Họ tên" value={editFormData.Name} onChange={(e) => setEditFormData({ ...editFormData, Name: e.target.value })} />
            <Input label="Email" value={editFormData.Email} onChange={(e) => setEditFormData({ ...editFormData, Email: e.target.value })} />
            <Input label="Số điện thoại" value={editFormData.Phone} onChange={(e) => setEditFormData({ ...editFormData, Phone: e.target.value })} />
            <Select label="Vai trò" value={editFormData.Role} onChange={(val) => setEditFormData({ ...editFormData, Role: val })}>
              <Option value="staff">Nhân viên</Option>
              <Option value="manager">Quản lý</Option>
              <Option value="admin">Admin</Option>
            </Select>
            {editFormData.Role === "staff" && (
              <Select
                label="Trạng thái"
                value={editFormData.Status ? "true" : "false"}
                onChange={(val) => setEditFormData({ ...editFormData, Status: val === "true" })}
              >
                <Option value="true">Đang hoạt động</Option>
                <Option value="false">Tạm ngưng</Option>
              </Select>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenEditDialog(false)}>Hủy</Button>
          <Button color="blue" onClick={handleEditSubmit}>Cập nhật</Button>
        </DialogFooter>
      </Dialog>

      {/* === DIALOG THÊM === */}
      <Dialog open={openAddDialog} handler={() => setOpenAddDialog(false)}>
        <DialogHeader>Thêm nhân viên mới</DialogHeader>
        <DialogBody>
          <div className="space-y-3">
            <Input label="Họ tên" value={addFormData.Name} onChange={(e) => setAddFormData({ ...addFormData, Name: e.target.value })} />
            <Input label="Email" value={addFormData.Email} onChange={(e) => setAddFormData({ ...addFormData, Email: e.target.value })} />
            <Input label="Mật khẩu" type="password" value={addFormData.Password} onChange={(e) => setAddFormData({ ...addFormData, Password: e.target.value })} />
            <Input label="Số điện thoại" value={addFormData.Phone} onChange={(e) => setAddFormData({ ...addFormData, Phone: e.target.value })} />
            <Select label="Vai trò" value={addFormData.Role} onChange={(val) => setAddFormData({ ...addFormData, Role: val })}>
              <Option value="staff">Nhân viên</Option>
              <Option value="manager">Quản lý</Option>
              <Option value="admin">Admin</Option>
            </Select>

            {addFormData.Role === "staff" && (
              <>
                <Input label="Manager ID" value={addFormData.ManagerId} readOnly />
                <Select
                  label="Khu vực"
                  value={addFormData.AreaId}
                  onChange={(val) => setAddFormData({ ...addFormData, AreaId: val })}
                >
                  {areas.map((area) => (
                    <Option key={area._id} value={area._id}>
                      {area.Name || area._id}
                    </Option>
                  ))}
                </Select>
              </>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenAddDialog(false)}>Hủy</Button>
          <Button color="green" onClick={handleAddSubmit}>Thêm</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default UserManagement;
