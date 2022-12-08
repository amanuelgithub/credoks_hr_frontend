import Box from "@mui/material/Box";
import TotalStatsCard from "../../../components/TotalStatsCard";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import NewStatsCard from "../../../components/NewStatsCard";
import { useGetCompanyTotalStatsQuery } from "../../../services/reportApiSlice";
import { useAppSelector } from "../../../app/hooks";

function ManagerDashboardContent() {
  const companyId = useAppSelector((state) => state.auth.companyId);
  const { data: totalStats } = useGetCompanyTotalStatsQuery(companyId);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2 }}>
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
          amount={totalStats?.totalPositions}
          text={"Positions"}
          icon={<WorkIcon />}
        />
        <NewStatsCard />
      </Box>
    </div>
  );
}

export default ManagerDashboardContent;
