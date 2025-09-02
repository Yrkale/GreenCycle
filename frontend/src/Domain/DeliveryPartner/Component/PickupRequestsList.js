import React, { useEffect, useState } from "react";
import { useAuth } from "../../User/context/AuthContext";
import axios from "axios";

const PickupRequestsList = () => {
  const { user, token, hasRole } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (hasRole("ROLE_DELIVERY_PARTNER")) {
      axios
        .get("/api/pickup-requests", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setRequests(res.data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  if (!hasRole("ROLE_DELIVERY_PARTNER")) {
    return <p>❌ Access Denied. Delivery Partner role required.</p>;
  }

  return (
    <div>
      <h2>Pickup Requests</h2>
      {requests.map((req) => (
        <div key={req.id}>
          <p>{req.address}</p>
          <p>Status: {req.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PickupRequestsList;
