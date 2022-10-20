import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddCompany from "./pages/Admin/Companies/AddCompany";
import Companies from "./pages/Admin/Companies/Companies";
import DetailCompany from "./pages/Admin/Companies/DetailCompany";
import EditCompany from "./pages/Admin/Companies/EditCompany";
import AddDepartment from "./pages/Admin/Departments/AddDepartment";
import Departments from "./pages/Admin/Departments/Departments";
import DetailDepartment from "./pages/Admin/Departments/DetailDepartment";
import EditDepartment from "./pages/Admin/Departments/EditDepartment";
import AddEmployee from "./pages/Admin/Employees/AddEmployee";
import EditEmployee from "./pages/Admin/Employees/EditEmployee";
import Employees from "./pages/Admin/Employees/Employees";
import AddLocation from "./pages/Admin/Locations/AddLocation";
import DetailLocation from "./pages/Admin/Locations/DetailLocation";
import EditLocation from "./pages/Admin/Locations/EditLocation";
import Locations from "./pages/Admin/Locations/Locations";
import AddManager from "./pages/Admin/Managers/AddManager";
import DetailManager from "./pages/Admin/Managers/DetailManager";
import EditManager from "./pages/Admin/Managers/EditManager";
import Managers from "./pages/Admin/Managers/Managers";
import Login from "./pages/Login";
import { useAppSelector } from "../src/app/hooks";

function Router() {
  const token = useAppSelector((state) => state.auth.access_token);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />

      {!token ? <Route path="/signin" element={<Login />} /> : null}

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="admin-dashboard" element={<AdminDashboard />}>
          <Route path="employees">
            <Route index element={<Employees />} />
            <Route path="add" element={<AddEmployee />} />
            <Route path="edit/:id" element={<EditEmployee />} />
          </Route>
          <Route path="companies">
            <Route index element={<Companies />} />
            <Route path="add" element={<AddCompany />} />
            <Route path="edit/:id" element={<EditCompany />} />
            <Route path="detail/:id" element={<DetailCompany />} />
          </Route>
          <Route path="managers">
            <Route index element={<Managers />} />
            <Route path="add" element={<AddManager />} />
            <Route path="edit/:id" element={<EditManager />} />
            <Route path="detail/:id" element={<DetailManager />} />
          </Route>
          <Route path="departments">
            <Route index element={<Departments />} />
            <Route path="add" element={<AddDepartment />} />
            <Route path="edit/:id" element={<EditDepartment />} />
            <Route path="detail/:id" element={<DetailDepartment />} />
          </Route>
          <Route path="locations">
            <Route index element={<Locations />} />
            <Route path="add" element={<AddLocation />} />
            <Route path="edit/:id" element={<EditLocation />} />
            <Route path="detail/:id" element={<DetailLocation />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
