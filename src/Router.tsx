import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddCompany from "./pages/Admin/Companies/AddCompany";
import Companies from "./pages/Admin/Companies/Companies";
import DetailCompany from "./pages/Admin/Companies/DetailCompany";
import EditCompany from "./pages/Admin/Companies/EditCompany";
import Departments from "./pages/Admin/Departments/Departments";
import DetailDepartment from "./pages/Admin/Departments/DetailDepartment";
import Employees from "./pages/Admin/Employees/Employees";
import DetailLocation from "./pages/Admin/Locations/DetailLocation";
import Locations from "./pages/Admin/Locations/Locations";
import Login from "./pages/Login";
import { useAppSelector } from "../src/app/hooks";
import DetailEmployee from "./pages/Admin/Employees/DetailEmployee";
import Positions from "./pages/Admin/Positions/Positions";
import HrDashboard from "./pages/HR/HrDashboard";
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";

function Router() {
  const token = useAppSelector((state) => state.auth.access_token);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />

      {!token ? <Route path="/signin" element={<Login />} /> : null}

      {/* Protected Routes */}
      {/* Admin Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="admin-dashboard" element={<AdminDashboard />}>
          <Route path="employees">
            <Route index element={<Employees />} />
            <Route path="detail/:id" element={<DetailEmployee />} />
          </Route>
          <Route path="companies">
            <Route index element={<Companies />} />
            <Route path="add" element={<AddCompany />} />
            <Route path="edit/:id" element={<EditCompany />} />
            <Route path="detail/:id" element={<DetailCompany />} />
          </Route>
          <Route path="departments">
            <Route index element={<Departments />} />
            <Route path="detail/:id" element={<DetailDepartment />} />
          </Route>
          <Route path="locations">
            <Route index element={<Locations />} />
            <Route path="detail/:id" element={<DetailLocation />} />
          </Route>
          <Route path="positions">
            <Route index element={<Positions />} />
          </Route>
        </Route>

        {/* HR Routes */}
        <Route path="hr-dashboard" element={<HrDashboard />} />

        {/* Manager Routes */}
        <Route path="manager-dashboard" element={<ManagerDashboard />} />

        {/* Employee Routes */}
        <Route path="employee-dashboard" element={<EmployeeDashboard />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
