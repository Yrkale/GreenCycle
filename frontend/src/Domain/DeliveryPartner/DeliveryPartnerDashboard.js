// src/Domain/DeliveryPartner/DeliveryPartnerDashboard.js
import React, { useEffect, useState } from "react";
import MyAssignedRequests from "./Component/MyAssignedRequests";
import PickupRequestsList from "./Component/PickupRequestsList";
import CompletedRequests from "./Component/CompletedRequest";
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

  const [sidebarOpen, setSidebarOpen] = useState(false); // ⭐ MOBILE MENU TOGGLE

  const [stats, setStats] = useState({
    assigned: 0,
    completed: 0,
    pending: 0,
  });

  const [activePage, setActivePage] = useState("dashboard");

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

  const renderPage = () => {
    switch (activePage) {
      case "assigned":
        return <MyAssignedRequests />;

      case "allRequests":
        return <PickupRequestsList />;

      case "completed":
        return <CompletedRequests filter="COMPLETED" />;

      case "profile":
        return (
          <div className="partner-panel">
            <h2>👤 My Profile</h2>
            <p><b>Name:</b> {user.username}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Role:</b> Delivery Partner</p>
          </div>
        );

      default:
      case "dashboard":
        return (
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
              <h3>Live Requests</h3>
              <p>{stats.pending}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* ⭐⭐ MOBILE MENU BUTTON ⭐⭐ */}
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* ⭐⭐ SIDEBAR ⭐⭐ */}
      <div className={`partner-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div>
          <h2 className="partner-logo">🚛 Partner Panel</h2>

          <nav className="partner-menu">
            <ul>
              <li
                className={activePage === "dashboard" ? "active" : ""}
                onClick={() => {
                  setActivePage("dashboard");
                  setSidebarOpen(false);
                }}
              >
                <FaHome /> Dashboard
              </li>

              <li
                className={activePage === "assigned" ? "active" : ""}
                onClick={() => {
                  setActivePage("assigned");
                  setSidebarOpen(false);
                }}
              >
                <FaTruck /> My Assigned Pickups
              </li>

              <li
                className={activePage === "allRequests" ? "active" : ""}
                onClick={() => {
                  setActivePage("allRequests");
                  setSidebarOpen(false);
                }}
              >
                <FaClipboardList /> All Pickup Requests
              </li>

              <li
                className={activePage === "completed" ? "active" : ""}
                onClick={() => {
                  setActivePage("completed");
                  setSidebarOpen(false);
                }}
              >
                <FaCheckCircle /> Completed
              </li>

              <li
                className={activePage === "profile" ? "active" : ""}
                onClick={() => {
                  setActivePage("profile");
                  setSidebarOpen(false);
                }}
              >
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

      {/* ⭐⭐ MAIN CONTENT ⭐⭐ */}
      <div className="partner-dashboard">
        <h1>Welcome, {user?.username} 👋</h1>
        <p>Your daily delivery summary.</p>

        {renderPage()}
      </div>
    </>
  );
};

export default DeliveryPartnerDashboard;
