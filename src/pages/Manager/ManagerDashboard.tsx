import Dashboard from "../../components/Dashboard/Dashboard";
import {
  managerSidebarMainListItems,
  managerSidebarSecondaryListItems,
} from "./manager-sidebar-list-items";

function ManagerDashboard() {
  return (
    <Dashboard
      dashboardName="Manager Dashboard"
      sidebarMainListItems={managerSidebarMainListItems}
      sidebarSecondaryListItems={managerSidebarSecondaryListItems}
    />
  );
}

export default ManagerDashboard;
