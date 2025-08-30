import React, { useState, useContext } from "react";
import "./NavBar.css";
import { AuthContext } from "../../../User/context/AuthContext";//"Domain/User/context/AuthContext";
import LoginRegisterModal from "../../../User/components/LoginRegisterModal"; //"Domain/User/components/LoginRegisterModal";
import logo from "../../LandingPageAssets/logo.png";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

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
      </nav>

      {/* Right side */}
      <div className="navbar-right">
        {user ? (
          <>
            <span className="welcome">👋 Hi, {user.username}</span>
            <button className="btn ghost" onClick={logout}>Logout</button>
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
        <span></span><span></span><span></span>
      </div>

      {/* Login/Register Modal */}
      <LoginRegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}

export default NavBar;
