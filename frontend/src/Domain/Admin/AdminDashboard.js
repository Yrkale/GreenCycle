import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../User/context/AuthContext";
import "./AdminDashboard.css";

 
const AdminDashboard = () => {
  const { token, user, hasRole } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [products, setProducts] = useState([]);


  // all state
   const [stats, setStats] = useState({
    totalUsers: 0,
    totalPartners: 0,
    totalPickups: 0,
    pending: 0,
    completed: 0,
    assigned: 0,
  });

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
    
      fetchStats();
    
  }, [token]);




  //

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
    fetchProducts();
  }, [token]);

  return (
     
    <div className="admin-dashboard">
      <h1>Welcome, {user?.username || "Admin"} 👋</h1>
      <p>Manage all recyclable items available for pickup in GreenCycle.</p>   

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

    
      {/* Add Product Panel */}
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

      {/* Product List Panel */}
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
       {/* Data Tables */}
      <div className="tables">
        <section>
          <h2>All Pickup Requests</h2>
          {/* You’ll integrate table from backend */}
        </section>

        <section>
          <h2>All Users</h2>
          {/* Another table here */}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
