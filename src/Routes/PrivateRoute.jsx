import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;