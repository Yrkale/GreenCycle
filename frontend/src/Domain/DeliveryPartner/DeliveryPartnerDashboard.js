// src/Domain/DeliveryPartner/DeliveryPartnerDashboard.js
import React, { useEffect, useState } from "react";
import MyAssignedRequests from "./Component/MyAssignedRequests";
import PickupRequestsList from "./Component/PickupRequestsList";
import { useAuth } from "../User/context/AuthContext";
import axios from "axios";
import "./DeliveryPartnerDashboard.css";

const DeliveryPartnerDashboard = () => {
  const { user, token, hasRole } = useAuth();
  const [stats, setStats] = useState({
    assigned: 0,
    completed: 0,
    pending: 0,
  });

  const fetchStats = async () => {
    try {
      // Fetch all pickup requests from backend
      const res = await axios.get("http://localhost:8080/api/pickup-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allRequests = res.data;

      // Assigned to current partner
      const assigned = allRequests.filter(
        (req) => req.assignedTo === user?.id && req.status === "ASSIGNED"
      ).length;

      // Completed pickups
      const completed = allRequests.filter(
        (req) => req.assignedTo === user?.id && req.status === "COMPLETED"
      ).length;

      // Pending requests (not yet assigned to anyone)
      const pending = allRequests.filter(
        (req) => req.status === "PENDING"
      ).length;

      setStats({ assigned, completed, pending });
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  useEffect(() => {
    if (user && hasRole("ROLE_DELIVERY_PARTNER")) {
      fetchStats();
    }
  }, [user, token]);

  return (
    <div className="partner-dashboard" style={{ padding: "20px" }}>
      {/* Header */}
      <h1>Welcome, {user?.username || "Delivery Partner"} 👋</h1>
      <p>Here’s an overview of your delivery tasks.</p>

      {/* Stats Section */}
      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        <div className="stat-card">
          <h3>Assigned Requests</h3>
          <p>{stats.assigned}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Pickups</h3>
          <p>{stats.completed}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Requests</h3>
          <p>{stats.pending}</p>
        </div>
      </div>

      {/* Panels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div className="panel">
          <MyAssignedRequests />
        </div>
        <div className="panel">
          <PickupRequestsList />
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerDashboard;
