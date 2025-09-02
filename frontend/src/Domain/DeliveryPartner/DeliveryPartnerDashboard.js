import React, { useState } from "react";
import PickupRequestsList from "../DeliveryPartner/Component/PickupRequestsList";
import MyAssignedRequests from "../DeliveryPartner/Component/MyAssignedRequests";
import { useAuth } from "../User/context/AuthContext";

const DeliveryPartnerDashboard = () => {
  const { hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState("available");

  // ✅ Role guard
  if (!hasRole("ROLE_DELIVERY_PARTNER")) {
    return <p>❌ Access Denied. Delivery Partner role required.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚚 Delivery Partner Dashboard</h1>

      {/* Tab buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "available"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("available")}
        >
          Available Requests
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "assigned"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("assigned")}
        >
          My Assigned Requests
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "available" && <PickupRequestsList />}
      {activeTab === "assigned" && <MyAssignedRequests />}
    </div>
  );
};

export default DeliveryPartnerDashboard;
