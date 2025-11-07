import React, { useEffect, useState } from "react";
import "./TopContributor.css";
import axios from "axios";
//import { Clock, Eye, Share2 } from "lucide-react"; // for icons
import { Leaf } from 'lucide-react';  
import defaultImage from "../../LandingPageAssets/logo.png";

const TopContributor = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    fetchContributors();
  }, []);

  const fetchContributors = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/top-contributors");
      setContributors(res.data.slice(0, 4)); // only keep first 4
    } catch (error) {
      console.error("❌ Error fetching contributors:", error);
    }
  };

  const rankLabels = ["1st", "2nd", "3rd"];

  return (
    <section id="TopContributor" className="contributors-container">
      <h2>Top Contributors</h2>
      <p className="subtitle">
        Our community heroes leading the way toward a cleaner, greener planet 🌍
      </p>

      <div className="contributors-grid">
        {contributors.length > 0 ? (
          contributors.map((c, index) => (
            <div key={c.id} className="contributor-card">
              {/* Rank Badge */}
              <span
                className={`rank-badge ${
                  index === 0
                    ? "gold"
                    : index === 1
                    ? "silver"
                    : index === 2
                    ? "bronze"
                    : ""
                }`}
              >
                {rankLabels[index] || `#${index + 1}`}
              </span>

              {/* Profile Image */}
              <img
                src={c.profileImageUrl || defaultImage}
                alt={c.username}
                className="avatar"
              />

              {/* Username */}
              <h3>{c.username}</h3>
              <p className="role">
                {c.roles && c.roles.length > 0
                  ? c.roles[0].name.replace("ROLE_", "").toLowerCase()
                  : "Eco Contributor"}
              </p>

              {/* Tag */}
              <div className="contributor-tag">Contributor</div>

              {/* Stats Section */}
              <div className="stats-container">
                <div className="stat-box">
                  <Leaf className="stat-icon" />
                  <span>{c.tillNowEcoPoints ?? 0}</span>
                </div>                 
              </div>
            </div>
          ))
        ) : (
          <p>No top contributors found yet.</p>
        )}
      </div>

      {/* Join Banner */}
      <br></br>
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
