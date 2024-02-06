import React from "react";
import { Navigate } from "react-router";
function PublicRoute(props) {
  let token = localStorage.getItem("token");
  let isUser = localStorage.getItem("isUser");
  let isBanned = localStorage.getItem("isBanned");
  if (token && isUser==="true" && isBanned==="false") {
    return <Navigate to="/error" />;
  } else {
    return <> {props.children}</>;
  }
}

export default PublicRoute;
