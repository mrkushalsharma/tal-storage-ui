/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;