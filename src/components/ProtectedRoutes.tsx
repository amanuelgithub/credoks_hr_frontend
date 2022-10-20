import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

/**
 * If token is not available it will redirect to the `/signin` page.
 * Otherwise allow other component to render.
 */
function ProtectedRoutes() {
  const token = useAppSelector((state) => state.auth.access_token);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
}

export default ProtectedRoutes;
