
// src/Domain/Admin/RegisterNewUser.js
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../User/context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import {
  FaUsers,
  FaRecycle,
  FaTruck,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";
import "./AdminDashboard.css";

const RegisterNewUser = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const [showPartnerForm, setShowPartnerForm] = useState(true);

  const [partnerData, setPartnerData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "DELIVERY_PARTNER",
  });

  const handleRegisterPartner = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username: partnerData.name,
          email: partnerData.email,
          password: partnerData.password,
          phone: partnerData.phone,
          role: partnerData.role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Registered successfully!");
      setPartnerData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "DELIVERY_PARTNER",
      });
    } catch (err) {
      alert("❌ Registration failed!");
    }
  };

  return (
    <div className="admin-layout">
        <AdminSidebar /> {/* Reuse the same sidebar */}
      <main className="admin-main">
        <h1>Welcome, {user?.username} 👋</h1>
        <p>Register new delivery partners, users, or admins below.</p>

        {/* WRAPPER PANEL */}
        <div className="panel">

          {/* Flex Header */}
          <div className="panel-header">
            <h2>👤 Register New Account</h2>

            <button
              className="toggle-btn"
              onClick={() => setShowPartnerForm(!showPartnerForm)}
            >
              {showPartnerForm ? "Close Form" : "Register New Account"}
            </button>
          </div>

          {showPartnerForm && (
            <form className="partner-form" onSubmit={handleRegisterPartner}>
              <input
                type="text"
                placeholder="Full Name"
                value={partnerData.name}
                onChange={(e) =>
                  setPartnerData({ ...partnerData, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={partnerData.email}
                onChange={(e) =>
                  setPartnerData({ ...partnerData, email: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={partnerData.password}
                onChange={(e) =>
                  setPartnerData({
                    ...partnerData,
                    password: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={partnerData.phone}
                onChange={(e) =>
                  setPartnerData({ ...partnerData, phone: e.target.value })
                }
              />

              <select
                value={partnerData.role}
                onChange={(e) =>
                  setPartnerData({ ...partnerData, role: e.target.value })
                }
              >
                <option value="DELIVERY_PARTNER">Delivery Partner</option>
                <option value="USER">User</option>
                <option value="SUPER_ADMIN">Admin</option>
              </select>

              <button type="submit">
                <FaPlus /> Register
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default RegisterNewUser;

