import React from "react";
import "./ImpactSection.css";
import { FaRecycle, FaTree, FaLeaf, FaCoins } from "react-icons/fa";

const ImpactSection = () => {
  const features = [
    {
      icon: <FaRecycle />,
      title: "Smart Waste Recycling",
      description:
        "Collect and categorize recyclable household waste including paper, plastic, glass, and metal. Earn eco-points for every contribution!",
      points: [
        "Easy waste categorization system",
        "Pickup scheduling with rewards",
        "Eco-points for every kilogram",
        "Impact tracking dashboard",
      ],
    },
    {
      icon: <FaTree />,
      title: "Seed Collection Program",
      description:
        "Gather fruit and vegetable seeds from household waste to grow trees and plants in local nurseries. Earn bonus eco-points for seed donations!",
      points: [
        "Seed identification guide",
        "Proper storage techniques",
        "Bonus eco-points for seeds",
        "Nursery partnership network",
      ],
    },
    {
      icon: <FaLeaf />,
      title: "Environmental Impact",
      description:
        "Track your contribution to reducing waste and increasing green coverage in your community.",
      points: [
        "Carbon footprint reduction",
        "Waste diversion metrics",
        "Tree growth tracking",
      ],
    },
    {
      icon: <FaCoins />,
      title: "Eco-Points Rewards",
      description:
        "Earn eco-points for every contribution and redeem them in our shop for sustainable products made from recycled materials.",
      points: [
        "Points for waste & seeds",
        "Eco-friendly product shop",
        "Circular economy support",
        "Exclusive member rewards",
      ],
    },
  ];

  return (
    <section className="impact-section">
      <h2>
        Earn Rewards While Making a <span className="highlight">Big Impact</span>
      </h2>
      <p className="impact-subtitle">
        Our comprehensive approach tackles waste reduction and reforestation while 
        rewarding you with eco-points. Contribute waste and seeds, earn points, 
        and shop for sustainable products made from recycled materials.
      </p>

      <div className="impact-cards">
        {features.map((feature, index) => (
          <div className="impact-card" key={index}>
            <div className="impact-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <ul>
              {feature.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;
