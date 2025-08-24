import React from "react";
import "../StartRecyclingToday/StartRecyclingToday.css"; 
import Product from "./Components/Product/Product"; // ✅ Make sure filename is Product.js
import PickUpRequest from "./Components/PickUpRequest/PickUpRequest";
import NeedHelp from "./Components/NeedHelp/NeedHelp";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Close button */}
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>       

        {/* Product grid (your collection request cards) */}
        <Product />

        <PickUpRequest/>

        <NeedHelp/>


        





      </div>
    </div>
  );
};

export default Modal;
