import React from "react";
import "./Join.css";

const Join = () => {
  return (
    <section id="Join" className="join-section">
      <div className="join-content">
        <h2>Ready to Make a Difference?</h2>
        <p>
          Join thousands of households already making an environmental impact. <br />
          Start your waste recycling and seed collection journey today.
        </p>

        <div className="join-form">
          <input type="email" placeholder="Enter your email address" />
          <button>Get Started</button>
        </div>

        <div className="join-features">
          <span>● Free to join</span>
          <span>● No hidden fees</span>
          <span>● Cancel anytime</span>
        </div>
      </div>
    </section>
  );
};

export default Join;
