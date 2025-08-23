import React from "react";
import "./TopContributor.css";
import profile1 from "../../LandingPageAssets/logo.png"; // replace with actual images
import profile2 from "../../LandingPageAssets/logo.png";
import profile3 from "../../LandingPageAssets/logo.png";
import profile4 from "../../LandingPageAssets/logo.png";
import profile5 from "../../LandingPageAssets/logo.png";

const contributors = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Eco Champion",
    waste: "2.5 tons",
    seeds: 350,
    trees: 45,
    growth: "+15%",
    img: profile1,
    badge: "#1",
    badgeColor: "gold",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Green Leader",
    waste: "2.1 tons",
    seeds: 295,
    trees: 38,
    growth: "+12%",
    img: profile2,
    badge: "#2",
    badgeColor: "silver",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Seed Master",
    waste: "1.8 tons",
    seeds: 420,
    trees: 32,
    growth: "+18%",
    img: profile3,
    badge: "#3",
    badgeColor: "bronze",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Recycling Pro",
    waste: "1.6 tons",
    seeds: 180,
    trees: 28,
    growth: "+8%",
    img: profile4,
    badge: "#4",
    badgeColor: "green",
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "Community Builder",
    waste: "1.4 tons",
    seeds: 225,
    trees: 25,
    growth: "+10%",
    img: profile5,
    badge: "#5",
    badgeColor: "green",
  },
];

const TopContributor = () => {
  return (
    <section id="TopContributor" className="contributors-container">
      <h2>
        Meet Our <span className="highlight">Top Contributors</span>
      </h2>
      <p className="subtitle">
        These community champions are leading the way in waste reduction and
        tree planting. Their dedication is making a real difference in our
        environment.
      </p>

      <div className="contributors-grid">
        {contributors.map((c) => (
          <div key={c.id} className="contributor-card">
            <div className={`badge ${c.badgeColor}`}>{c.badge}</div>
            <img src={c.img} alt={c.name} className="avatar" />
            <h3>{c.name}</h3>
            <p className="role">{c.role}</p>

            <ul className="stats">
              <li>♻ Waste <span>{c.waste}</span></li>
              <li>🌱 Seeds <span>{c.seeds}</span></li>
              <li>🌳 Trees <span>{c.trees}</span></li>
            </ul>

            <div className="growth">
              <p>Monthly Growth</p>
              <span>{c.growth}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="join-banner">
        <div>
          <strong>Join the leaderboard!</strong>
          <p>Start contributing today and see your impact grow.</p>
        </div>
        <button className="join-btn">Join Now</button>
      </div>
    </section>
  );
};

export default TopContributor;
