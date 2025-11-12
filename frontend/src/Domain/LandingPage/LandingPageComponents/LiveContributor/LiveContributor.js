import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LiveContributor.css";
import { FaLeaf, FaSeedling, FaRecycle, FaChartLine, FaUsers } from "react-icons/fa";
import { FiClock, FiMapPin } from "react-icons/fi";

const LiveContribution = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchContributors();
  }, []);

  const fetchContributors = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/live-contributors");
      setActivities(res.data);
    } catch (err) {
      console.error("❌ Error fetching contributors:", err);
    }
  };

  // ✅ Utility: Convert timestamp → "x minutes ago"
  const timeAgo = (dateTime) => {
    const now = new Date();
    const diffMs = now - new Date(dateTime);
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffHrs = Math.floor(diffMin / 60);
    if (diffHrs < 24) return `${diffHrs} hr ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (

     <section id="LiveContributor" className="live-contributor-section">
  
    <div className="live-contribution">
      <h2 className="section-title">
        <span className="dot"></span> Live Contributors <span className="highlight">Activity</span>
      </h2>

      <div className="recent-activity">
        <div className="header">
          <h3>Recent Activity</h3>
          <span className="live-updates">Live Updates</span>
        </div>

        {activities.map((act) => (
          <div key={act.id} className="activity-card">
            <div className="activity-info">
              <strong>{act.userName}</strong> {act.action}
              <div className="meta">
                <FiClock /> {timeAgo(act.time)}
              </div>
            </div>
            <div className="activity-stats">
              <span className="reward">{act.reward}</span>
            </div>
          </div>
        ))}

        {activities.length === 0 && <p>No recent contributions yet......</p>}
      </div>
    </div>
     </section>
  );
};

export default LiveContribution;
