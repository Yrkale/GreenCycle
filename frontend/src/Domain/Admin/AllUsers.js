import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../User/context/AuthContext";
import { FaUsers, FaRecycle, FaTruck, FaSignOutAlt, FaPlus } from "react-icons/fa";
import "./AdminDashboard.css"; // make sure your CSS file handles sidebar and main content
import axios from "axios";
import { useEffect } from "react";

import AdminSidebar from "./AdminSidebar";
import { IoIosMailOpen } from "react-icons/io";

const AllUsers = () => {
  const { user, logout } = useAuth();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [products, setProducts] = useState([]);

  // const handleAddProduct = (e) => {
  //   e.preventDefault();

  //   const newItem = { title, description, points };
  //   console.log("Added:", newItem);

  //   setTitle("");
  //   setDescription("");
  //   setPoints("");
  // };

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
      console.log('item id ',id)
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
      <AdminSidebar /> {/* Reuse the same sidebar */}

      <main className="admin-main">
        <h1>All Users</h1>
        

         
        {/* --------------- Existing Products --------------- */}
        <div className="panel">
          <h2>📋 User list</h2>

          <ul className="product-list">
            {/* {products.map((p) => (
              <li key={p.id}>
                <div>
                  <strong>{p.title}</strong> — {p.description}  
                  <span className="eco-points">🌱 {p.points} pts</span>
                </div>

                <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                  🗑️
                </button>
              </li>
            ))} */}
            </ul>
            </div>
      </main>
    </div>  
  );
};

   
export default AllUsers;
