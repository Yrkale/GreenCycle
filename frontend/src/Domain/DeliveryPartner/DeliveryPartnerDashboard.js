import React from "react";
import MyAssignedRequests from "./Component/MyAssignedRequests";
import PickupRequestsList from "./Component/PickupRequestsList";
import { useAuth } from "../User/context/AuthContext";
import "./DeliveryPartnerDashboard.css"

const DeliveryPartnerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="partner-dashboard" style={{ padding: "20px" }}>
      {/* Header */}
      <h1>Welcome, {user?.username || "Delivery Partner"} 👋</h1>
      <p>Here’s an overview of your delivery tasks.</p>

      {/* Stats Section */}
      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        <div className="stat-card">
          <h3>Assigned Requests</h3>
          <p>5</p> {/* replace with dynamic count */}
        </div>
        <div className="stat-card">
          <h3>Completed Pickups</h3>
          <p>12</p> {/* replace with backend data */}
        </div>
        <div className="stat-card">
          <h3>Pending Requests</h3>
          <p>3</p>
        </div>
      </div>

      {/* Panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div className="panel">
          <h2>My Assigned Requests</h2>
          <MyAssignedRequests />
        </div>
        <div className="panel">
          <h2>Available Pickup Requests</h2>
          <PickupRequestsList />
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerDashboard;
