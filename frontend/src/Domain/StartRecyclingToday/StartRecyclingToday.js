// src/StartRecyclingToday/StartRecyclingToday.js
import React, { useState, useContext } from "react";
import "./StartRecyclingToday.css"; // Updated CSS below
import Product from "./Components/Product/Product";
import PickUpRequest from "./Components/PickUpRequest/PickUpRequest";

import LoginRegisterModal from "../User/components/LoginRegisterModal";
import { AuthContext } from "../User/context/AuthContext";

const Modal = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* ❌ Close Button */}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {/* If NOT logged in */}
        {!user && (
          <div className="login-warning-box">
            <p className="login-warning">
              ⚠️ Please{" "}
              <button
                className="login-link-btn"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>{" "}
              to schedule a pickup.
            </p>
          </div>
        )}

        {/* If LOGGED IN */}
        {user && (
          <div className="pickup-wrapper">
            <PickUpRequest
              selectedProducts={selectedProducts}
              onClose={onClose}
            />
          </div>
        )}

        {/* Login Modal */}
        <LoginRegisterModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </div>
    </div>
  );
};

export default Modal;
