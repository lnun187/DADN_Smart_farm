import React, { useState } from "react";
import {
  Typography, Card, CardHeader, CardBody, CardFooter, 
  Avatar, Tooltip, Dialog, DialogHeader, DialogBody, DialogFooter,
  Button, Switch, Input, IconButton, 
} from "@material-tailwind/react";
import { ClockIcon, XMarkIcon as CloseIcon } from "@heroicons/react/24/solid"; 

import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  statisticsTempData,
  statisticsLuxData,
  projectsData,
} from "@/data";

export function StaffDashboard() { 
  // State cho các Dialog điều khiển (giữ nguyên)
  const [openPowerDialog, setOpenPowerDialog] = useState(false); 
  const [openLightDialog, setOpenLightDialog] = useState(false); 
  const [openPumpDialog, setOpenPumpDialog] = useState(false);   
  const [fanMode, setFanMode] = useState(true); 
  const [fanAutoMode, setFanAutoMode] = useState(false); 
  const [fanPower, setFanPower] = useState(50);
  const [lightLevel, setLightLevel] = useState(70); 
  const [lightColor, setLightColor] = useState("#ffffff"); 
  const [pumpAutoMode, setPumpAutoMode] = useState(false); 
  const [pumpPower, setPumpPower] = useState(60);

  // State cho Dialog chi tiết Khu vực (projectsData)
  const [openProjectDetail, setOpenProjectDetail] = useState(false); // Đổi tên từ open sang openProjectDetail
  const [selectedProject, setSelectedProject] = useState(null);


  const handleCardClick = (title) => {
    if (title === "Công suất quạt") { 
      setOpenPowerDialog(true);
    } else if (title === "Điều chỉnh ánh sáng") {
      setOpenLightDialog(true);
    } else if (title === "Điều chỉnh bơm nước") {
      setOpenPumpDialog(true);
    }
    // Bỏ dòng else if bị lặp lại cho "Điều chỉnh ánh sáng"
  };
  
  return (
    <div className="mt-12">
      {/* Hàng StatisticsCard */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4"> 
        {statisticsCardsData.map(({ icon, title, footer, value: initialValue, ...rest }) => {
          let dynamicValue = initialValue; 
          // Sửa lại điều kiện kiểm tra card "Chế độ quay"
          if (title === "Chế độ quay Quạt" && statisticsCardsData.some(c => c.title === "Chế độ quay Quạt")) { 
            dynamicValue = fanMode ? "ON" : "OFF";
          } else if (title === "Công suất quạt") { 
            dynamicValue = fanAutoMode ? "Tự động" : `${fanPower}%`;
          } else if (title === "Điều chỉnh ánh sáng") { 
            dynamicValue = `${lightLevel}%`; 
          } else if (title === "Điều chỉnh bơm nước") { 
            dynamicValue = pumpAutoMode ? "Tự động" : `${pumpPower}%`;
          } 
          
          const isClickable = ["Công suất quạt", "Điều chỉnh ánh sáng", "Điều chỉnh bơm nước"].includes(title);

          return (
            <div 
              key={title} 
              onClick={isClickable ? () => handleCardClick(title) : undefined} 
              className={isClickable ? "cursor-pointer" : ""}
            >
              <StatisticsCard
                {...rest}
                title={title}
                value={dynamicValue} 
                icon={React.createElement(icon, { className: "w-6 h-6 text-white" })}
                footer={
                  <Typography className="font-normal text-blue-gray-600">
                    {footer.value && <strong className={footer.color || "text-green-500"}>{footer.value}</strong>}
                    &nbsp;{footer.label}
                  </Typography>
                }
              />
            </div>
          );
        })}
      </div>

      {/* Phần Biểu đồ */}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => ( <StatisticsChart key={props.title} {...props} footer={ <Typography variant="small" className="flex items-center font-normal text-blue-gray-600"> <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" /> &nbsp;{props.footer} </Typography> } /> ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsTempData.map((props) => ( <StatisticsChart key={props.title} {...props} footer={ <Typography variant="small" className="flex items-center font-normal text-blue-gray-600"> <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" /> &nbsp;{props.footer} </Typography> } /> ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsLuxData.map((props) => ( <StatisticsChart key={props.title} {...props} footer={ <Typography variant="small" className="flex items-center font-normal text-blue-gray-600"> <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" /> &nbsp;{props.footer} </Typography> } /> ))}
      </div>

      {/* --- PHẦN PROJECTS GRID (KHU VỰC) - ĐÃ SỬA ĐỂ THẲNG HÀNG HƠN --- */}
      <div className="bg-white px-4 pb-4 p-6 rounded-xl shadow-md mt-12"> {/* Thêm mt-12 để cách biệt với biểu đồ */}
        <Typography variant="h6" color="blue-gray" className="mb-2">Khu vực</Typography>
        <Typography variant="small" className="font-normal text-blue-gray-500">Tổng quan các khu vực quản lý</Typography>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"> {/* Điều chỉnh gap và responsive cols */}
          {projectsData.map(({ img, title, description, tag, members, details, extraImage }) => (
            // Bọc mỗi Card bằng một div với class `flex` để Card con có thể dùng `h-full`
            <div key={title} className="flex"> 
              <Card className="flex flex-col w-full border border-blue-gray-100 hover:shadow-xl transition-shadow duration-300 h-full rounded-lg overflow-hidden"> {/* Thêm h-full, rounded-lg, overflow-hidden */}
                <CardHeader floated={false} color="transparent" className="mx-0 mt-0 h-48 flex-shrink-0 shadow-none"> {/* Chiều cao cố định cho header ảnh */}
                  <img src={img} alt={title} className="h-full w-full object-cover" />
                </CardHeader>
                <CardBody className="p-4 flex-grow flex flex-col"> {/* Thêm flex-grow và flex flex-col, điều chỉnh padding */}
                  <Typography variant="small" className="font-normal text-blue-gray-400 mb-1">{tag}</Typography>
                  <Typography variant="h5" color="blue-gray" className="mb-2 font-semibold leading-snug">
                    {title}
                  </Typography>
                  {/* Giới hạn mô tả và cho phép nó chiếm không gian còn lại */}
                  <Typography 
                    variant="small" 
                    className="font-normal text-gray-600 overflow-hidden text-ellipsis flex-grow mb-3" // Thêm flex-grow
                    style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }} 
                    title={description} // Hiện full khi hover (tooltip mặc định của trình duyệt)
                  >
                    {description}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-2 pb-4 px-4 border-t border-blue-gray-50 flex items-center justify-between flex-shrink-0"> {/* Thêm flex-shrink-0 */}
                  <Button 
                    variant="outlined" 
                    color="green" 
                    size="sm" 
                    onClick={() => { setSelectedProject({ img, title, description, tag, members, details, extraImage }); setOpenProjectDetail(true); }}
                  >
                    Chi tiết
                  </Button>
                  {members && members.length > 0 && (
                    <div className="flex items-center">
                      {members.slice(0, 3).map(({ img: memberImg, name }, key) => ( // Giới hạn 3 avatar
                        <Tooltip key={name} content={name}>
                           <Avatar src={memberImg} alt={name} size="xs" variant="circular" className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"}`}/>
                        </Tooltip> 
                      ))}
                      {members.length > 3 && (
                        <Typography variant="small" color="blue-gray" className="ml-1">+{members.length - 3}</Typography>
                      )}
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* --- CÁC DIALOG ĐIỀU KHIỂN --- */}
       <Dialog open={openPowerDialog} handler={() => setOpenPowerDialog(false)}>
         <DialogHeader>Điều chỉnh công suất quạt</DialogHeader>
         <DialogBody divider className="space-y-4">
           <div className="flex items-center justify-between"><Typography variant="small">Chế độ tự động:</Typography><Switch checked={fanAutoMode} onChange={() => setFanAutoMode(!fanAutoMode)} color="green" label={fanAutoMode ? "Bật" : "Tắt"}/></div>
           {!fanAutoMode && (<><Typography variant="small">Công suất: <span className="font-bold">{fanPower}%</span></Typography><Input type="range" min="0" max="100" step="1" value={fanPower} onChange={(e) => setFanPower(Number(e.target.value))} className="w-full accent-green-500"/></>)}
         </DialogBody>
         <DialogFooter><Button variant="text" color="red" onClick={() => setOpenPowerDialog(false)}>Đóng</Button></DialogFooter>
       </Dialog>
       
       <Dialog open={openPumpDialog} handler={() => setOpenPumpDialog(false)}>
         <DialogHeader>Điều chỉnh công suất bơm nước</DialogHeader>
         <DialogBody divider className="space-y-4">
           <div className="flex items-center justify-between"><Typography variant="small">Chế độ tự động:</Typography><Switch checked={pumpAutoMode} onChange={() => setPumpAutoMode(!pumpAutoMode)} color="blue" label={pumpAutoMode ? "Bật" : "Tắt"}/></div>
           {!pumpAutoMode && (<><Typography variant="small">Công suất: <span className="font-bold">{pumpPower}%</span></Typography><Input type="range" min="0" max="100" step="1" value={pumpPower} onChange={(e) => setPumpPower(Number(e.target.value))} className="w-full accent-blue-500"/></>)}
         </DialogBody>
         <DialogFooter><Button variant="text" color="red" onClick={() => setOpenPumpDialog(false)}>Đóng</Button></DialogFooter>
       </Dialog>

       <Dialog open={openLightDialog} handler={() => setOpenLightDialog(false)}>
         <DialogHeader>Điều chỉnh ánh sáng</DialogHeader>
         <DialogBody divider className="space-y-6">
           <div><Typography variant="small">Độ sáng: <span className="font-bold">{lightLevel}%</span></Typography><Input type="range" min="0" max="100" step="1" value={lightLevel} onChange={(e) => setLightLevel(Number(e.target.value))} className="w-full accent-yellow-500"/></div>
           <div><Typography variant="small">Màu ánh sáng:</Typography><Input type="color" value={lightColor} onChange={(e) => setLightColor(e.target.value)} className="w-16 h-10 p-0 border-2 border-gray-300 rounded"/></div>
         </DialogBody>
         <DialogFooter><Button variant="text" color="red" onClick={() => setOpenLightDialog(false)}>Đóng</Button></DialogFooter>
       </Dialog>

       {/* Dialog Chi tiết Khu vực (projectsData) */}
       <Dialog open={openProjectDetail} handler={() => setOpenProjectDetail(false)} size="lg" scrollable={true}>
         {selectedProject && (
           <>
             <DialogHeader className="justify-between">
                 <Typography variant="h5" color="blue-gray">{selectedProject.title}</Typography>
                 <IconButton color="blue-gray" size="sm" variant="text" onClick={() => setOpenProjectDetail(false)}>
                     <CloseIcon strokeWidth={2} className="h-5 w-5" />
                 </IconButton>
             </DialogHeader>
             <DialogBody divider className="space-y-4 max-h-[70vh] overflow-y-auto p-6">
               <Typography variant="small" color="blue-gray" className="font-semibold opacity-70">{selectedProject.tag}</Typography>
               <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"/>
               <Typography variant="paragraph" className="text-gray-700 mb-4 leading-relaxed">
                 {selectedProject.description}
               </Typography>
               {selectedProject.details && selectedProject.details.length > 0 && (
                 <div className="mb-4">
                   <Typography variant="h6" color="blue-gray" className="mb-2 border-b pb-1">Đặc điểm nổi bật</Typography>
                   <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                     {selectedProject.details.map((item, index) => (<li key={index} className="text-sm">{item}</li>))}
                   </ul>
                 </div>
               )}
               {selectedProject.extraImage && selectedProject.extraImage.length > 0 && (
                 <div className="mb-4">
                   <Typography variant="h6" color="blue-gray" className="mb-2 border-b pb-1">Hình ảnh khác</Typography>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                     {selectedProject.extraImage.map(({img}, index) => (<img key={index} src={img} alt={`Extra ${index}`} className="w-full h-32 object-cover rounded-lg border shadow-sm hover:shadow-md transition-shadow"/>))}
                   </div>
                 </div>
               )}
               {selectedProject.members && selectedProject.members.length > 0 && (
                 <div className="mt-6">
                   <Typography variant="h6" color="blue-gray" className="mb-2 border-b pb-1">Thành viên liên quan</Typography>
                   <div className="flex items-center mt-2">
                     {selectedProject.members.map(({ img: memberImg, name }, key) => (<Tooltip key={name} content={name}><Avatar src={memberImg} alt={name} size="sm" variant="circular" className={`cursor-pointer border-2 border-white shadow-sm hover:shadow-md ${key === 0 ? "" : "-ml-3"}`}/></Tooltip>))}
                   </div>
                 </div>
               )}
             </DialogBody>
             <DialogFooter className="border-t border-blue-gray-50">
               <Button variant="text" color="gray" onClick={() => setOpenProjectDetail(false)}>
                 Đóng
               </Button>
             </DialogFooter>
           </>
         )}
       </Dialog>
    </div>
  );
}

export default StaffDashboard;