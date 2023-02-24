import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Companies from "./pages/Admin/Companies/Companies";
import DetailCompany from "./pages/Admin/Companies/DetailCompany";
import AdminEmployeesPage from "./pages/Admin/Employees/Employees";
import HREmployeesPage from "./pages/HR/Employees/Employees";
import ManagerEmployeesPage from "./pages/Manager/Employees/Employees";
import DetailLocation from "./pages/Admin/Locations/DetailLocation";
import Locations from "./pages/Admin/Locations/Locations";
import Login from "./pages/Login";
import { useAppSelector } from "../src/app/hooks";
import AdminPositions from "./pages/Admin/Positions/Positions";
import ManagerPositions from "./pages/Manager/Positions/Positions";
import AdminRoutesProtector from "./components/RouteProtector/AdminRoutesProtector";
import HrRoutesProtector from "./components/RouteProtector/HrRoutesProtector";
import ManagerRoutesProtector from "./components/RouteProtector/ManagerRoutesProtector";
import AdminDetailEmployee from "./pages/Admin/Employees/DetailEmployee";
import HRDetailEmployee from "./pages/HR/Employees/DetailEmployee";
import ManagerDetailEmployee from "./pages/Manager/Employees/DetailEmployee";
import AdminDashboardContent from "./pages/Admin/Dashboard/AdminDashboardContent";
import { HrDashboardContent } from "./pages/HR/Dashboard/HrDashboardContent";
import ManagerDashboardContent from "./pages/Manager/Dashboard/ManagerDashboardContent";
import AdminDepartments from "./pages/Admin/Departments/Departments";
import ManagerDepartments from "./pages/Manager/Departments/Departments";
import DetailDepartment from "./pages/Admin/Departments/DetailDepartment";
import UploadCompanyLogo from "./pages/Admin/Companies/UploadCompanyLogo";
import ProcessPayroll from "./pages/HR/Payroll/ProcessPayroll";
import Pay from "./pages/HR/pay/Pay";
import Payslip from "./pages/HR/pay/Payslip";
import ChangePassword from "./components/ChangePassword";
import PdfViewerComponent from "./components/PdfViewerComponent";
import HrDashboard from "./components/Dashboard/HrDashboard";
import EmployeesCompletedProbation from "./pages/HR/Employees/EmployeesCompletedProbation";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ManagerDashboard from "./components/Dashboard/ManagerDashboard";
import AssignDepartHead from "./pages/Manager/Departments/AssignDepartHead";
import HrSalaryRevisions from "./pages/HR/SalaryRevision/SalaryRevisions";
import SalaryRevisionRequests from "./pages/Manager/SalaryRevision/SalaryRevisionRequests";
import { CreateSalaryRevision } from "./pages/HR/SalaryRevision/CreateSalaryRevision/CreateSalaryRevision";
import { EmpSalaryRevisions } from "./components/EmpSalaryRevisions";

function Router() {
  const token = useAppSelector((state) => state.auth.access_token);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />

      {!token ? <Route path="/signin" element={<Login />} /> : null}

      {/* Protected Routes */}

      {/* Admin Routes */}
      <Route element={<AdminRoutesProtector />}>
        <Route path="admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<AdminDashboardContent />} />
          <Route path="employees">
            <Route index element={<AdminEmployeesPage />} />
            <Route path="detail/:id" element={<AdminDetailEmployee />} />
            <Route path="cv/:cvName" element={<PdfViewerComponent />} />
          </Route>
          <Route path="companies">
            <Route index element={<Companies />} />
            <Route path="detail/:id" element={<DetailCompany />} />
            <Route path="upload-logo" element={<UploadCompanyLogo />} />
          </Route>
          <Route path="departments">
            <Route index element={<AdminDepartments />} />
            <Route path="detail/:id" element={<DetailDepartment />} />
          </Route>
          <Route path="locations">
            <Route index element={<Locations />} />
            <Route path="detail/:id" element={<DetailLocation />} />
          </Route>
          <Route path="positions">
            <Route index element={<AdminPositions />} />
          </Route>

          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Route>

      {/* HR Routes */}
      <Route element={<HrRoutesProtector />}>
        <Route path="hr-dashboard" element={<HrDashboard />}>
          <Route index element={<HrDashboardContent />} />

          <Route path="employees">
            <Route index element={<HREmployeesPage />} />
            <Route path="detail/:id" element={<HRDetailEmployee />} />
            <Route path="cv/:cvName" element={<PdfViewerComponent />} />
            <Route
              path="probation/completed"
              element={<EmployeesCompletedProbation />}
            />
          </Route>

          <Route path="salary-revision">
            <Route index element={<HrSalaryRevisions />} />
            <Route path={"create"} element={<CreateSalaryRevision />} />
            <Route
              path=":employeeId/salary-revisions"
              element={<EmpSalaryRevisions />}
            />
          </Route>

          <Route path="payroll">
            <Route path="process-payroll" element={<ProcessPayroll />} />
          </Route>

          <Route path="pay">
            <Route path=":payrollId" element={<Pay />} />
          </Route>

          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Route>

      {/* payslip */}

      <Route path="/pay/:id/generate-payslip" element={<Payslip />} />

      {/* Manager Routes */}
      <Route element={<ManagerRoutesProtector />}>
        <Route path="manager-dashboard" element={<ManagerDashboard />}>
          <Route index element={<ManagerDashboardContent />} />
          <Route path="employees">
            <Route index element={<ManagerEmployeesPage />} />
            <Route path="detail/:id" element={<ManagerDetailEmployee />} />
            <Route path="cv/:cvName" element={<PdfViewerComponent />} />
          </Route>
          <Route path="departments">
            <Route index element={<ManagerDepartments />} />
            <Route path="assign-depart-head" element={<AssignDepartHead />} />
          </Route>
          <Route path="positions">
            <Route index element={<ManagerPositions />} />
          </Route>

          <Route path="salary-revisions">
            <Route index element={<SalaryRevisionRequests />} />
          </Route>

          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
