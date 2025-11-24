// src/Domain/Admin/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../User/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaRecycle,
  FaTruck,
  FaSignOutAlt,
  FaPlus,
  FaThumbsUp,
} from "react-icons/fa";
import { MdOutlinePending, MdAssignmentAdd } from "react-icons/md";

import AdminSidebar from "./AdminSidebar";

import "./AdminDashboardResponsive.css"; // ⭐ NEW responsive file

const AdminDashboard = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPartners: 0,
    totalPickups: 0,
    pending: 0,
    completed: 0,
    assigned: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  useEffect(() => {
    if (token) fetchStats();
  }, [token]);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="admin-main admin-dashboard-container">
        <h1>Welcome, {user?.username} 👋</h1>
        <p>Here’s the complete overview of Greencycle operations.</p>

        {/* ------- DASHBOARD CARDS ------- */}
        <div className="stats-grid">
          <div className="stat-card green">
            <FaUsers className="stat-icon" />
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="stat-card blue">
            <FaTruck className="stat-icon" />
            <h3>Delivery Partners</h3>
            <p>{stats.totalPartners}</p>
          </div>

          <div className="stat-card purple">
            <FaRecycle className="stat-icon" />
            <h3>Total Pickups</h3>
            <p>{stats.totalPickups}</p>
          </div>

          <div className="stat-card orange">
            <MdOutlinePending className="stat-icon" />
            <h3>Pending</h3>
            <p>{stats.pending}</p>
          </div>

          <div className="stat-card yellow">
            <MdAssignmentAdd className="stat-icon" />
            <h3>Assigned</h3>
            <p>{stats.assigned}</p>
          </div>

          <div className="stat-card teal">
            <FaThumbsUp className="stat-icon" />
            <h3>Completed</h3>
            <p>{stats.completed}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
