import React from "react";
import { useAuth } from "../User/context/AuthContext";
import "./AdminDashboard.css";

function AdminDashboard() {
  const { user, hasRole } = useAuth();

  if (!user) {
    return <h2 className="error-msg">❌ You must be logged in to view this page.</h2>;
  }

  if (!hasRole("ROLE_SUPER_ADMIN")) {
    return <h2 className="error-msg">🚫 Access Denied: Admins only!</h2>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>🛠 Admin Dashboard</h1>
        <p>
          Welcome, <strong>{user.username || user.email}</strong> 👋
        </p>
      </header>

      <section className="overview">
        <h2>📊 Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">Total Users: <span>120</span></div>
          <div className="stat-card">Pickup Requests: <span>45</span></div>
          <div className="stat-card">Delivery Partners: <span>8</span></div>
        </div>
      </section>

      <section className="tools">
        <h2>⚙️ Admin Tools</h2>
        <div className="btn-group">
          <button>Manage Users</button>
          <button>View Pickup Requests</button>
          <button>System Settings</button>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
