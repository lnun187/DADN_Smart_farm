import React, { useState, useEffect } from "react";
import {
  Card, CardHeader, CardBody, Typography, Tooltip,
  IconButton, Button, Dialog, DialogHeader, DialogBody,
  DialogFooter, Input, Select, Option, Alert,
} from "@material-tailwind/react";
import {
  PencilIcon, TrashIcon, PlusIcon,
} from "@heroicons/react/24/solid";

const API_BASE = "http://localhost:3001/control"; // Cập nhật theo địa chỉ thực tế

export function DeviceManagement() {
  const [devices, setDevices] = useState([]);
  const [areas, setAreas] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [formData, setFormData] = useState({
    Name: "", Description: "", Aid: ""
  });

  useEffect(() => {
    fetchDevices();
    fetchAreas();
  }, []);

  const fetchDevices = async () => {
    const res = await fetch(`${API_BASE}/devices`);
    const data = await res.json();
    setDevices(data.devices || []);
  };

  const fetchAreas = async () => {
    const res = await fetch(`${API_BASE}/get/areas`);
    const data = await res.json();
    setAreas(data || []);
  };

  const handleAdd = async () => {
    try {
      const res = await fetch(`${API_BASE}/addevice/${formData.Aid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: formData.Name,
          Description: formData.Description
        })
      });

      const data = await res.json();
      if (res.ok) {
        setOpenAdd(false);
        fetchDevices();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Lỗi khi thêm thiết bị.");
    }
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(`${API_BASE}/adjustdevice/${selectedDevice._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: formData.Name,
          Description: formData.Description
        })
      });

      const data = await res.json();
      if (res.ok) {
        setOpenEdit(false);
        fetchDevices();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Lỗi khi chỉnh sửa thiết bị.");
    }
  };

  const handleDelete = async (deviceId) => {
    if (!window.confirm("Bạn có chắc muốn xoá thiết bị này?")) return;

    try {
      const res = await fetch(`${API_BASE}/deldevice/${deviceId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        fetchDevices();
      } else {
        alert("Xoá thất bại.");
      }
    } catch (err) {
      alert("Lỗi khi xoá thiết bị.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">Quản lý thiết bị</Typography>
        <Button color="green" onClick={() => { setFormData({ Name: "", Description: "", Aid: "" }); setOpenAdd(true); }}>
          <PlusIcon className="h-5 w-5 mr-2" /> Thêm thiết bị
        </Button>
      </div>

      <Card>
        <CardBody>
          {devices.length === 0 ? (
            <Typography>Không có thiết bị nào.</Typography>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-2">Tên thiết bị</th>
                  <th className="p-2">Mô tả</th>
                  <th className="p-2">Khu vực</th>
                  <th className="p-2 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr key={device._id} className="border-t">
                    <td className="p-2">{device.Name}</td>
                    <td className="p-2">{device.Description}</td>
                    <td className="p-2">{device.Aid.Name}</td>
                    <td className="p-2 text-right space-x-2">
                      <Tooltip content="Sửa">
                        <IconButton
                          size="sm"
                          onClick={() => {
                            setSelectedDevice(device);
                            setFormData({
                              Name: device.Name,
                              Description: device.Description,
                              Aid: device.Aid
                            });
                            setOpenEdit(true);
                          }}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Xoá">
                        <IconButton size="sm" color="red" onClick={() => handleDelete(device._id)}>
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>

      {/* Dialog Thêm */}
      <Dialog open={openAdd} handler={() => setOpenAdd(false)}>
        <DialogHeader>Thêm thiết bị</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <Input label="Tên thiết bị" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} />
            <Input label="Mô tả" value={formData.Description} onChange={(e) => setFormData({ ...formData, Description: e.target.value })} />
            <Select label="Khu vực" value={formData.Aid} onChange={(val) => setFormData({ ...formData, Aid: val })}>
              {areas.map((area) => (
                <Option key={area._id} value={area._id}>{area.Name}</Option>
              ))}
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenAdd(false)}>Hủy</Button>
          <Button color="green" onClick={handleAdd}>Thêm</Button>
        </DialogFooter>
      </Dialog>

      {/* Dialog Sửa */}
      <Dialog open={openEdit} handler={() => setOpenEdit(false)}>
        <DialogHeader>Chỉnh sửa thiết bị</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <Input label="Tên thiết bị" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} />
            <Input label="Mô tả" value={formData.Description} onChange={(e) => setFormData({ ...formData, Description: e.target.value })} />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenEdit(false)}>Hủy</Button>
          <Button color="blue" onClick={handleEdit}>Lưu</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DeviceManagement;
