import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { PlantData } from "@/data/tree-management-data";

export function TreeManagement() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          className="mb-8 p-6 flex justify-between items-center bg-gradient-to-tr from-green-700 to-green-400"
        >
          <Typography variant="h6" color="white">
            Danh sách cây trồng
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          <table className="w-full min-w-[1200px] table-auto">
            <thead>
              <tr>
                {[
                  "Tên cây",
                  "Tình trạng",
                  "Ngày trồng",
                  "Nhiệt độ (°C)",
                  "Độ ẩm (%)",
                  "Ánh sáng (lux)",
                  "Độ ẩm đất (%)",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PlantData.map(
                (
                  {
                    name,
                    alive,
                    plantingDate,
                    Temp_Min,
                    Temp_Max,
                    Humidity_Min,
                    Humidity_Max,
                    Light_Min,
                    Light_Max,
                    SoilMoisture_Min,
                    SoilMoisture_Max,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === PlantData.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={alive ? "green" : "red"}
                          value={alive ? "Còn sống" : "Đã chết"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {plantingDate}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs text-blue-gray-700">
                          {Temp_Min} - {Temp_Max}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs text-blue-gray-700">
                          {Humidity_Min} - {Humidity_Max}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs text-blue-gray-700">
                          {Light_Min} - {Light_Max}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs text-blue-gray-700">
                          {SoilMoisture_Min} - {SoilMoisture_Max}
                        </Typography>
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
  );
}

export default TreeManagement;
