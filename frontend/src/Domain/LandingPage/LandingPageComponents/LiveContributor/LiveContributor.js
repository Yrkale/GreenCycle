import React from "react";
import "./LiveContributor.css";
import { FaLeaf, FaSeedling, FaRecycle, FaChartLine, FaUsers } from "react-icons/fa";
import { FiClock, FiMapPin } from "react-icons/fi";

const LiveContribution = () => {
  const activities = [
    { id: 1, user: "Sarah M.", action: "just collected 2.5kg of plastic waste", type: "waste", amount: "2.5kg", reward: "+125", location: "Downtown District", time: "2 minutes ago" },
    { id: 2, user: "Alex K.", action: "just donated 15 apple seeds", type: "seed", amount: "15 seeds", reward: "+45", location: "Green Valley", time: "5 minutes ago" },
    { id: 3, user: "Maria L.", action: "just recycled glass bottles", type: "waste", amount: "1.2kg", reward: "+60", location: "Riverside Area", time: "8 minutes ago" },
    { id: 4, user: "David R.", action: "just contributed 22 citrus seeds", type: "seed", amount: "22 seeds", reward: "+66", location: "City Center", time: "12 minutes ago" },
    { id: 5, user: "Emma T.", action: "just collected paper waste", type: "waste", amount: "3.1kg", reward: "+155", location: "Suburban Area", time: "15 minutes ago" },
  ];

  const topContributors = [
    { id: 1, name: "Sarah M.", value: "12.5kg", icon: <FaRecycle /> },
    { id: 2, name: "Alex K.", value: "95 seeds", icon: <FaLeaf /> },
    { id: 3, name: "Maria L.", value: "8.2kg", icon: <FaRecycle /> },
  ];

  return (
    <div id="LiveContribution" className="live-contribution">
      {/* Header Stats */}
      <h2 className="section-title">
        <span className="dot"></span> Live Contributors <span className="highlight">Activity</span>
      </h2>
      <p className="subtitle">
        See real-time contributions from our community members. Every collection and donation makes a difference right now.
      </p>

      <div className="stats-cards">
        <div className="stat-card green">
          <FaUsers className="icon" />
          <h3>221</h3>
          <p>Active Contributors</p>
        </div>
        <div className="stat-card blue">
          <FaRecycle className="icon" />
          <h3>311.7kg</h3>
          <p>Waste Collected</p>
        </div>
        <div className="stat-card green">
          <FaSeedling className="icon" />
          <h3>252</h3>
          <p>Seeds Donated</p>
        </div>
        <div className="stat-card purple">
          <FaChartLine className="icon" />
          <h3>+24%</h3>
          <p>This Week</p>
        </div>
      </div>

      <div className="content">
        {/* Recent Activity */}
        <div className="recent-activity">
          <div className="header">
            <h3>Recent Activity</h3>
            <span className="live-updates">Live Updates</span>
          </div>
          {activities.map((act) => (
            <div key={act.id} className={`activity-card ${act.type}`}>
              <div className="activity-info">
                <strong>{act.user}</strong> {act.action}
                <div className="meta">
                  <FiMapPin /> {act.location} <FiClock /> {act.time}
                </div>
              </div>
              <div className="activity-stats">
                <span className="amount">{act.amount}</span>
                <span className="reward">{act.reward}</span>
              </div>
            </div>
          ))}
          <p className="last-updated">Last updated: 3:57:45 PM</p>
        </div>

        {/* Top This Week */}
        <div className="sidebar">
          <div className="top-week">
            <h3>Top This Week</h3>
            {topContributors.map((tc) => (
              <div key={tc.id} className="top-user">
                <span>#{tc.id}</span>
                <span>{tc.name}</span>
                <span className="value">{tc.value}</span>
                {tc.icon}
              </div>
            ))}
          </div>

          {/* Join Live */}
          <div className="join-live">
            <h3>Join Live!</h3>
            <p>Start contributing now</p>
            <button className="btn">Get Started</button>
            <span className="active-users">● 221 people active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveContribution;
