import Dashboard from "../../components/Dashboard/Dashboard";
import {
  employeeSidebarMainListItems,
  employeeSidebarSecondaryListItems,
} from "./employee-sidebar-list-items";

function EmployeeDashboard() {
  return (
    <Dashboard
      dashboardName="Employee Dashboard"
      sidebarMainListItems={employeeSidebarMainListItems}
      sidebarSecondaryListItems={employeeSidebarSecondaryListItems}
    />
  );
}

export default EmployeeDashboard;
