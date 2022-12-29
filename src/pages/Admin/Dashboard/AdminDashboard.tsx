import Dashboard from "../../../components/Dashboard/Dashboard";
import { AdminSidebarMainListItems } from "./AdminSidebarListItems";
import { useAppSelector } from "../../../app/hooks";
import { useGetCompanyQuery } from "../../../services/companyApiSlice";

function AdminDashboard() {
  const companyId = useAppSelector((state) => state.auth.companyId);

  const { data } = useGetCompanyQuery(companyId);

  return (
    <Dashboard dashboardName={`${data?.name ?? "Super Admin"}`}>
      <AdminSidebarMainListItems />
    </Dashboard>
  );
}

export default AdminDashboard;
