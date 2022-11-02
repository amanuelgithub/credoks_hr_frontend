import Divider from "@mui/material/Divider";
import Dashboard from "../../components/Dashboard/Dashboard";
import {
  HrSidebarMainListItems,
  HrSidebarSecondaryListItems,
} from "./HrSidebarListLtems";

function HrDashboard() {
  return (
    <Dashboard dashboardName="HR Dashboard">
      <HrSidebarMainListItems />

      <Divider sx={{ my: 1 }} />

      <HrSidebarSecondaryListItems />
    </Dashboard>
  );
}

export default HrDashboard;
