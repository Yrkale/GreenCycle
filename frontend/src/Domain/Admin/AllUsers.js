import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../User/context/AuthContext";
import AdminSidebar from "./AdminSidebar";
import "./AdminDashboard.css";

const AllUsers = () => {
  const { token } = useAuth();

  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [partners, setPartners] = useState([]);

  // Fetch all Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // Fetch all Delivery Partners
  const fetchPartners = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/user/delivery-partners",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPartners(res.data);
    } catch (err) {
      console.error("Failed to fetch partners:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    else fetchPartners();
  }, [activeTab]);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1>Admin Dashboard</h1>

        {/* TAB BUTTONS */}
        <div className="tab-buttons">
          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>

          <button
            className={activeTab === "partners" ? "active" : ""}
            onClick={() => setActiveTab("partners")}
          >
            Delivery Partners
          </button>
        </div>

        {/* TABLE VIEW */}
        <div className="panel">
          <h2>
            {activeTab === "users" ? "All Users" : "All Delivery Partners"}
          </h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th> {/* Correct field */}
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {(activeTab === "users" ? users : partners).map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td> {/* Fixed */}
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AllUsers;
