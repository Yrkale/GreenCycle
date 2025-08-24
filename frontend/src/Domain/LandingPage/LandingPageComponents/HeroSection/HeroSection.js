import React, { useState } from "react";
import "./HeroSection.css";
import plantHands from "../../LandingPageAssets/plant-hands.jpg"; 
import Modal from "../../../StartRecyclingToday/StartRecyclingToday.js";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { number: "1,250+", label: "Households Joined" },
    { number: "5,000+", label: "Seeds Collected" },
    { number: "500+", label: "Trees Planted" },
  ];

  return (
    <section className="hero">
      <div className="hero-text">
        <h2>
          Transform Your Household Waste Into{" "}
          <span className="highlight">Environmental Impact</span>
        </h2>
        <p>
          Join our community in recycling household waste and collecting seeds
          to grow trees. Earn eco-points for every contribution and redeem them
          for sustainable products!
        </p>

        <div className="hero-buttons">
          <button 
            className="btn primary" 
            onClick={() => setIsModalOpen(true)}
          >
            Start Recycling Today
          </button>
          <button className="btn secondary">Learn More</button>
        </div>

        <div className="stats">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="stat-number">{stat.number}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-image">
        <img src={plantHands} alt="Hands holding plant" />
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>GreenCycle Collection Request</h2>
        <p>Fill out the form to request a waste collection and earn eco-points!</p>
        {/* You can add form fields here later */}
      </Modal>
    </section>
  );
};

export default HeroSection;
