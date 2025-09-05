// src/Domain/DeliveryPartner/Component/MyAssignedRequests.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../User/context/AuthContext";

const REFRESH_MS = 5000;

const MyAssignedRequests = () => {
  const [requests, setRequests] = useState([]);
  const { user, token, hasRole } = useAuth();
  const intervalRef = useRef(null);

  const fetchAssigned = async () => {
    try {
      // You can also call /api/pickup-requests/partner/{partnerId}
      const res = await axios.get("/api/pickup-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.filter((r) => r.assignedTo === user?.id));
    } catch (err) {
      console.error("Error fetching assigned requests", err);
    }
  };

  useEffect(() => {
    if (!hasRole("ROLE_DELIVERY_PARTNER")) return;

    fetchAssigned(); // initial
    intervalRef.current = setInterval(fetchAssigned, REFRESH_MS);
    return () => clearInterval(intervalRef.current);
  }, [token, hasRole]);

  const completeRequest = async (id) => {
    try {
      await axios.put(
        `/api/pickup-requests/${id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAssigned();
    } catch (err) {
      alert("Failed to complete request.");
    }
  };

  if (!hasRole("ROLE_DELIVERY_PARTNER")) {
    return <p>❌ Access Denied. Delivery Partner role required.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Assigned Pickup Requests</h2>
      {requests.length === 0 ? (
        <p>No requests assigned yet.</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="p-4 border rounded mb-2 shadow">
            <p><strong>Address:</strong> {req.address}, {req.city}</p>
            <p><strong>Date:</strong> {req.pickupDate}</p>
            <p><strong>Status:</strong> {req.status}</p>
            {req.status === "ASSIGNED" && (
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
                onClick={() => completeRequest(req.id)}
              >
                Mark Completed
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyAssignedRequests;
