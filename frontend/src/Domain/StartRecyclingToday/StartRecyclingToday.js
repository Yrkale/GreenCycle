import React, { useState } from "react";
import "../StartRecyclingToday/StartRecyclingToday.css"; 
import Product from "./Components/Product/Product"; 
import PickUpRequest from "./Components/PickUpRequest/PickUpRequest";
import NeedHelp from "./Components/NeedHelp/NeedHelp";

const Modal = ({ isOpen, onClose }) => {
  const [selectedProducts, setSelectedProducts] = useState([]); // ✅ shared state

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        
        {/* Pass selected products into pickup request */}
        <PickUpRequest selectedProducts={selectedProducts} onClose={onClose} />

        <NeedHelp/>
      </div>
    </div>
  );
};

export default Modal;
