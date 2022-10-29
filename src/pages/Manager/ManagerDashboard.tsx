import Dashboard from "../../components/Dashboard/Dashboard";
import {
  ManagerSidebarMainListItems,
  ManagerSidebarSecondaryListItems,
} from "./ManagerSidebarListItems";

function ManagerDashboard() {
  return (
    <Dashboard dashboardName="Manager Dashboard">
      <ManagerSidebarMainListItems />
      <ManagerSidebarSecondaryListItems />
    </Dashboard>
  );
}

export default ManagerDashboard;
