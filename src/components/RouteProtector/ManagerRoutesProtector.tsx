import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { UserTypeEnum } from "../../models/IEmployee";

export default function ManagerRoutesProtector() {
  const token = useAppSelector((state) => state.auth.access_token);
  const userType = useAppSelector((state) => state.auth.type);

  const isAuthenticated = (() => {
    if (token && userType === UserTypeEnum.MANAGER) {
      return true;
    }
    return false;
  })();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}
