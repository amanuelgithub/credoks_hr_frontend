import { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useAppSelector } from "../../../app/hooks";
import Dashboard from "../../../components/Dashboard/Dashboard";
import { useGetCompanyQuery } from "../../../services/companyApiSlice";
import {
  ManagerSidebarMainListItems,
  ManagerSidebarSecondaryListItems,
} from "./ManagerSidebarListItems";

function ManagerDashboard() {
  const companyId = useAppSelector((state) => state.auth.companyId);

  const { data } = useGetCompanyQuery(companyId);

  return (
    <Dashboard dashboardName={`${data?.name}`}>
      <ManagerSidebarMainListItems />

      <Divider sx={{ my: 1 }} />

      <ManagerSidebarSecondaryListItems />
    </Dashboard>
  );
}

export default ManagerDashboard;
