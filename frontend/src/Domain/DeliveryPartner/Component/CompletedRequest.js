import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../User/context/AuthContext";

const REFRESH_MS = 5000;

const CompletedRequests = () => {
  const { user, token, hasRole } = useAuth();
  const [requests, setRequests] = useState([]);
  const intervalRef = useRef(null);

  const fetchCompleted = async () => {
    try {
      if (!user) return;

      const res = await axios.get(
        `http://localhost:8080/api/pickup-requests/assigned/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const completedOnly = res.data.filter(
        (r) => r.status === "COMPLETED"
      );

      setRequests(completedOnly);
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
    <div style={{ padding: "10px" }}>
      <h2>✅ Completed Requests</h2>

      {requests.length === 0 ? (
        <p>No completed requests yet.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "10px",
              background: "#f3fff3",
            }}
          >
            <p>
              <strong>Date:</strong>{" "}
              {new Date(req.pickupDate).toLocaleString()}
            </p>

            <p>
              <strong>Address:</strong> {req.address}, {req.city}
            </p>

            <p style={{ color: "green" }}>
              <strong>Status:</strong> Completed
            </p>

            {/* Items */}
            {req.items?.length > 0 && (
              <>
                <strong>Items:</strong>
                <ul>
                  {req.items.map((item) => (
                    <li key={item.id}>
                      {item.title} ({item.points} pts)
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* EcoPoints */}
            <p style={{ color: "green", fontWeight: "bold" }}>
              🌱 EcoPoints Earned: {req.ecoPoints ?? "N/A"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedRequests;
