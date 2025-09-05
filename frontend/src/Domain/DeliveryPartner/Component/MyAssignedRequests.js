// src/Domain/DeliveryPartner/Component/MyAssignRequest.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../User/context/AuthContext";

const REFRESH_MS = 5000;

const MyAssignRequest = () => {
  const { user, token, hasRole } = useAuth();
  const [requests, setRequests] = useState([]);
  const intervalRef = useRef(null);

  const fetchMine = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/pickup-requests/assigned/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  if (!hasRole("ROLE_DELIVERY_PARTNER")) {
    return <p>❌ Access Denied. Delivery Partner role required.</p>;
  }

  return (
    <div>
      <h2>My Assigned Requests</h2>
      {requests.length === 0 ? <p>No assigned requests yet.</p> : null}
      {requests.map((req) => (
        <div key={req.id} className="p-4 border rounded mb-2 shadow">
          <p><strong>Date:</strong> {req.pickupDate}</p>
          <p><strong>Address:</strong> {req.address}, {req.city}</p>
          <p><strong>Status:</strong> {req.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyAssignRequest;
