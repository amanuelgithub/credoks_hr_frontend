import Divider from "@mui/material/Divider";
import Dashboard from "../../../components/Dashboard/Dashboard";
import {
  ManagerSidebarMainListItems,
  ManagerSidebarSecondaryListItems,
} from "./ManagerSidebarListItems";

function ManagerDashboard() {
  return (
    <Dashboard dashboardName="Manager Dashboard">
      <ManagerSidebarMainListItems />

      <Divider sx={{ my: 1 }} />

      <ManagerSidebarSecondaryListItems />
    </Dashboard>
  );
}

export default ManagerDashboard;
