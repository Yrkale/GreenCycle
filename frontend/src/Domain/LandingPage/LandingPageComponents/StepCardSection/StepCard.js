import React from "react";

const StepCard = ({ step, icon, title, description, image, reverse }) => {
  return (
    <div
      className={`step-card ${reverse ? "reverse" : ""}`}
    >
      {/* Text Section */}
      <div className="step-text">
        <div className="step-header">
          <div className="step-icon">{icon}</div>
          <span className="step-number">{step.toString().padStart(2, "0")}</span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      {/* Image Section */}
      <div className="step-image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default StepCard;
