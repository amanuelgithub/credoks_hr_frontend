import React from "react";
import { useGetCompanyTotalStatsQuery } from "../../../services/reportApiSlice";
import { useAppSelector } from "../../../app/hooks";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TotalStatsCard from "../../../components/DashboardStats/TotalStatsCard";

export function HrDashboardContent() {
  const companyId = useAppSelector((state) => state.auth.companyId);
  const { data: totalStats } = useGetCompanyTotalStatsQuery(companyId);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div className="flex justify-evenly gap-2 ">
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
          icon={<ManageAccountsIcon />}
        />
      </div>
    </div>
  );
}
