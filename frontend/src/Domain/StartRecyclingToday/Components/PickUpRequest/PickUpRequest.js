import React, { useState } from "react";
import "./PickUpRequest.css";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { createPickupRequest } from "./PickupRequestService";

const PickUpRequest = () => {
  const [formData, setFormData] = useState({
    pickupDate: "",
    pickupTime: "",
    address: "",
    city: "",
    postalCode: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Combine date + time into one LocalDateTime string
      const pickupDateTime = `${formData.pickupDate}T${formData.pickupTime}:00`;

      const payload = {
        userId: 1, // TODO: get actual logged-in user ID from JWT/localStorage
        pickupDate: pickupDateTime,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        description: formData.description,
      };

      await createPickupRequest(payload);
      setMessage("✅ Pickup request scheduled successfully!");
      setFormData({
        pickupDate: "",
        pickupTime: "",
        address: "",
        city: "",
        postalCode: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to schedule pickup. Please try again.");
    }
  };

  return (
    <div className="pickup-container">
      <h3 className="pickup-header">
        <FaCalendarAlt className="icon" /> Schedule Your Pickup
      </h3>

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
