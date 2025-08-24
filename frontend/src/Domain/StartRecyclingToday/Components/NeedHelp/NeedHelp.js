import React from "react";
import "../NeedHelp/NeedHelp.css";
import { FaPhoneAlt, FaClock, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const NeedHelp = () => {
  return (
    <div className="needhelp-container">
      <h3 className="needhelp-title">Need Help?</h3>
      <div className="needhelp-grid">
        <div className="needhelp-item">
          <FaPhoneAlt className="needhelp-icon" />
          <span>Call us: (555) 123-4567</span>
        </div>
        <div className="needhelp-item">
          <FaEnvelope className="needhelp-icon" />
          <span>Email: support@greencycle.com</span>
        </div>
        <div className="needhelp-item">
          <FaClock className="needhelp-icon" />
          <span>Service Hours: Mon-Sat 8AM-6PM</span>
        </div>
        <div className="needhelp-item">
          <FaMapMarkerAlt className="needhelp-icon" />
          <span>Service Area: Metro City & Suburbs</span>
        </div>
      </div>
    </div>
  );
};

export default NeedHelp;
