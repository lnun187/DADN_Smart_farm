import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useAuth } from "@/context/AuthContext"; // Giả sử đường dẫn đúng

export function ZoneManagement() {
  const [zones, setZones] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [newZoneName, setNewZoneName] = useState("");
  const [newZoneAddress, setNewZoneAddress] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("green");
  const { userIdisAuthenticated, userRole, user } = useAuth();
  const stored = localStorage.getItem("authInfo");
  const parsed = stored ? JSON.parse(stored) : null;
  const userId = parsed?.user.id;



  useEffect(() => {
    if (userId) {
      fetchZones(userId);
    }
  }, [userId]);

  const fetchZones = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/control/areas/${userId}`);
      console.log("Day la userID", userId);
      console.log("Dữ liệu API trả về:", response.data); // Kiểm tra dữ liệu
      setZones(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách khu vực:", error);
      showAlert("Có lỗi xảy ra khi tải danh sách khu vực.", "red");
      setZones([]);
    }
  };

  const handleOpenAddModal = () => {
    setIsAdding(true);
    setEditingZone(null);
    setNewZoneName("");
    setNewZoneAddress("");
  };

  const handleOpenEditModal = (zone) => {
    setIsAdding(false);
    setEditingZone(zone);
    setNewZoneName(zone.Name);
    setNewZoneAddress(zone.Address);
  };

  const handleCloseModal = () => {
    setIsAdding(false);
    setEditingZone(null);
    setNewZoneName("");
    setNewZoneAddress("");
  };

  const handleSaveZone = async () => {
    if (!newZoneName.trim() || !newZoneAddress.trim()) {
      showAlert("Vui lòng nhập tên và địa chỉ khu vực.", "yellow");
      return;
    }

    try {
      if (editingZone) {
        // Sửa khu vực
        const response = await axios.put(`http://localhost:3001/control/adjustarea/${editingZone._id}`, {
          Name: newZoneName,
          Address: newZoneAddress,
        });
        console.log("Khu vực đã được cập nhật:", response.data);
        showAlert("Cập nhật khu vực thành công!");
      } else {
        // Thêm khu vực mới
        const response = await axios.post("http://localhost:3001/control/addarea", {
          Name: newZoneName,
          Address: newZoneAddress,
          Uid: userId,
        });
        console.log("Khu vực đã được thêm:", response.data);
        showAlert("Thêm khu vực thành công!");
      }
      fetchZones(userId);
      handleCloseModal();
    } catch (error) {
      console.error("Lỗi khi thêm/sửa khu vực:", error);
      showAlert(
        error.response?.data?.message || "Có lỗi xảy ra khi thêm/sửa khu vực.",
        "red"
      );
    }
  };

  const handleDeleteZone = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khu vực này?")) {
      try {
        const response = await axios.delete(`http://localhost:3001/control/delarea/${id}`);
        console.log("Khu vực đã được xóa:", response.data);
        showAlert("Xóa khu vực thành công!");
        fetchZones(userId);
      } catch (error) {
        console.error("Lỗi khi xóa khu vực:", error);
        showAlert(
          error.response?.data?.message || "Có lỗi xảy ra khi xóa khu vực.",
          "red"
        );
      }
    }
  };

  const showAlert = (message, color = "green") => {
    setAlertMessage(message);
    setAlertColor(color);
    setOpenAlert(true);
    setTimeout(() => setOpenAlert(false), 3000);
  };

  return (
    <>
      <Card>
        <CardHeader floated={false} className="mb-8 p-6 flex justify-between items-center bg-gradient-to-tr from-green-600 to-green-300">
          <div>
            <Typography variant="h6" color="blue-gray">
              Quản lý Khu Vực
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Xem, thêm, sửa và xóa các khu vực quản lý.
            </Typography>
          </div>
          <Button onClick={handleOpenAddModal} color="green" className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" /> Thêm Khu Vực
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          {openAlert && (
            <Alert color={alertColor} className="mb-4">
              {alertMessage}
            </Alert>
          )}
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 font-medium text-left">
                  ID
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 font-medium text-left">
                  Tên
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 font-medium text-left">
                  Địa chỉ
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 font-medium text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr key={zone._id}>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {zone._id}
                    </Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {zone.Name}
                    </Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {zone.Address}
                    </Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50 text-center">
                    <Tooltip content="Sửa">
                      <IconButton onClick={() => handleOpenEditModal(zone)} size="sm" className="mr-2">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Xóa">
                      <IconButton onClick={() => handleDeleteZone(zone._id)} size="sm" color="red">
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Modal Thêm/Sửa */}
      <Dialog open={isAdding || editingZone !== null} handler={handleCloseModal}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            {isAdding ? "Thêm Khu Vực" : "Sửa Khu Vực"}
          </Typography>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <Input
            label="Tên Khu Vực"
            value={newZoneName}
            onChange={(e) => setNewZoneName(e.target.value)}
          />
          <Textarea
            label="Địa Chỉ"
            value={newZoneAddress}
            onChange={(e) => setNewZoneAddress(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleCloseModal} className="mr-1">
            <span>Hủy</span>
          </Button>
          <Button color="green" onClick={handleSaveZone}>
            <span>{isAdding ? "Thêm" : "Lưu"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ZoneManagement;