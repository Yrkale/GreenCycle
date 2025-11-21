import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../User/context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [products, setProducts] = useState([]);

  // Dashboard stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPartners: 0,
    totalPickups: 0,
    pending: 0,
    completed: 0,
    assigned: 0,
  });

  // Partner registration states
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [partnerData, setPartnerData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "DELIVERY_PARTNER", // default
  });

  // ✅ Fetch dashboard stats
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

  // ✅ Fetch all recyclable items
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

  // ✅ Add new recyclable item
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
      console.error("❌ Failed to add recyclable item:", err);
    }
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/recyclable-items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("❌ Failed to delete recyclable item:", err);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  // ✅ Register user (Delivery Partner / User / Admin)
  const handleRegisterPartner = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: partnerData.name,
        email: partnerData.email,
        password: partnerData.password,
        phone: partnerData.phone,
        role: partnerData.role, // dynamic role selection
      };

      await axios.post("http://localhost:8080/api/auth/register", payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert(`✅ ${partnerData.role} registered successfully!`);
      setPartnerData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "DELIVERY_PARTNER",
      });
      setShowPartnerForm(false);
      fetchStats(); // refresh stats after registration
    } catch (err) {
      console.error("❌ Failed to register:", err);
      alert("❌ Registration failed. Try again.");
    }
  };

  const handleLogout = () => {
    logout(); // This function from your AuthContext should clear the user's session
    navigate("/"); // Redirect to the homepage after logout
  };

  return (
    <div className="admin-dashboard">
      <button className="admin-back-btn" onClick={handleLogout}>
        Logout
      </button>
      <h1>Welcome, {user?.username || "Admin"} 👋</h1>
      <p>Manage recyclable items and register users in GreenCycle.</p>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="card">
          <h3>Delivery Partners</h3>
          <p>{stats.totalPartners}</p>
        </div>

        <div className="card">
          <h3>Total Pickups</h3>
          <p>{stats.totalPickups}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>

        <div className="card">
          <h3>Assigned</h3>
          <p>{stats.assigned}</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
      </div>

      {/* 🧍 Register User / Partner / Admin */}
      <div className="panel">
        <h2> 👤 Add New User</h2>
        <button
          className="register-partner-btn"
          onClick={() => setShowPartnerForm(!showPartnerForm)}
        >
          {showPartnerForm ? "Cancel" : "Register New Account"}
        </button>

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
                setPartnerData({ ...partnerData, password: e.target.value })
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

            {/* Role Dropdown */}
            <select
              value={partnerData.role}
              onChange={(e) =>
                setPartnerData({ ...partnerData, role: e.target.value })
              }
              required
            >
              <option value="DELIVERY_PARTNER">Delivery Partner</option>
              <option value="USER">User</option>
              <option value="SUPER_ADMIN">Admin</option>
            </select>

            <button type="submit">Register</button>
          </form>
        )}
      </div>

      {/* ♻️ Add New Recyclable Item */}
      <div className="panel">
        <h2>♻️ Add New Recyclable Item</h2>
        <form className="product-form" onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Item Title (e.g., Plastic Bottles)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Eco Points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            required
          />
          <button type="submit">Add Item</button>
        </form>
      </div>

      {/* 📋 Existing Items */}
      <div className="panel">
        <h2>📋 Existing Recyclable Items</h2>
        {products.length === 0 ? (
          <p>No recyclable items added yet.</p>
        ) : (
          <ul className="product-list">
            {products.map((p) => (
              <li key={p.id}>
                <div>
                  <strong>{p.title}</strong> — {p.description} <br />
                  <span className="eco-points">🌱 {p.points} points</span>
                </div>
                <button onClick={() => handleDelete(p.id)}>🗑️</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Future Tables */}
      <div className="tables">
        <section>
          <h2>All Pickup Requests</h2>
        </section>

        <section>
          <h2>All Users</h2>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
