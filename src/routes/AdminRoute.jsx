import React from "react";
import { Navigate } from "react-router";

function AdminRoute(props) {
  let token = localStorage.getItem("token");
  let isAdmin = localStorage.getItem("isAdmin");
  if (token && isAdmin) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/blogs" />;
  }
}
export default AdminRoute;
