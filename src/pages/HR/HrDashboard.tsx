import Dashboard from "../../components/Dashboard/Dashboard";
import {
  hrSidebarMainListItems,
  hrSidebarSecondaryListItems,
} from "./hr-sidebar-list-items";

function HrDashboard() {
  return (
    <Dashboard
      dashboardName="HR Dashboard"
      sidebarMainListItems={hrSidebarMainListItems}
      sidebarSecondaryListItems={hrSidebarSecondaryListItems}
    />
  );
}

export default HrDashboard;
