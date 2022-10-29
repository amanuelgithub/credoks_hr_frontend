import Dashboard from "../../components/Dashboard/Dashboard";
import {
  AdminSidebarMainListItems,
  AdminSidebarSecondaryListItems,
} from "./AdminSidebarListItems";
import Divider from "@mui/material/Divider";

function AdminDashboard() {
  return (
    <Dashboard dashboardName="Admin Dashboard">
      <AdminSidebarMainListItems />

      <Divider sx={{ my: 1 }} />

      <AdminSidebarSecondaryListItems />
    </Dashboard>
  );
}

export default AdminDashboard;
