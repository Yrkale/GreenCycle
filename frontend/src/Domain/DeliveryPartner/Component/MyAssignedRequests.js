import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../User/context/AuthContext";

const REFRESH_MS = 5000;

const MyAssignRequest = () => {
  const { user, token, hasRole } = useAuth();
  const [requests, setRequests] = useState([]);
  const [otpInputs, setOtpInputs] = useState({}); // store OTP inputs per request
  const [message, setMessage] = useState("");
  const intervalRef = useRef(null);

  // 🔹 Fetch assigned pickup requests
  const fetchMine = async () => {
    try {
      if (!user) return;
      const res = await axios.get(
        `http://localhost:8080/api/pickup-requests/assigned/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to load assigned requests", err);
    }
  };

  useEffect(() => {
    if (!hasRole("ROLE_DELIVERY_PARTNER")) return;
    fetchMine();
    intervalRef.current = setInterval(fetchMine, REFRESH_MS);
    return () => clearInterval(intervalRef.current);
  }, [token, user]);

  // 🔹 Handle OTP input change
  const handleOtpChange = (id, value) => {
    setOtpInputs((prev) => ({ ...prev, [id]: value }));
  };

  // 🔹 Verify OTP
  const verifyOtp = async (id) => {
    const otp = otpInputs[id];
    if (!otp) {
      setMessage("⚠️ Please enter OTP before verifying.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/pickup-requests/${id}/verify-otp`,
        { otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "✅ Pickup completed successfully!");
      fetchMine(); // refresh list after verification
    } catch (err) {
      console.error("OTP verification failed", err);
      setMessage(err.response?.data?.message || "❌ Invalid OTP or request failed.");
    }
  };

  if (!hasRole("ROLE_DELIVERY_PARTNER")) {
    return <p>❌ Access Denied. Delivery Partner role required.</p>;
  }

  return (
    <div style={{ padding: "10px" }}>
      <h2>📦 My Assigned Requests</h2>

      {message && (
        <p
          style={{
            background: "#eef6ff",
            color: "#0645ad",
            padding: "8px",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        >
          {message}
        </p>
      )}

      {requests.length === 0 ? (
        <p>No assigned requests yet.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "10px",
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <p>
              <strong>Date:</strong>{" "}
              {new Date(req.pickupDate).toLocaleString()}
            </p>
            <p>
              <strong>Address:</strong> {req.address}, {req.city}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>

            {/* Show item details */}
            {req.items && req.items.length > 0 && (
              <div>
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

            {/* ✅ OTP verification UI */}
            {req.status === "ASSIGNED" && (
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpInputs[req.id] || ""}
                  onChange={(e) => handleOtpChange(req.id, e.target.value)}
                  style={{
                    padding: "6px",
                    marginRight: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={() => verifyOtp(req.id)}
                  style={{
                    background: "#4caf50",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  ✅ Verify OTP
                </button>
              </div>
            )}

            {req.status === "COMPLETED" && (
              <p style={{ color: "green", fontWeight: "bold" }}>
                ✅ Pickup Completed — EcoPoints: {req.ecoPoints ?? "N/A"}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyAssignRequest;
