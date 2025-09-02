import React from "react";
import { useAuth } from "../User/context/AuthContext";

function AdminDashboard() {
  const { user, hasRole } = useAuth();

  if (!user) {
    return <h2>❌ You must be logged in to view this page.</h2>;
  }

  if (!hasRole("ROLE_SUPER_ADMIN")) {
    return <h2>🚫 Access Denied: Admins only!</h2>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛠 Admin Dashboard</h1>
      <p>Welcome, <strong>{user.username || user.email}</strong> 👋</p>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>📊 Overview</h2>
        <ul>
          <li>Total Users: 120</li>
          <li>Total Pickup Requests: 45</li>
          <li>Active Delivery Partners: 8</li>
        </ul>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>⚙️ Admin Tools</h2>
        <button style={{ marginRight: "1rem" }}>Manage Users</button>
        <button style={{ marginRight: "1rem" }}>View Pickup Requests</button>
        <button>System Settings</button>
      </section>
    </div>
  );
}

export default AdminDashboard;
