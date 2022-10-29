import {
  EmployeeSidebarMainListItems,
  EmployeeSidebarSecondaryListItems,
} from "./EmployeeSidebarIistItems";
import Divider from "@mui/material/Divider";
import Dashboard from "../../components/Dashboard/Dashboard";

function EmployeeDashboard() {
  return (
    <Dashboard dashboardName="Employee Dashboard">
      <EmployeeSidebarMainListItems />

      <Divider sx={{ my: 1 }} />

      <EmployeeSidebarSecondaryListItems />
    </Dashboard>
  );
}

export default EmployeeDashboard;
