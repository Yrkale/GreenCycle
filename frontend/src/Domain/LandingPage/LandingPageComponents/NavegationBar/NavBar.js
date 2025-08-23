import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import logo from "../../LandingPageAssets/logo.png";


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
        <a href="#How-It-Works">How It Works</a>
        <Link to="/shop">Shop</Link>
        <a href="#impact">Impact</a>
        <a href="#TopContributor">Contributors</a>
        <a href="#LiveContribution">Live Feed</a>
        <a href="#Join">Contact</a>
      </nav>

      {/* Right buttons (desktop only) */}
      <div className="navbar-right">
  <Link to="/login">
    <button className="btn ghost">Sign In</button>
  </Link>
  <Link to="/register">
    <button className="btn primary">Get Started</button>
  </Link>
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
