import React, { useState, useContext } from "react";
import "./PickUpRequest.css";
import { FaCalendarAlt } from "react-icons/fa";
import { createPickupRequest } from "./PickupRequestService";
import Product from "../Product/Product.js";
import { AuthContext } from "../../../User/context/AuthContext.js"; // import context

const PickUpRequest = ({ onClose }) =>  {
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

  const today = new Date().toISOString().split("T")[0]; // restrict date

  // Dropdown data
  const cities = ["Mumbai", "Pune", "Bangalore", "Delhi", "Hyderabad"];
  const zipCodes = ["400001", "411001", "560001", "110001", "500001"];
  const timeSlots = [
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🧠 Helper: Convert time slot ("12:00 PM - 02:00 PM") → "12:00"
  const convertTo24Hour = (timeRange) => {
    const [startTime] = timeRange.split(" - "); // use only start time
    const [time, modifier] = startTime.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "PM" && hours !== "12") hours = String(+hours + 12);
    if (modifier === "AM" && hours === "12") hours = "00";
    return `${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProducts.length === 0) {
      setMessage("❌ Please select at least one recyclable product.");
      return;
    }

    try {
      // ✅ Convert pickup time properly to ISO format
      const time24 = convertTo24Hour(formData.pickupTime);
      const pickupDateTime = `${formData.pickupDate}T${time24}:00`;

      const payload = {
        userId: user?.id,
        pickupDate: pickupDateTime,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        description: formData.description,
        itemIds: selectedProducts.map((p) => p.id),
      };

      console.log("Submitting pickup request with payload:", payload);

      await createPickupRequest(payload);
      setMessage("✅ Pickup request scheduled successfully!");

      // Reset everything
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
      console.error("Pickup request failed:", err);
      setMessage("❌ Failed to schedule pickup. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="pickup-container">
        <h3 className="pickup-header">
          <FaCalendarAlt className="icon" /> Schedule Your Pickup
        </h3>
        <p className="status-message">
          ⚠️ Please <b>login</b> to schedule a pickup.
        </p>
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
          {/* City Dropdown */}
          <div className="form-group">
            <label>City *</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              {cities.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* ZIP Code Dropdown */}
          <div className="form-group">
            <label>ZIP Code *</label>
            <select
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            >
              <option value="">Select ZIP Code</option>
              {zipCodes.map((zip, i) => (
                <option key={i} value={zip}>
                  {zip}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          {/* Date Picker - No Past Dates */}
          <div className="form-group">
            <label>Preferred Date *</label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              min={today}
              required
            />
          </div>

          {/* Preferred Time Dropdown */}
          <div className="form-group">
            <label>Preferred Time *</label>
            <select
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              required
            >
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot, i) => (
                <option key={i} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Special Instructions</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Any specific directions or notes..."
          ></textarea>
        </div>

       <div className="form-actions">
  <button type="submit" className="submit-btn">
    Schedule Pickup
  </button>
  <button
    type="button"
    className="cancel-btn"
    onClick={() => {
      setFormData({
        pickupDate: "",
        pickupTime: "",
        address: "",
        city: "",
        postalCode: "",
        description: "",
      });
      setSelectedProducts([]);
      setMessage("");

      // this line closes the modal
      if (onClose) onClose();
    }}
  >
    Cancel
  </button>
</div>

      </form>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default PickUpRequest;
