import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { token } from "./DecodeToken";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const location = useLocation();
  localStorage.setItem("intendedPath", location.pathname);

  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
