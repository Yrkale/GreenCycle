import React, { useState, useContext } from "react";
import "../StartRecyclingToday/StartRecyclingToday.css";
import Product from "./Components/Product/Product";
import PickUpRequest from "./Components/PickUpRequest/PickUpRequest";

import LoginRegisterModal from "../User/components/LoginRegisterModal"; 
import { AuthContext } from "../User/context/AuthContext";

const Modal = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false); // 🟢 LOGIN POPUP CONTROL

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >

        {/* 🟡 CASE 1: User NOT logged in */}
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

        {/* 🟢 CASE 2: User Logged In */}
        {user && (
          <>
            <div className="pickup-wrapper">
              <PickUpRequest
                selectedProducts={selectedProducts}
                onClose={onClose}
              />
            </div>

            
          </>
        )}

        {/* 🟢 LOGIN POPUP */}
        <LoginRegisterModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </div>
    </div>
  );
};

export default Modal;
