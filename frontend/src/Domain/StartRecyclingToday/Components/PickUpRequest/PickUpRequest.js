import React, { useState, useContext } from "react";
import "./PickUpRequest.css";
import { FaCalendarAlt } from "react-icons/fa";
import { createPickupRequest } from "./PickupRequestService";
import Product from "../Product/Product.js";
import { AuthContext } from "../../../User/context/AuthContext.js"; // import context

const PickUpRequest = () => {
  const { user } = useContext(AuthContext); // check if user is logged in

  const [formData, setFormData] = useState({
    pickupDate: "",
    pickupTime: "",
    address: "",
    city: "",
    postalCode: "",
    description: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProducts.length === 0) {
      setMessage("❌ Please select at least one recyclable product.");
      return;
    }

    console.log("Selected products:", selectedProducts);


    try {
      const pickupDateTime = `${formData.pickupDate}T${formData.pickupTime}:00`;

      const payload = {
  userId: user?.id, // ✅ logged-in user ID
  pickupDate: pickupDateTime,
  address: formData.address,
  city: formData.city,
  postalCode: formData.postalCode,
  description: formData.description,
  itemIds: selectedProducts.map((p) => p.id), // ✅ send item IDs, not names
};

console.log("Submitting pickup request with payload:", payload);

      await createPickupRequest(payload);  
      setMessage("✅ Pickup request scheduled successfully!");
      // this method reset everything
      setFormData({
        pickupDate: "",
        pickupTime: "",
        address: "",
        city: "",
        postalCode: "",
        description: "",
      });
      setSelectedProducts([]);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to schedule pickup. Please try again.");
    }
  };

  // ✅ If user is NOT logged in, show login prompt instead of form
  if (!user) {
    return (
      <div className="pickup-container">
        <h3 className="pickup-header">
          <FaCalendarAlt className="icon" /> Schedule Your Pickup
        </h3>
        <p className="status-message">⚠️ Please <b>login</b> to schedule a pickup.</p>
      </div>
    );
  }

  return (
    <div className="pickup-container">
      <h3 className="pickup-header">
        <FaCalendarAlt className="icon" /> Schedule Your Pickup
      </h3>

      {/* Product selection */}
      <Product onSelectionChange={setSelectedProducts} />

      <form className="pickup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Street Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>ZIP Code *</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Preferred Date *</label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Preferred Time *</label>
            <input
              type="time"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Special Instructions</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

       

        <div className="form-actions">
          
          <button type="submit" className="submit-btn">
            Schedule Pickup
          </button>
          <button type="button" className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default PickUpRequest;
