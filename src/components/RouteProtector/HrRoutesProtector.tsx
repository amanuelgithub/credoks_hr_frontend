import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { UserTypeEnum } from "../../models/IEmployee";

export default function HrRoutesProtector() {
  const token = useAppSelector((state) => state.auth.access_token);
  const userType = useAppSelector((state) => state.auth.type);

  const isAuthenticated = (() => {
    if (token && userType === UserTypeEnum.HR) {
      return true;
    }
    return false;
  })();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}
