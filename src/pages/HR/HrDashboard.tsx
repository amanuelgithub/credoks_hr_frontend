import Dashboard from "../../components/Dashboard/Dashboard";
import {
  HrSidebarMainListItems,
  HrSidebarSecondaryListItems,
} from "./HrSidebarListLtems";

function HrDashboard() {
  return (
    <Dashboard dashboardName="HR Dashboard">
      <HrSidebarMainListItems />
      <HrSidebarSecondaryListItems />
    </Dashboard>
  );
}

export default HrDashboard;
