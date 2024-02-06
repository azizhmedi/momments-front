import React from "react";
import { Navigate } from "react-router";
function PrivateRoute(props) {
  let token = localStorage.getItem("token");
  let isUser = localStorage.getItem("isUser");
  let isAdmin = localStorage.getItem("isAdmin");
  let isBanned = localStorage.getItem("isBanned");
  if (
    (token && isUser === "true" && isBanned === "false") ||
    isAdmin === "true"
  ) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
