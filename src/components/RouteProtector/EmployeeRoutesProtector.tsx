import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { UserTypeEnum } from "../../models/IEmployee";

export default function EmployeeRoutesProtector() {
  const token = useAppSelector((state) => state.auth.access_token);
  const userType = useAppSelector((state) => state.auth.userType);

  const isAuthenticated = (() => {
    if (token && userType === UserTypeEnum.EMPLOYEE) {
      return true;
    }
    return false;
  })();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}