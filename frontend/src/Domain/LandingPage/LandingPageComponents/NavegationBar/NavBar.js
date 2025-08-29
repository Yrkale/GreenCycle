import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import logo from "../../LandingPageAssets/logo.png";
import LoginRegisterModal from "../../../User/LoginRegisterModal";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Left side (logo + brand) */}
      <div className="navbar-left">
        <img src={logo} alt="GreenCycle Logo" className="logo" />
        <h1 className="brand">GreenCycle</h1>
      </div>

      {/* Center links (desktop) */}
      <nav className={`navbar-center ${menuOpen ? "active" : ""}`}>
        <a href="#How-It-Works">How It Works</a>
        <Link to="/shop">Shop</Link>
        <a href="#impact">Impact</a>
        <a href="#TopContributor">Contributors</a>
        <a href="#LiveContribution">Live Feed</a>
        <a href="#Join">Contact</a>
      </nav>

      {/* Right buttons */}
      <div className="navbar-right">
        <button className="btn ghost" onClick={() => setIsModalOpen(true)}>
          Sign In
        </button>
        <button className="btn primary" onClick={() => setIsModalOpen(true)}>
          Get Started
        </button>
      </div>

      {/* Hamburger (mobile only) */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Modal */}
      <LoginRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
}

export default NavBar;
