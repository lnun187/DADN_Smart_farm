import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Switch,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/solid";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  statisticsTempData,
  statisticsLuxData,
  projectsTableData,
  ordersOverviewData,
  projectsData,
} from "@/data";

export function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const [fanMode, setFanMode] = useState(true);
  const [fanPower, setFanPower] = useState(50);
  const [openPowerDialog, setOpenPowerDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightLevel, setLightLevel] = useState(70);
  const [openLightDialog, setOpenLightDialog] = useState(false);
  const [openPumpDialog, setOpenPumpDialog] = useState(false);
  const [pumpPower, setPumpPower] = useState(60); 
  const [lightColor, setLightColor] = useState("#ffffff");
  const [fanAutoMode, setFanAutoMode] = useState(false);
  const [pumpAutoMode, setPumpAutoMode] = useState(false);



  const handleCardClick = (title) => {
 
    if (title === "Công suất quạt") {
      setOpenPowerDialog(true);
    } else if (title === "Điều chỉnh ánh sáng") {
      setOpenLightDialog(true);
    }
    else if (title === "Điều chỉnh bơm nước") {
      setOpenPumpDialog(true);
    }
    else if (title === "Điều chỉnh ánh sáng") {
      setOpenLightDialog(true);
    }
  };
  
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-5">
        {statisticsCardsData.map(({ icon, title, footer, value, ...rest }) => {
          let dynamicValue = value;
          if (title === "Chế độ quay") {
            dynamicValue = fanMode ? "ON" : "OFF";
          } else if (title === "Công suất quạt") {
            dynamicValue = fanAutoMode ? "Tự động" : `${fanPower}%`;
          } else if (title === "Điều chỉnh ánh sáng") {
            dynamicValue = `${lightLevel}%`;
          } else if (title === "Điều chỉnh bơm nước") {
           dynamicValue = pumpAutoMode ? "Tự động" : `${pumpPower}%`;
          }
          return (
            <div key={title} onClick={() => handleCardClick(title)} className="cursor-pointer">
              <StatisticsCard
                {...rest}
                title={title}
                value={dynamicValue}
                icon={React.createElement(icon, {
                  className: "w-6 h-6 text-white",
                })}
                footer={
                  <Typography className="font-normal text-blue-gray-600">
                    <strong className={footer.color}>{footer.value}</strong>
                    &nbsp;{footer.label}
                  </Typography>
                }
              />
            </div>
          );
        })}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography variant="small" className="flex items-center font-normal text-blue-gray-600">
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsTempData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography variant="small" className="flex items-center font-normal text-blue-gray-600">
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsLuxData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography variant="small" className="flex items-center font-normal text-blue-gray-600">
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>

      {/* Projects Grid */}
      <div className="px-4 pb-4">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Khu vực
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-500">
          Khu vực quản lý
        </Typography>
        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
          {projectsData.map(({ img, title, description, tag, route, members, details, extraImage }) => (
            <Card key={title} color="transparent" shadow={false}>
              <CardHeader floated={false} color="gray" className="mx-0 mt-0 mb-4 h-64 xl:h-40">
                <img src={img} alt={title} className="h-full w-full object-cover" />
              </CardHeader>
              <CardBody className="py-0 px-1">
                <Typography variant="small" className="font-normal text-blue-gray-500">
                  {tag}
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mt-1 mb-2">
                  {title}
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </CardBody>
              <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => {
                    setSelectedProject({ img, title, description, tag, members, details, extraImage });
                    setOpen(true);
                  }}
                >
                  Chi tiết
                </Button>
                <div>
                  {members.map(({ img, name }, key) => (
                    <Tooltip key={name} content={name}>
                      <Avatar
                        src={img}
                        alt={name}
                        size="xs"
                        variant="circular"
                        className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"}`}
                      />
                    </Tooltip>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={open} handler={() => setOpen(false)} size="lg">
        {selectedProject && (
          <>
            <DialogHeader>{selectedProject.title}</DialogHeader>
            <DialogBody className="space-y-4">
              <Typography variant="small" className="text-blue-gray-500">
                {selectedProject.tag}
              </Typography>
              <details className="text-sm text-blue-gray-700">
                <summary className="cursor-pointer font-medium text-blue-gray-600">Đặc điểm</summary>
                <ul className="mt-2 list-disc list-inside">
                  {selectedProject.details?.map((item, index) => (
                    <li key={index} className="text-lg">{item}</li>
                  ))}
                </ul>
              </details>
              <details className="text-sm text-blue-gray-700">
                <summary className="cursor-pointer font-medium text-blue-gray-600">Hình ảnh minh họa</summary>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProject.extraImage?.map(({img}, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Extra ${index}`}
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              </details>

              <div className="flex mt-4">
                {selectedProject.members.map(({ img, name }, key) => (
                  <Tooltip key={name} content={name}>
                    <Avatar
                      src={img}
                      alt={name}
                      size="sm"
                      variant="circular"
                      className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"}`}
                    />
                  </Tooltip>
                ))}
              </div>
            </DialogBody>

            <DialogFooter>
              <Button variant="text" color="red" onClick={() => setOpen(false)}>
                Đóng
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>

      {/* Lịch trình công việc sắp tới */}
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Lịch trình công việc sắp tới
            </Typography>
            <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600">
              <ArrowUpIcon strokeWidth={3} className="h-3.5 w-3.5 text-green-500" />
              {/* Phân tích số liệu*/}
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(({ icon, color, title, description }, key) => (
              <div key={title} className="flex items-start gap-4 py-3">
                <div
                  className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                    key === ordersOverviewData.length - 1 ? "after:h-0" : "after:h-4/6"
                  }`}
                >
                  {React.createElement(icon, {
                    className: `!w-5 !h-5 ${color}`,
                  })}
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="block font-medium">
                    {title}
                  </Typography>
                  <Typography as="span" variant="small" className="text-xs font-medium text-blue-gray-500">
                    {description}
                  </Typography>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      

      {/* Fan Power Dialog */}
      <Dialog open={openPowerDialog} handler={() => setOpenPowerDialog(false)}>
          <DialogHeader>Điều chỉnh công suất quạt</DialogHeader>
          <DialogBody divider className="space-y-4">
            <div className="flex items-center justify-between">
              <Typography variant="small" className="mb-2">
                Chế độ tự động:
              </Typography>
              <Switch
                checked={fanAutoMode}
                onChange={() => setFanAutoMode(!fanAutoMode)}
                color="green"
                label={fanAutoMode ? "Bật" : "Tắt"}
              />
            </div>

            {!fanAutoMode && (
              <>
                <Typography variant="small" className="mb-2">
                  Công suất hiện tại: <span className="font-bold">{fanPower}%</span>
                </Typography>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={fanPower}
                  onChange={(e) => setFanPower(Number(e.target.value))}
                  className="w-full accent-green-500"
                />
              </>
            )}
          </DialogBody>

          <DialogFooter>
            <Button variant="text" color="red" onClick={() => setOpenPowerDialog(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </Dialog>


      {/* Điều chỉnh bơm nước */}
      <Dialog open={openPumpDialog} handler={() => setOpenPumpDialog(false)}>
        <DialogHeader>Điều chỉnh công suất bơm nước</DialogHeader>
        <DialogBody divider className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography variant="small" className="mb-2">
              Chế độ tự động:
            </Typography>
            <Switch
              checked={pumpAutoMode}
              onChange={() => setPumpAutoMode(!pumpAutoMode)}
              color="blue"
              label={pumpAutoMode ? "Bật" : "Tắt"}
            />
          </div>

          {!pumpAutoMode && (
            <>
              <Typography variant="small" className="mb-2">
                Công suất hiện tại: <span className="font-bold">{pumpPower}%</span>
              </Typography>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={pumpPower}
                onChange={(e) => setPumpPower(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setOpenPumpDialog(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </Dialog>


      {/* Điều chỉnh ánh sáng*/}
      <Dialog open={openLightDialog} handler={() => setOpenLightDialog(false)}>
      <DialogHeader>Điều chỉnh ánh sáng</DialogHeader>
      <DialogBody divider className="space-y-6">
        <div>
          <Typography variant="small" className="mb-2">
            Độ sáng hiện tại: <span className="font-bold">{lightLevel}%</span>
          </Typography>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={lightLevel}
            onChange={(e) => setLightLevel(Number(e.target.value))}
            className="w-full accent-yellow-500"
          />
        </div>

        <div>
          <Typography variant="small" className="mb-2">
            Màu ánh sáng hiện tại:
          </Typography>
          <input
            type="color"
            value={lightColor}
            onChange={(e) => setLightColor(e.target.value)}
            className="w-16 h-10 border-2 border-gray-300 rounded"
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={() => setOpenLightDialog(false)}>
          Đóng
        </Button>
      </DialogFooter>
    </Dialog>

    </div>

  );
}

export default Home;
