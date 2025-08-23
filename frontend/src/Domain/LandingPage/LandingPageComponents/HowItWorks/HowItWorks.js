import React from "react";
import "./HowItWorks.css";
import { FaHome, FaRecycle, FaGift } from "react-icons/fa";
import ImageOne from "../../LandingPageAssets/HowItWorksImgs/1.jpeg"; // update with correct path
import ImageTwo from "../../LandingPageAssets/HowItWorksImgs/2.jpeg";
import ImageThree from "../../LandingPageAssets/HowItWorksImgs/3.jpeg";

const steps = [
  {
    id: 1,
    icon: <FaHome />,
    title: "Collect at Home",
    description:
      "Separate recyclable materials and collect seeds from fruits and vegetables in your household. Every contribution earns you eco-points!",
    image: ImageOne,
  },
  {
    id: 2,
    icon: <FaRecycle />,
    title: "Recycle Household Waste",
    description:
      "Collect and categorize recyclable household waste including paper, plastic, glass, and metal. Earn eco-points for every contribution!",
    image: ImageTwo,
  },
  {
    id: 3,
    icon: <FaGift />,
    title: "Earn Rewards",
    description:
      "Redeem your eco-points for exciting rewards, vouchers, and recognition in your community!",
    image: ImageThree,
  },
];

const HowItWorks = () => {
  return (
    <section id="How-It-Works" className="how-it-works">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`step-card ${index % 2 === 0 ? "normal" : "reverse"}`}
        >
          <div className="step-content">
            <div className="step-header">
              <div className="step-icon">{step.icon}</div>
              <span className="step-number">
                {String(step.id).padStart(2, "0")}
              </span>
            </div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
          <div className="step-image">
            <img src={step.image} alt={step.title} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default HowItWorks;
