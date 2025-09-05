import React, { useState } from "react";
import "./NavBar.css";
import LoginRegisterModal from "../../../User/components/LoginRegisterModal";
import logo from "../../LandingPageAssets/logo.png";
import { useAuth } from "../../../User/context/AuthContext"; 

function NavBar() {
  const { user, hasRole, logout } = useAuth();

  console.log("👤 User in Navbar:", user);
  console.log("🎭 Roles:", user?.roles);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Left side */}
      <div className="navbar-left">
        <img src={logo} alt="GreenCycle Logo" className="logo" />
        <h1 className="brand">GreenCycle</h1>
      </div>

      {/* Center links */}
      <nav className={`navbar-center ${menuOpen ? "active" : ""}`}>
        <a href="#How-It-Works">How It Works</a>
        <a href="/shop">Shop</a>
        <a href="#impact">Impact</a>
        <a href="#TopContributor">Contributors</a>
        <a href="#LiveContribution">Live Feed</a>
        <a href="#Join">Contact</a>
        <a href="/AboutUs">About Us</a>

        {/* 👤 Normal User */}
        {hasRole("ROLE_USER") && <a href="/MyPickUp">Schedule Pickup</a>}

        {/* 🚚 Delivery Partner */}
        {hasRole("ROLE_DELIVERY_PARTNER") && (
          <>
            <a href="/DeliveryPartnerDashboard">Dashboard</a>
            
          </>
        )}

        {/* 🛠 Admin */}
        {hasRole("ROLE_SUPER_ADMIN") && <a href="/AdminDashboard">Admin Dashboard</a>}
      </nav>

      {/* Right side */}
      <div className="navbar-right">
        {user ? (
          <>
            <span className="welcome">
              👋 Hi, {user.username || user.email?.split("@")[0]}
            </span>
            <button className="btn ghost" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn ghost" onClick={() => setIsModalOpen(true)}>
            Sign In / Register
          </button>
        )}
      </div>

      {/* Hamburger menu */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Login/Register Modal */}
      <LoginRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
}

export default NavBar;
