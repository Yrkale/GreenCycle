import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../User/context/AuthContext";

const MyAssignedRequests = () => {
  const [requests, setRequests] = useState([]);
  const { user, token, hasRole } = useAuth(); // ✅ pull hasRole and token from context

  useEffect(() => {
    if (hasRole("ROLE_DELIVERY_PARTNER")) {
      fetchAssigned();
    }
  }, [user]);

  const fetchAssigned = async () => {
    try {
      const res = await axios.get("/api/pickup-requests", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ send token
      });
      // filter assigned to current partner
      setRequests(res.data.filter((r) => r.assignedTo === user?.id));
    } catch (err) {
      console.error("Error fetching assigned requests", err);
    }
  };

  const completeRequest = async (id) => {
    try {
      await axios.put(
        `/api/pickup-requests/${id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } } // ✅ secure request
      );
      alert("Request marked as completed!");
      fetchAssigned();
    } catch (err) {
      alert("Failed to complete request.");
    }
  };

  // ✅ Role guard
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
            <p>
              <strong>Address:</strong> {req.address}, {req.city}
            </p>
            <p>
              <strong>Date:</strong> {req.pickupDate}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>
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
