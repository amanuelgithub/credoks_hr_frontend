import {
  adminSidebarMainListItems,
  adminSidebarSecondaryListItems,
} from "./admin-sidebar-list-items";
import Dashboard from "../../components/Dashboard/Dashboard";

function AdminDashboard() {
  return (
    <Dashboard
      dashboardName="Admin Dashboard"
      sidebarMainListItems={adminSidebarMainListItems}
      sidebarSecondaryListItems={adminSidebarSecondaryListItems}
    />
  );
}

export default AdminDashboard;
