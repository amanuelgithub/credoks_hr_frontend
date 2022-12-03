import Box from "@mui/material/Box";
import StatCard from "./StatsCard";
import PeopleIcon from "@mui/icons-material/People";
import { useGetTotalStatsQuery } from "../../../services/reportApiSlice";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import PlaceIcon from "@mui/icons-material/Place";
import EmployeeChart from "./EmployeeChart";

function AdminDashboardContent() {
  const { data: totalStats } = useGetTotalStatsQuery();

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <StatCard
          amount={totalStats?.totalCompanies}
          text={"Companies"}
          icon={<BusinessIcon />}
        />
        <StatCard
          amount={totalStats?.totalDepartments}
          text={"Departments"}
          icon={<GroupsIcon />}
        />
        <StatCard
          amount={totalStats?.totalEmployees}
          text={"Employees"}
          icon={<PeopleIcon />}
        />
        <StatCard
          amount={totalStats?.totalLocations}
          text={"Locations"}
          icon={<PlaceIcon />}
        />
      </Box>

      <Box>
        <EmployeeChart />
      </Box>
    </div>
  );
}

export default AdminDashboardContent;
