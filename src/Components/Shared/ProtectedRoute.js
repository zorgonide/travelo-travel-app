import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./user-context";

function ProtectedRoute(props) {
  const {
    state: { loggedIn },
  } = useUser();
  let verified = loggedIn;
  return verified ? <Outlet /> : <Navigate to={{ pathname: "/login" }} />;
}

export default ProtectedRoute;
