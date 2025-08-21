import React from "react";
import "./Footer.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLeaf } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-content">
        {/* Logo + Description */}
        <div className="footer-col">
          <div className="footer-logo">
            <FaLeaf className="logo-icon" />
            <h2>GreenCycle</h2>
          </div>
          <p>
            Transforming household waste into environmental impact through
            recycling and tree planting initiatives.
          </p>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            <li>Waste Collection</li>
            <li>Seed Program</li>
            <li>Impact Tracking</li>
            <li>Community Network</li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>How It Works</li>
            <li>Partners</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3>Contact</h3>
          <ul>
            <li><FaEnvelope className="icon" /> hello@greencycle.com</li>
            <li><FaPhone className="icon" /> +1 (555) 123-4567</li>
            <li><FaMapMarkerAlt className="icon" /> 123 Green St, Eco City</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © 2025 GreenCycle. All rights reserved. Making the world greener, one
          household at a time.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
