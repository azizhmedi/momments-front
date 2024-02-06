import React from "react";
import AdminPrivateNav from "../components/AdminPrivateNav";
import "./style.css"
function AdminDashboard() {
  return (
    <div>
      <AdminPrivateNav />
      <div className="admin-dashboard">

      <h1>ADMIN DASHBOARD</h1>
      </div>
    </div>
  );
}

export default AdminDashboard;
