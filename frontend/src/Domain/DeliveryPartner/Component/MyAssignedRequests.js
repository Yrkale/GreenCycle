import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../User/context/AuthContext";

const REFRESH_MS = 5000;

const MyAssignRequest = () => {
  const { user, token, hasRole } = useAuth();
  const [requests, setRequests] = useState([]);
  const [otpInputs, setOtpInputs] = useState({});
  const [message, setMessage] = useState("");
  const intervalRef = useRef(null);

  // Convert date → "Nov 23, 2025, 10:00 AM - 12:00 PM"
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
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.username;
  } catch (err) {
    console.error("User fetch failed", err);
    return "Unknown User";
  }
};


  // Fetch only ASSIGNED requests
  const fetchAssigned = async () => {
  try {
    if (!user) return;

    const res = await axios.get(
      `http://localhost:8080/api/pickup-requests/assigned/${user.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const assignedOnly = await Promise.all(
      res.data
        .filter((r) => r.status === "ASSIGNED")
        .map(async (req) => {
          const username = await fetchUserById(req.userId);

          return { ...req, username };
        })
    );

    setRequests(assignedOnly);
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
            {/* REQUEST CREATOR */}
           <p>
  <strong>Customer:</strong> {req.username}

</p>


            {/* DATE + TIME 12 HR */}
            <p>
              <strong>Pickup Time:</strong> {formatPickupTime(req.pickupDate)}
            </p>

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

            {/* OTP Box */}
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
                }}
              >
                Verify OTP
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAssignRequest;
