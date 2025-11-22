// src/Domain/Admin/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../User/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaRecycle, FaTruck, FaSignOutAlt, FaPlus } from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [products, setProducts] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPartners: 0,
    totalPickups: 0,
    pending: 0,
    completed: 0,
    assigned: 0,
  });

  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [partnerData, setPartnerData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "DELIVERY_PARTNER",
  });

  // Fetch stats
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  useEffect(() => {
    if (token) fetchStats();
  }, [token]);

  // Fetch recyclable items
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/recyclable-items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch recyclable items:", err);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/api/recyclable-items",
        { title, description, points },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setDescription("");
      setPoints("");
      fetchProducts();
    } catch (err) {
      console.error("❌ Failed:", err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/recyclable-items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("❌ Failed to delete:", err);
    }
  };

  // Register partner
  const handleRegisterPartner = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username: partnerData.name,
        email: partnerData.email,
        password: partnerData.password,
        phone: partnerData.phone,
        role: partnerData.role,
      });

      alert("Registered successfully!");

      setPartnerData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "DELIVERY_PARTNER",
      });

      setShowPartnerForm(false);
      fetchStats();
    } catch (err) {
      alert("❌ Registration failed!");
    }
  };

  return (
    <div className="admin-layout">

      {/* ---------------------- SIDEBAR ---------------------- */}
      <aside className="admin-sidebar">

        <h2 className="admin-logo">GreenCycle Admin</h2>

        <div className="sidebar-section">
          <h4>Navigation</h4>
          <ul>
            <li><FaUsers /> Dashboard Overview</li>
            <li><FaRecycle /> Manage Recyclable Items</li>
            <li><FaTruck /> Delivery Partners</li>
          </ul>
        </div>

        {/* Logout */}
        <button className="logout-btn" onClick={() => { logout(); navigate("/"); }}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* ---------------------- MAIN CONTENT ---------------------- */}
      <main className="admin-main">

        <h1>Welcome, {user?.username} 👋</h1>
        <p>Here’s the complete overview of Greencycle operations.</p>

        {/* ----------- Dashboard Stats ----------- */}
        <div className="stats-grid">

          <div className="stat-card green">
            <FaUsers className="stat-icon" />
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="stat-card blue">
            <FaTruck className="stat-icon" />
            <h3>Delivery Partners</h3>
            <p>{stats.totalPartners}</p>
          </div>

          <div className="stat-card purple">
            <FaRecycle className="stat-icon" />
            <h3>Total Pickups</h3>
            <p>{stats.totalPickups}</p>
          </div>

          <div className="stat-card orange">
            <h3>Pending</h3>
            <p>{stats.pending}</p>
          </div>

          <div className="stat-card yellow">
            <h3>Assigned</h3>
            <p>{stats.assigned}</p>
          </div>

          <div className="stat-card teal">
            <h3>Completed</h3>
            <p>{stats.completed}</p>
          </div>

        </div>

        {/* --------------- Register Account Panel --------------- */}
        <div className="panel">
          <h2>👤 Register New Account</h2>

          <button
            className="toggle-btn"
            onClick={() => setShowPartnerForm(!showPartnerForm)}
          >
            {showPartnerForm ? "Close Form" : "Register New Account"}
          </button>

          {showPartnerForm && (
            <form className="partner-form" onSubmit={handleRegisterPartner}>
              <input type="text" placeholder="Full Name"
                value={partnerData.name}
                onChange={(e) => setPartnerData({ ...partnerData, name: e.target.value })}
                required
              />

              <input type="email" placeholder="Email"
                value={partnerData.email}
                onChange={(e) => setPartnerData({ ...partnerData, email: e.target.value })}
                required
              />

              <input type="password" placeholder="Password"
                value={partnerData.password}
                onChange={(e) => setPartnerData({ ...partnerData, password: e.target.value })}
                required
              />

              <input type="text" placeholder="Phone Number"
                value={partnerData.phone}
                onChange={(e) => setPartnerData({ ...partnerData, phone: e.target.value })}
              />

              <select value={partnerData.role}
                onChange={(e) => setPartnerData({ ...partnerData, role: e.target.value })}
              >
                <option value="DELIVERY_PARTNER">Delivery Partner</option>
                <option value="USER">User</option>
                <option value="SUPER_ADMIN">Admin</option>
              </select>

              <button type="submit">Register</button>
            </form>
          )}
        </div>

        {/* --------------- Add Recyclable Item --------------- */}
        <div className="panel">
          <h2>♻ Add New Recyclable Item</h2>

          <form className="product-form" onSubmit={handleAddProduct}>
            <input type="text" placeholder="Item Title"
              value={title} onChange={(e) => setTitle(e.target.value)} required
            />

            <input type="text" placeholder="Description"
              value={description} onChange={(e) => setDescription(e.target.value)} required
            />

            <input type="number" placeholder="Eco Points"
              value={points} onChange={(e) => setPoints(e.target.value)} required
            />

            <button type="submit"><FaPlus /> Add Item</button>
          </form>
        </div>

        {/* --------------- Existing Products --------------- */}
        <div className="panel">
          <h2>📋 Recyclable Items</h2>

          <ul className="product-list">
            {products.map((p) => (
              <li key={p.id}>
                <div>
                  <strong>{p.title}</strong> — {p.description}  
                  <span className="eco-points">🌱 {p.points} pts</span>
                </div>

                <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
