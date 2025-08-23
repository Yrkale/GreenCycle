import React from "react";
import "./ImpactResult.css";
import impactImg from "../../LandingPageAssets/plant-hands.jpg"; // replace with your image path

const ImpactResult = () => {
  return (
    <section className="impact-container">
      <div className="impact-text">
        <h2>
          Real Impact, <span className="highlight">Measurable Results</span>
        </h2>
        <p className="subtitle">
          Our community-driven approach to waste management and reforestation is
          creating tangible environmental benefits across neighborhoods and
          cities.
        </p>

        <div className="impact-stats">
          <div className="stat-box">
            <h3>85%</h3>
            <p>
              <strong>Waste Diverted from Landfills</strong>
              <br />
              Of household recyclables collected
            </p>
          </div>

          <div className="stat-box">
            <h3>2,500+</h3>
            <p>
              <strong>Trees Planted</strong>
              <br />
              From seeds collected in our program
            </p>
          </div>

          <div className="stat-box">
            <h3>150 tons</h3>
            <p>
              <strong>CO₂ Reduced</strong>
              <br />
              Through recycling and tree planting
            </p>
          </div>

          <div className="stat-box">
            <h3>50+</h3>
            <p>
              <strong>Partner Nurseries</strong>
              <br />
              Supporting local green initiatives
            </p>
          </div>
        </div>
      </div>

      <div className="impact-image">
        <img src={impactImg} alt="Impact Growth" />
        <div className="growth-badge">
          <span>+12%</span>
          <p>Monthly Growth</p>
        </div>
      </div>
    </section>
  );
};

export default ImpactResult;
