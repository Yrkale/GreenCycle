// src/Domain/DeliveryPartner/DeliveryPartnerDashboard.js
import React, { useEffect, useState } from "react";
import MyAssignedRequests from "./Component/MyAssignedRequests";
import PickupRequestsList from "./Component/PickupRequestsList";
import { useAuth } from "../User/context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaTruck,
  FaCheckCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import "./DeliveryPartnerDashboard.css";

const DeliveryPartnerDashboard = () => {
  const { user, token, hasRole, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    assigned: 0,
    completed: 0,
    pending: 0,
  });

  // Redirect unauthorized users
  useEffect(() => {
    if (!user) return;
    if (!hasRole("DELIVERY_PARTNER")) navigate("/");
  }, [user, hasRole, navigate]);

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/pickup-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const requests = res.data;

      const assigned = requests.filter(
        (r) => r.assignedTo === user?.id && r.status === "ASSIGNED"
      ).length;

      const completed = requests.filter(
        (r) => r.assignedTo === user?.id && r.status === "COMPLETED"
      ).length;

      const pending = requests.filter((r) => r.status === "PENDING").length;

      setStats({ assigned, completed, pending });
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  useEffect(() => {
    if (user && hasRole("DELIVERY_PARTNER")) {
      fetchStats();
    }
  }, [user, token]);

  if (!user || !hasRole("DELIVERY_PARTNER")) return null;

  return (
    <>
      {/* ======================= SIDEBAR ======================= */}
      <div className="partner-sidebar">
        <div>
          <h2 className="partner-logo">🚛 Partner Panel</h2>

          <nav className="partner-menu">
            <ul>
              <li>
                <FaHome /> Dashboard
              </li>
              <li>
                <FaTruck /> My Assigned Pickups
              </li>
              <li>
                <FaClipboardList /> All Pickup Requests
              </li>
              <li>
                <FaCheckCircle /> Completed
              </li>
              <li>
                <FaUser /> Profile
              </li>
            </ul>
          </nav>
        </div>

        <button
          className="partner-logout-btn"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* ======================= MAIN DASHBOARD ======================= */}
      <div className="partner-dashboard">
        <h1>Welcome, {user?.username} 👋</h1>
        <p>Your daily delivery summary.</p>

        {/* Stats Cards */}
        <div className="partner-stats">
          <div className="partner-stat-card">
            <h3>Assigned Requests</h3>
            <p>{stats.assigned}</p>
          </div>

          <div className="partner-stat-card">
            <h3>Completed Pickups</h3>
            <p>{stats.completed}</p>
          </div>

          <div className="partner-stat-card">
            <h3>Pending Requests</h3>
            <p>{stats.pending}</p>
          </div>
        </div>

        {/* Panels */}
        <div className="partner-panels">
          <div className="partner-panel">
            <h2>📌 My Assigned Pickups</h2>
            <MyAssignedRequests />
          </div>

          <div className="partner-panel">
            <h2>📋 All Pickup Requests</h2>
            <PickupRequestsList />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryPartnerDashboard;
