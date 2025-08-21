import React, { useState } from "react";
import "./NavBar.css";
import logo from "../../LandingPageAssets/logo.jpg";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Left side (logo + brand) */}
      <div className="navbar-left">
        <img src={logo} alt="GreenCycle Logo" className="logo" />
        <h1 className="brand">GreenCycle</h1>
      </div>

      {/* Center links (desktop) */}
      <nav className={`navbar-center ${menuOpen ? "active" : ""}`}>
        <a href="#how">How It Works</a>
        <a href="#shop">Shop</a>
        <a href="#impact">Impact</a>
        <a href="#contributors">Contributors</a>
        <a href="#live">Live Feed</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Right buttons (desktop only) */}
      <div className="navbar-right">
        <button className="btn ghost">Sign In</button>
        <button className="btn primary">Get Started</button>
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
    </header>
  );
}

export default NavBar;
