
import Sidebar from "../components/Sidebar"
import PlantDetails from "../details/PlanDetails";
import PlanManagement from "../pages/PlanManagement"
import Chart from "../components/Chart";

function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <PlantDetails />
      <PlanManagement />
      <Chart />
    </div>
  );
}

export default Dashboard;
