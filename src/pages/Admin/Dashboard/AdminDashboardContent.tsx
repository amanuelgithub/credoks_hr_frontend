import TotalStatsCard from "../../../components/DashboardStats/TotalStatsCard";
import PeopleIcon from "@mui/icons-material/People";
import { useGetCompaniesTotalStatsQuery } from "../../../services/reportApiSlice";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import PlaceIcon from "@mui/icons-material/Place";
import EmployeeChart from "./EmployeeChart";
import EmpLineChart from "./EmpLineChart";

function AdminDashboardContent() {
  // data contains: total no companies, departments, locations,
  // employees and positions
  const { data: totalStats } = useGetCompaniesTotalStatsQuery();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="flex flex-col justify-center md:flex-row md:justify-evenly gap-2">
        <TotalStatsCard
          amount={totalStats?.totalCompanies}
          text={"Companies"}
          icon={<BusinessIcon />}
        />
        <TotalStatsCard
          amount={totalStats?.totalDepartments}
          text={"Departments"}
          icon={<GroupsIcon />}
        />
        <TotalStatsCard
          amount={totalStats?.totalEmployees}
          text={"Employees"}
          icon={<PeopleIcon />}
        />
        <TotalStatsCard
          amount={totalStats?.totalLocations}
          text={"Locations"}
          icon={<PlaceIcon />}
        />
      </div>

      <EmpLineChart />

      <EmployeeChart />
    </div>
  );
}

export default AdminDashboardContent;
