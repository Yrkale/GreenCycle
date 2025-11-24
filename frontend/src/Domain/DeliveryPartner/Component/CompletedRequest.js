import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../User/context/AuthContext";
import "./CompletedRequests.css"; // NEW CSS FILE

const REFRESH_MS = 5000;

const CompletedRequests = () => {
  const { user, token, hasRole } = useAuth();
  const [requests, setRequests] = useState([]);
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

  const fetchCompleted = async () => {
  try {
    if (!user) return;

    const res = await axios.get(
      `http://localhost:8080/api/pickup-requests/assigned/${user.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const completedOnly = res.data
      .filter((r) => r.status === "COMPLETED")
      .sort((a, b) => new Date(b.pickupDate) - new Date(a.pickupDate)); // <-- SORT HERE

    const withUsernames = await Promise.all(
      completedOnly.map(async (req) => {
        const username = await fetchUserById(req.userId);
        return { ...req, username };
      })
    );

    setRequests(withUsernames);
  } catch (err) {
    console.error("Failed to load completed requests", err);
  }
};


  useEffect(() => {
    if (!hasRole("DELIVERY_PARTNER")) return;

    fetchCompleted();
    intervalRef.current = setInterval(fetchCompleted, REFRESH_MS);

    return () => clearInterval(intervalRef.current);
  }, [token, user]);


  return (
    <div className="completed-container">
      <h2 className="completed-title">✅ Completed Requests</h2>

      {requests.length === 0 ? (
        <p>No completed requests yet.</p>
      ) : (
        <div className="completed-grid">
          {requests.map((req, i) => (
            <div className={`completed-card pastel-${i % 5}`} key={req.id}>
              {/* CUSTOMER NAME */}
              <h3 className="completed-card-title">{req.username}</h3>

              {/* COMPLETED TIME */}
              <h4 className="completed-card-subtitle">
                {formatPickupTime(req.pickupDate)}
              </h4>

              {/* ADDRESS */}
              <p>
                <strong>Address:</strong> {req.address}, {req.city}
              </p>

              {/* ITEMS */}
              {req.items?.length > 0 && (
                <div className="completed-items">
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

              {/* Eco Points */}
              <p className="eco-earned">
                🌱 <strong>EcoPoints Earned:</strong> {req.ecoPoints ?? "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedRequests;
