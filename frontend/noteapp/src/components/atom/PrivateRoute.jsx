import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth0();
  const isDemoUser = localStorage.getItem("isDemoUser") === "true";
  return isAuthenticated || isDemoUser ? children : <Navigate to="/" />;
}

export default PrivateRoute;
