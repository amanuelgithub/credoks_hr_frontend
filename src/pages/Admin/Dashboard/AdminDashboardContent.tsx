import Box from "@mui/material/Box";
import TotalStatsCard from "../../../components/TotalStatsCard";
import PeopleIcon from "@mui/icons-material/People";
import { useGetCompaniesTotalStatsQuery } from "../../../services/reportApiSlice";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import PlaceIcon from "@mui/icons-material/Place";
import EmployeeChart from "./EmployeeChart";

function AdminDashboardContent() {
  const { data: totalStats } = useGetCompaniesTotalStatsQuery();

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2 }}>
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
      </Box>

      <Box>
        <EmployeeChart />
      </Box>
    </div>
  );
}

export default AdminDashboardContent;
