import React, { useState, useEffect } from "react";
import {
  Card, CardHeader, CardBody, Typography, Tooltip,
  IconButton, Button, Dialog, DialogHeader, DialogBody,
  DialogFooter, Input, Select, Option,
} from "@material-tailwind/react";
import {
  PencilIcon, TrashIcon, PlusIcon,
} from "@heroicons/react/24/solid";

const API_BASE = "http://localhost:3001/control"; // cập nhật URL backend đúng

export function TreeManagement() {
  const [trees, setTrees] = useState([]);
  const [areas, setAreas] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTree, setSelectedTree] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    Planting_Time: "",
    Alive: true,
    Temp_Min: "",
    Temp_Max: "",
    Humidity_Min: "",
    Humidity_Max: "",
    Light_Min: "",
    Light_Max: "",
    SoilMoisture_Min: "",
    SoilMoisture_Max: "",
    Aid: "", // areaId
  });

  useEffect(() => {
    fetchTrees();
    fetchAreas();
  }, []);

  const fetchTrees = async () => {
    try {
      const res = await fetch(`${API_BASE}/getree`); // giả sử có api lấy tất cả cây (bạn chỉnh lại nếu khác)
      const data = await res.json();
      setTrees(data.trees || []);
    } catch (error) {
      console.log(error)
    }
  };

  const fetchAreas = async () => {
    try {
      const res = await fetch(`${API_BASE}/get/areas`); // giả sử api lấy khu vực, chỉnh lại URL nếu khác
      const data = await res.json();
      console.log(data)
      setAreas(data || []);
      console.log(areas, "day laf tet")
    } catch {
      console.log(error)
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch(`${API_BASE}/addtree/${formData.Aid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: formData.Name,
          Planting_Time: formData.Planting_Time,
          Alive: formData.Alive,
          Temp_Min: Number(formData.Temp_Min),
          Temp_Max: Number(formData.Temp_Max),
          Humidity_Min: Number(formData.Humidity_Min),
          Humidity_Max: Number(formData.Humidity_Max),
          Light_Min: Number(formData.Light_Min),
          Light_Max: Number(formData.Light_Max),
          SoilMoisture_Min: Number(formData.SoilMoisture_Min),
          SoilMoisture_Max: Number(formData.SoilMoisture_Max),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOpenAdd(false);
        fetchTrees();
      } else {
        alert(data.message);
      }
    } catch {
      alert("Lỗi khi thêm cây");
    }
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(`${API_BASE}/adjusttree/${selectedTree._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: formData.Name,
          Planting_Time: formData.Planting_Time,
          Alive: formData.Alive,
          Temp_Min: Number(formData.Temp_Min),
          Temp_Max: Number(formData.Temp_Max),
          Humidity_Min: Number(formData.Humidity_Min),
          Humidity_Max: Number(formData.Humidity_Max),
          Light_Min: Number(formData.Light_Min),
          Light_Max: Number(formData.Light_Max),
          SoilMoisture_Min: Number(formData.SoilMoisture_Min),
          SoilMoisture_Max: Number(formData.SoilMoisture_Max),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOpenEdit(false);
        fetchTrees();
      } else {
        alert(data.message);
      }
    } catch {
      alert("Lỗi khi chỉnh sửa cây");
    }
  };

  const handleDelete = async (treeId) => {
    if (!window.confirm("Bạn có chắc muốn xoá cây này?")) return;
    try {
      const res = await fetch(`${API_BASE}/deltree/${treeId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchTrees();
      } else {
        alert("Xoá thất bại.");
      }
    } catch {
      alert("Lỗi khi xoá cây.");
    }
  };

  // Mở dialog chỉnh sửa và đổ dữ liệu vào form
  const openEditDialog = (tree) => {
    setSelectedTree(tree);
    setFormData({
      Name: tree.Name || "",
      Planting_Time: tree.Planting_Time ? tree.Planting_Time.slice(0,10) : "",
      Alive: tree.Alive ?? true,
      Temp_Min: tree.Temp_Min ?? "",
      Temp_Max: tree.Temp_Max ?? "",
      Humidity_Min: tree.Humidity_Min ?? "",
      Humidity_Max: tree.Humidity_Max ?? "",
      Light_Min: tree.Light_Min ?? "",
      Light_Max: tree.Light_Max ?? "",
      SoilMoisture_Min: tree.SoilMoisture_Min ?? "",
      SoilMoisture_Max: tree.SoilMoisture_Max ?? "",
      Aid: tree.Aid?._id || "",
    });
    setOpenEdit(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">Quản lý cây trồng</Typography>
        <Button
          color="green"
          onClick={() => {
            setFormData({
              Name: "",
              Planting_Time: "",
              Alive: true,
              Temp_Min: "",
              Temp_Max: "",
              Humidity_Min: "",
              Humidity_Max: "",
              Light_Min: "",
              Light_Max: "",
              SoilMoisture_Min: "",
              SoilMoisture_Max: "",
              Aid: "",
            });
            setOpenAdd(true);
          }}
        >
          <PlusIcon className="h-5 w-5 mr-2" /> Thêm cây
        </Button>
      </div>

      <Card>
        <CardBody>
          {trees.length === 0 ? (
            <Typography>Không có cây nào.</Typography>
          ) : (
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border border-gray-300">Tên cây</th>
                  <th className="p-2 border border-gray-300">Ngày trồng</th>
                  <th className="p-2 border border-gray-300">Trạng thái</th>
                  <th className="p-2 border border-gray-300">Khu vực</th>
                  <th className="p-2 border border-gray-300 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {trees.map((tree) => (
                  <tr key={tree._id} className="border border-gray-300">
                    <td className="p-2 border border-gray-300">{tree.Name}</td>
                    <td className="p-2 border border-gray-300">{tree.Planting_Time ? tree.Planting_Time.slice(0,10) : ""}</td>
                    <td className="p-2 border border-gray-300">{tree.Alive ? "Còn sống" : "Đã chết"}</td>
                    <td className="p-2 border border-gray-300">{tree.Aid?.Name || "Không rõ"}</td>
                    <td className="p-2 border border-gray-300 text-right space-x-2">
                      <Tooltip content="Sửa">
                        <IconButton size="sm" onClick={() => openEditDialog(tree)}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Xoá">
                        <IconButton size="sm" color="red" onClick={() => handleDelete(tree._id)}>
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
        <DialogHeader>Thêm cây</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <Input label="Tên cây" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} />
            <Input
              type="date"
              label="Ngày trồng"
              value={formData.Planting_Time}
              onChange={(e) => setFormData({ ...formData, Planting_Time: e.target.value })}
            />
            <Select label="Trạng thái" value={formData.Alive ? "alive" : "dead"} onChange={(val) => setFormData({ ...formData, Alive: val === "alive" })}>
              <Option value="alive">Còn sống</Option>
              <Option value="dead">Đã chết</Option>
            </Select>
            <Input label="Nhiệt độ tối thiểu" type="number" value={formData.Temp_Min} onChange={(e) => setFormData({ ...formData, Temp_Min: e.target.value })} />
            <Input label="Nhiệt độ tối đa" type="number" value={formData.Temp_Max} onChange={(e) => setFormData({ ...formData, Temp_Max: e.target.value })} />
            <Input label="Độ ẩm tối thiểu" type="number" value={formData.Humidity_Min} onChange={(e) => setFormData({ ...formData, Humidity_Min: e.target.value })} />
            <Input label="Độ ẩm tối đa" type="number" value={formData.Humidity_Max} onChange={(e) => setFormData({ ...formData, Humidity_Max: e.target.value })} />
            <Input label="Ánh sáng tối thiểu" type="number" value={formData.Light_Min} onChange={(e) => setFormData({ ...formData, Light_Min: e.target.value })} />
            <Input label="Ánh sáng tối đa" type="number" value={formData.Light_Max} onChange={(e) => setFormData({ ...formData, Light_Max: e.target.value })} />
            <Input label="Độ ẩm đất tối thiểu" type="number" value={formData.SoilMoisture_Min} onChange={(e) => setFormData({ ...formData, SoilMoisture_Min: e.target.value })} />
            <Input label="Độ ẩm đất tối đa" type="number" value={formData.SoilMoisture_Max} onChange={(e) => setFormData({ ...formData, SoilMoisture_Max: e.target.value })} />
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
        <DialogHeader>Chỉnh sửa cây</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <Input label="Tên cây" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} />
            <Input
              type="date"
              label="Ngày trồng"
              value={formData.Planting_Time}
              onChange={(e) => setFormData({ ...formData, Planting_Time: e.target.value })}
            />
            <Select label="Trạng thái" value={formData.Alive ? "alive" : "dead"} onChange={(val) => setFormData({ ...formData, Alive: val === "alive" })}>
              <Option value="alive">Còn sống</Option>
              <Option value="dead">Đã chết</Option>
            </Select>
            <Input label="Nhiệt độ tối thiểu" type="number" value={formData.Temp_Min} onChange={(e) => setFormData({ ...formData, Temp_Min: e.target.value })} />
            <Input label="Nhiệt độ tối đa" type="number" value={formData.Temp_Max} onChange={(e) => setFormData({ ...formData, Temp_Max: e.target.value })} />
            <Input label="Độ ẩm tối thiểu" type="number" value={formData.Humidity_Min} onChange={(e) => setFormData({ ...formData, Humidity_Min: e.target.value })} />
            <Input label="Độ ẩm tối đa" type="number" value={formData.Humidity_Max} onChange={(e) => setFormData({ ...formData, Humidity_Max: e.target.value })} />
            <Input label="Ánh sáng tối thiểu" type="number" value={formData.Light_Min} onChange={(e) => setFormData({ ...formData, Light_Min: e.target.value })} />
            <Input label="Ánh sáng tối đa" type="number" value={formData.Light_Max} onChange={(e) => setFormData({ ...formData, Light_Max: e.target.value })} />
            <Input label="Độ ẩm đất tối thiểu" type="number" value={formData.SoilMoisture_Min} onChange={(e) => setFormData({ ...formData, SoilMoisture_Min: e.target.value })} />
            <Input label="Độ ẩm đất tối đa" type="number" value={formData.SoilMoisture_Max} onChange={(e) => setFormData({ ...formData, SoilMoisture_Max: e.target.value })} />
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

export default TreeManagement;
