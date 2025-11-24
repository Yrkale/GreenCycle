// src/Domain/Admin/AdminSidebar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../User/context/AuthContext";
import { FaUsers, FaRecycle, FaTruck, FaSignOutAlt } from "react-icons/fa";
import { IoAccessibility } from "react-icons/io5";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import "./AdminSidebarResponsive.css";  // ⭐ NEW RESPONSIVE CSS

const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* ⭐ MOBILE MENU BUTTON ⭐ */}
      <button
        className="admin-mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* ⭐ SIDEBAR ⭐ */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="admin-logo">GreenCycle Admin</h2>

        <div className="sidebar-section">
          <h4>Navigation</h4>

          <ul className="admin-menu">
            <li
              onClick={() => {
                navigate("/admindashboard");
                setSidebarOpen(false);
              }}
            >
              <FaUsers /> Dashboard Overview
            </li>

            <li
              onClick={() => {
                navigate("/admin/manage-items");
                setSidebarOpen(false);
              }}
            >
              <FaRecycle /> Manage Recyclable Items
            </li>

            <li
              onClick={() => {
                navigate("/admin/register-user");
                setSidebarOpen(false);
              }}
            >
              <IoAccessibility /> Register New User
            </li>

            <li
              onClick={() => {
                navigate("/admin/all-users");
                setSidebarOpen(false);
              }}
            >
              <IoMdArrowDropdownCircle /> Manage Users
            </li>
          </ul>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;
