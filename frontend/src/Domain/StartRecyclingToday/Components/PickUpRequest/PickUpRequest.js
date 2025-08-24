import React from "react";
import "./PickUpRequest.css";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const PickUpRequest = () => {
  return (
    <div className="pickup-container">
      <h3 className="pickup-header">
        <FaCalendarAlt className="icon" /> Schedule Your Pickup
      </h3>

      <form className="pickup-form">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" placeholder="Enter your full name" />
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input type="email" placeholder="Enter your email" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number *</label>
            <input type="text" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label>ZIP Code *</label>
            <input type="text" placeholder="Enter ZIP code" />
          </div>
        </div>

        <div className="form-group">
          <label>Street Address *</label>
          <input type="text" placeholder="Enter your street address" />
        </div>

        <div className="form-group">
          <label>City *</label>
          <input type="text" placeholder="Enter your city" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Preferred Date *</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Preferred Time *</label>
            <select>
              <option>Select time slot</option>
              <option>Morning (8 AM - 11 AM)</option>
              <option>Afternoon (12 PM - 3 PM)</option>
              <option>Evening (4 PM - 7 PM)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Special Instructions</label>
          <textarea placeholder="Any special instructions for pickup (e.g., gate code, building number, etc.)"></textarea>
        </div>

        <div className="guidelines-box">
          <h4>
            <FaMapMarkerAlt className="icon" /> Collection Guidelines
          </h4>
          <ul>
            <li>Please have items ready at the designated pickup location</li>
            <li>Separate different material types when possible</li>
            <li>Clean containers before placing them for collection</li>
            <li>Our team will contact you 30 minutes before arrival</li>
            <li>Collection is free for all selected items</li>
          </ul>
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
    </div>
  );
};

export default PickUpRequest;
