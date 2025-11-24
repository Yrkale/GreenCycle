// src/Domain/Admin/ManageRecItem.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../User/context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { FaPlus } from "react-icons/fa";
import "./ManageRecItemResponsive.css";   // ⭐ NEW RESPONSIVE CSS FILE

const ManageRecItem = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [products, setProducts] = useState([]);

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

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main recitem-container">

        <h1>Manage Recyclable Items</h1>
        <p>Add new items and set eco-points for recycling.</p>

        {/* Add Item Panel */}
        <div className="panel">
          <h2>♻ Add New Recyclable Item</h2>

          <form className="product-form" onSubmit={handleAddProduct}>
            <input
              type="text"
              placeholder="Item Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Description"
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

            <button type="submit" className="add-btn">
              <FaPlus /> Add Item
            </button>
          </form>
        </div>

        {/* List Panel */}
        <div className="panel">
          <h2>📋 Recyclable Items</h2>

          <ul className="product-list">
            {products.map((p) => (
              <li key={p.id}>
                <div className="product-info">
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

export default ManageRecItem;
