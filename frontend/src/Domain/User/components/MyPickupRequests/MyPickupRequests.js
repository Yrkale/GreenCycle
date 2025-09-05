// src/Domain/User/components/MyPickupRequests.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./MyPickupRequests.css"; // ✅ import CSS

const REFRESH_MS = 5000;

const MyPickupRequests = () => {
  const { user, token, hasRole } = useAuth();
  const [requests, setRequests] = useState([]);
  const intervalRef = useRef(null);

  const fetchMine = async () => {
    try {
      if (!user) return;

      const res = await axios.get(
        `http://localhost:8080/api/pickup-requests/user/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRequests(res.data);
    } catch (err) {
      console.error("Failed to load my requests", err);
    }
  };

  const cancelRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/pickup-requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      console.error("Failed to cancel request", err);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchMine();
    intervalRef.current = setInterval(fetchMine, REFRESH_MS);
    return () => clearInterval(intervalRef.current);
  }, [token, user]);

  if (!user || !hasRole("ROLE_USER")) {
    return <p className="error-message">❌ Please log in as a user to view your pickup requests.</p>;
  }

  return (
    <div className="my-pickups-container">
      <h2 className="title">📦 My Pickup Requests</h2>
      {requests.length === 0 ? (
        <p className="no-requests">No requests yet.</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="pickup-card">
  <p><strong>Date:</strong> {new Date(req.pickupDate).toLocaleString()}</p>
  <p><strong>Address:</strong> {req.address}, {req.city}</p>
  <p>
    <strong>Status:</strong>{" "}
    <span className={`status ${req.status.toLowerCase()}`}>{req.status}</span>
  </p>
  <p><strong>Assigned Partner:</strong> {req.assignedTo ?? "Not assigned yet"}</p>

  {/* ✅ Show Items */}
  {req.items && req.items.length > 0 && (
    <div className="items-list">
      <strong>Items:</strong>
      <ul>
        {req.items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )}

  {req.status === "PENDING" && (
    <button
      className="cancel-btn"
      onClick={() => cancelRequest(req.id)}
    >
      ❌ Cancel Request
    </button>
  )}
</div>
        ))
      )}
    </div>
  );
};

export default MyPickupRequests;
