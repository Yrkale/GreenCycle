import React, { useState } from "react";
import "./NavBar.css";
import LoginRegisterModal from "../../../User/components/LoginRegisterModal";
import logo from "../../LandingPageAssets/logo.png";
import { useAuth } from "../../../User/context/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {
  const { user, hasRole, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      {/* LEFT */}
      <div className="navbar-left">
        <img src={logo} alt="GreenCycle Logo" className="logo" />
        <h1 className="brand">GreenCycle</h1>
      </div>

      {/* CENTER LINKS */}
      <nav className={`navbar-center ${menuOpen ? "active" : ""}`}>
        <a href="#How-It-Works" onClick={handleMenuClick}>How It Works</a>
        <a href="/shop" onClick={handleMenuClick}>Shop</a>
        <a href="#impact" onClick={handleMenuClick}>Impact</a>
        <a href="#TopContributor" onClick={handleMenuClick}>Contributors</a>
        <a href="#LiveContributor" onClick={handleMenuClick}>Live Feed</a>
        <a href="#Join" onClick={handleMenuClick}>Contact</a>
        <a href="/AboutUs" onClick={handleMenuClick}>About Us</a>

        {/* USER LINKS */}
        {hasRole("USER") && (
          <>
            <Link to="/MyPickUp" onClick={handleMenuClick}>Schedule Pickup</Link>
            <Link to="/profile" onClick={handleMenuClick}>Profile</Link>
          </>
        )}

        {hasRole("DELIVERY_PARTNER") && (
          <a href="/DeliveryPartnerDashboard" onClick={handleMenuClick}>
            Dashboard
          </a>
        )}

        {hasRole("SUPER_ADMIN") && (
          <a href="/AdminDashboard" onClick={handleMenuClick}>
            Admin Dashboard
          </a>
        )}

        {/* MOBILE LOGOUT ONLY */}
        {user && (
          <button
            className="btn ghost logout-mobile"
            onClick={() => {
              logout();
              handleMenuClick();
            }}
          >
            Logout
          </button>
        )}
      </nav>

      {/* RIGHT SIDE – Username always visible */}
      <div className="navbar-right">
        {user ? (
          <>
            <span className="welcome">
              👋 Hi, {user.username || user.email?.split("@")[0]}
            </span>

            {/* DESKTOP LOGOUT ONLY */}
            <button className="btn ghost logout-desktop" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn ghost" onClick={() => setIsModalOpen(true)}>
            Sign In / Register
          </button>
        )}
      </div>

      {/* HAMBURGER */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* LOGIN MODAL */}
      <LoginRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
}

export default NavBar;
