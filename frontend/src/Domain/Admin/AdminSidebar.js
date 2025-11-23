
// src/Domain/Admin/AdminSidebar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../User/context/AuthContext";
import { FaUsers, FaRecycle, FaTruck, FaSignOutAlt } from "react-icons/fa";
import { IoAccessibility } from "react-icons/io5";
import "./AdminDashboard.css"; // reuse the same CSS
import { IoMdArrowDropdownCircle } from "react-icons/io";

const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);

  const toggleUsersDropdown = () => {
    setShowUsersDropdown(!showUsersDropdown);
  };

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">GreenCycle Admin</h2>

      <div className="sidebar-section">
        <h4>Navigation</h4>
        <ul className="admin-menu">
          <li onClick={() => navigate("/admindashboard")}>
            <FaUsers /> Dashboard Overview
          </li>

          <li onClick={() => navigate("/admin/manage-items")}>
            <FaRecycle /> Manage Recyclable Items
          </li>

          <li onClick={() => navigate("/admin/register-user")}>
            <IoAccessibility /> Register New User
          </li>

          {/* Manage Users with Dropdown */}
          <li className="dropdown">
            <div onClick={toggleUsersDropdown} style={{ cursor: "pointer" }}>
              <IoMdArrowDropdownCircle /> Manage Users
            </div>
            {showUsersDropdown && (
              <ul className="submenu">
                <li onClick={() => navigate("/admin/all-delivery-partners")}>
                  All Delivery Partners
                </li>
                <li onClick={() => navigate("/admin/all-users")}>
                  All Users
                </li>
              </ul>
            )}
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
  );
};

export default AdminSidebar;

