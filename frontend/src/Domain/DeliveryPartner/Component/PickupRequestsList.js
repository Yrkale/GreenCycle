// src/Domain/DeliveryPartner/Component/PickupRequestsList.js
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../User/context/AuthContext";
import axios from "axios";
import "./PickupRequestsList.css";

const REFRESH_MS = 5000;

const PickupRequestsList = () => {
  const { user, token, hasRole } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  const formatPickupTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Fetch username by userId
  const fetchUserById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.username;
    } catch {
      return "Unknown User";
    }
  };

  // Fetch all pickup requests
  const fetchAll = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/pickup-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Only pending
      const pending = res.data.filter((r) => r.status === "PENDING");

      // Add username to each request
      const withNames = await Promise.all(
        pending.map(async (req) => {
          const username = await fetchUserById(req.userId);
          return { ...req, username };
        })
      );

      setRequests(withNames);
    } catch (err) {
      console.error("Failed to load pickup requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasRole("DELIVERY_PARTNER")) return;

    fetchAll();
    intervalRef.current = setInterval(fetchAll, REFRESH_MS);

    return () => clearInterval(intervalRef.current);
  }, [token, hasRole]);

  const accept = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/pickup-requests/${id}/accept`,
        {},
        {
          params: { partnerId: user.id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchAll();
    } catch (err) {
      alert("❌ Failed to accept request.");
    }
  };

  if (!hasRole("DELIVERY_PARTNER"))
    return <p>❌ Access Denied. Delivery Partner role required.</p>;

  if (loading) return <p>Loading…</p>;

  return (
    <div className="">
      <h2 className="pickup-title">📦 Available Pickup Requests</h2>

      {requests.length === 0 ? (
        <p>No pending requests right now.</p>
      ) : (
        <div className="pickup-grid">
          {requests.map((req, index) => (
            <div className={`pickup-card pastel-${index % 5}`} key={req.id}>
              {/* CUSTOMER NAME */}
              <h3 className="pickup-card-title">{req.username}</h3>

              {/* PICKUP TIME */}
              <h4 className="pickup-card-subtitle">
                {formatPickupTime(req.pickupDate)}
              </h4>

              {/* ADDRESS */}
              <p>
                <strong>Address:</strong> {req.address}, {req.city}
              </p>

              {/* DESCRIPTION */}
              {req.description && (
                <p>
                  <strong>Description:</strong> {req.description}
                </p>
              )}

              {/* ITEMS */}
              {req.items?.length > 0 && (
                <div className="pickup-items">
                  <strong>Items:</strong>
                  <ul>
                    {req.items.map((item) => (
                      <li key={item.id}>
                        {item.title} ({item.points} pts)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ACCEPT BUTTON */}
              <button
                className="pickup-accept-btn"
                onClick={() => accept(req.id)}
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PickupRequestsList;
