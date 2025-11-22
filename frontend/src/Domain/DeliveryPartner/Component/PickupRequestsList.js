// src/Domain/DeliveryPartner/Component/PickupRequestsList.js
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../User/context/AuthContext";
import axios from "axios";

const REFRESH_MS = 5000;

const PickupRequestsList = () => {
  const { user, token, hasRole } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  // Fetch all pickup requests
  const fetchAll = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/pickup-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      //console.log("Fetched pickup requests:", res.data); // Debug
      // ✅ Only keep pending requests
      setRequests(res.data.filter((r) => r.status === "PENDING"));
    } catch (err) {
      console.error("Failed to load pickup requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasRole("DELIVERY_PARTNER")) return;

    fetchAll(); // initial load
    intervalRef.current = setInterval(fetchAll, REFRESH_MS);
    return () => clearInterval(intervalRef.current);
  }, [token, hasRole]);

  // Accept a pickup request
  const accept = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/pickup-requests/${id}/accept`,
        {},
        {
          params: { partnerId: user.id }, // Assign to current partner
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAll(); // reload list after accepting
    } catch (err) {
      console.error("Accept failed", err);
      alert("❌ Failed to accept request.");
    }
  };

  if (!hasRole("DELIVERY_PARTNER")) {
    return <p>❌ Access Denied. Delivery Partner role required.</p>;
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h2>Available Pickup Requests</h2>
      {requests.length === 0 ? <p>No pending requests right now.</p> : null}
      {requests.map((req) => (
        <div key={req.id} className="p-4 border rounded mb-2 shadow">
          <p><strong>Address:</strong> {req.address}, {req.city}</p>
          <p><strong>Date:</strong> {req.pickupDate}</p>
          <p><strong>Status:</strong> {req.status}</p>

          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => accept(req.id)}
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
};

export default PickupRequestsList;
