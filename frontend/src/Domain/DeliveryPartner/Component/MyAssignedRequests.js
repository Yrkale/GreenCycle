import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../User/context/AuthContext";
import "./MyAssignRequest.css"; // <-- NEW CSS FILE

const REFRESH_MS = 5000;

const MyAssignRequest = () => {
  const { user, token, hasRole } = useAuth();
  const [requests, setRequests] = useState([]);
  const [otpInputs, setOtpInputs] = useState({});
  const [message, setMessage] = useState("");
  const intervalRef = useRef(null);

  const formatPickupTime = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const fetchUserById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.username;
    } catch (err) {
      console.error("User fetch failed", err);
      return "Unknown User";
    }
  };

  const fetchAssigned = async () => {
  try {
    if (!user) return;

    const res = await axios.get(
      `http://localhost:8080/api/pickup-requests/assigned/${user.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Filter assigned only
    const rawAssigned = res.data.filter((r) => r.status === "ASSIGNED");

    // Add username
    const assignedWithNames = await Promise.all(
      rawAssigned.map(async (req) => {
        const username = await fetchUserById(req.userId);
        return { ...req, username };
      })
    );

    // ⭐ Sort by ID DESC (most recent first)
    const sorted = assignedWithNames.sort((a, b) => b.id - a.id);

    setRequests(sorted);
  } catch (err) {
    console.error("Failed to load assigned requests", err);
  }
};



  useEffect(() => {
    if (!hasRole("DELIVERY_PARTNER")) return;

    fetchAssigned();
    intervalRef.current = setInterval(fetchAssigned, REFRESH_MS);

    return () => clearInterval(intervalRef.current);
  }, [token, user]);

  const handleOtpChange = (id, value) => {
    setOtpInputs((prev) => ({ ...prev, [id]: value }));
  };

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
      fetchAssigned();
    } catch (err) {
      console.error("OTP failed", err);
      setMessage(err.response?.data?.message || "❌ Invalid OTP.");
    }
  };

  return (
   <div className="">
  <h2 className="assign-title">📦 My Assigned Requests</h2>

  {message && <p className="assign-message">{message}</p>}

  {requests.length === 0 ? (
    <p>No assigned requests yet.</p>
  ) : (
    <div className="assign-grid">
      {requests.map((req, index) => (
        <div
          className={`assign-card pastel-${index % 5}`} 
          key={req.id}
        >
          <h3 className="assign-card-title">{req.username}</h3>
          <h4 className="assign-card-subtitle">
            {formatPickupTime(req.pickupDate)}
          </h4>

          <p><strong>Address:</strong> {req.address}, {req.city}</p>

          {req.description && (
            <p><strong>Description:</strong> {req.description}</p>
          )}

          {req.items?.length > 0 && (
            <div className="assign-items">
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

          <div className="assign-otp-row">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otpInputs[req.id] || ""}
              onChange={(e) => handleOtpChange(req.id, e.target.value)}
              className="assign-otp-input"
            />

            <button
              onClick={() => verifyOtp(req.id)}
              className="assign-otp-btn"
            >
              Verify OTP
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default MyAssignRequest;
