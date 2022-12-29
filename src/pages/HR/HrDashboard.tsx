import { useAppSelector } from "../../app/hooks";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useGetCompanyQuery } from "../../services/companyApiSlice";
import { HrSidebarMainListItems } from "./HrSidebarListLtems";

function HrDashboard() {
  const companyId = useAppSelector((state) => state.auth.companyId);

  const { data } = useGetCompanyQuery(companyId);

  return (
    <Dashboard dashboardName={`${data?.name}`}>
      <HrSidebarMainListItems />
    </Dashboard>
  );
}

export default HrDashboard;
