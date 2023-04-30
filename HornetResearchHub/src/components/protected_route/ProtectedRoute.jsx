import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

const ProtectedRoute = ({ redirectPath = "/register", children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
