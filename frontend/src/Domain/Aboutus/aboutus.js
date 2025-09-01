// src/components/LandingPage/AboutUs/AboutUs.js
import React from "react";
import "./Aboutus.css";
import teamImg from "./team.jpg"; // add an image for your team/mission

const Aboutus = () => {
  return (
    <section className="about">
      <div className="about-text">
        <h2>
          About <span className="highlight">GreenCycle</span>
        </h2>
        <p>
          GreenCycle is more than just a recycling platform — it’s a community
          movement towards a sustainable future. Our mission is to empower
          households to convert waste into eco-points, plant trees, and
          contribute directly to a greener planet.
        </p>
        <p>
          By joining us, you’re not just recycling — you’re making a measurable
          environmental impact, reducing carbon footprints, and inspiring
          positive change in society.
        </p>

        <div className="about-values">
          <div className="value-card">
            <h3>🌱 Sustainability</h3>
            <p>Promoting eco-friendly habits and greener lifestyles.</p>
          </div>
          <div className="value-card">
            <h3>🤝 Community</h3>
            <p>Bringing people together for collective impact.</p>
          </div>
          <div className="value-card">
            <h3>🌍 Impact</h3>
            <p>Every contribution plants seeds of change for tomorrow.</p>
          </div>
        </div>
      </div>

      <div className="about-image">
        <img src={teamImg} alt="GreenCycle team working together" />
      </div>
    </section>
  );
};

export default Aboutus;
