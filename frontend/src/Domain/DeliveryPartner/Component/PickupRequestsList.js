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

  const fetchAll = async () => {
    try {
      const res = await axios.get("/api/pickup-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to load pickup requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasRole("ROLE_DELIVERY_PARTNER")) return;

    fetchAll(); // initial
    intervalRef.current = setInterval(fetchAll, REFRESH_MS);
    return () => clearInterval(intervalRef.current);
  }, [token, hasRole]);

  const accept = async (id) => {
    try {
      await axios.put(
        `/api/pickup-requests/${id}/accept`,
        {},
        {
          params: { partnerId: user.id }, // your auth profile has id
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAll();
    } catch (err) {
      console.error("Accept failed", err);
      alert("❌ Failed to accept request.");
    }
  };

  if (!hasRole("ROLE_DELIVERY_PARTNER")) {
    return <p>❌ Access Denied. Delivery Partner role required.</p>;
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h2>All Pickup Requests</h2>
      {requests.length === 0 ? <p>No requests yet.</p> : null}
      {requests.map((req) => {
        const isPending = req.status === "PENDING";
        const isMine = req.assignedTo === user?.id;

        return (
          <div key={req.id} className="p-4 border rounded mb-2 shadow">
            <p><strong>Address:</strong> {req.address}, {req.city}</p>
            <p><strong>Date:</strong> {req.pickupDate}</p>
            <p><strong>Status:</strong> {req.status}</p>
            <p><strong>Assigned To:</strong> {req.assignedTo ?? "—"}</p>

            {isPending && (
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => accept(req.id)}
              >
                Accept
              </button>
            )}

            {isMine && req.status === "ASSIGNED" && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded">
                You accepted this
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PickupRequestsList;
