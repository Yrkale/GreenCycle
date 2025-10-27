import React, { useEffect, useState } from "react";
import "./Shop.css";
import axios from "axios";
import { useAuth } from "../User/context/AuthContext";
import { getShops } from "./ShopService";

const earnPoints = [
  { id: 1, title: "Recycle 1kg plastic", points: "+50 points", icon: "♻️" },
  { id: 2, title: "Donate 10 seeds", points: "+30 points", icon: "🌱" },
  { id: 3, title: "Weekly challenge", points: "+100 points", icon: "🏆" },
  { id: 4, title: "Refer a friend", points: "+200 points", icon: "🌳" },
];

export default function Shop() {
  const { token } = useAuth();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [message, setMessage] = useState("");

  // ✅ Fetch user ecoPoints
  const fetchProfile = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:8080/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEcoPoints(res.data.ecoPoints);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };

  // ✅ Fetch shop items
  const fetchShops = async () => {
    try {
      const res = await getShops();
      setShops(res.data);
    } catch (err) {
      console.error("❌ Failed to load shop items", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Redeem shop item
  const handleRedeem = async (item) => {
    if (ecoPoints < item.pointsCost) {
      setMessage("❌ Not enough eco points to redeem this item.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/shop/redeem/${item.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(`✅ Successfully redeemed ${item.name}!`);
      setEcoPoints((prev) => prev - item.pointsCost);
    } catch (err) {
      console.error("Redemption failed:", err);
      setMessage("❌ Redemption failed. Please try again later.");
    }
  };

  useEffect(() => {
    fetchShops();
    fetchProfile();
  }, [token]);

  return (
    <div id="shop" className="shop-container">
      <header className="shop-header">
        <h1>
          Welcome to the <span className="eco-text">Eco-Rewards Shop</span>
        </h1>
        <p>
          Redeem your eco-points for sustainable products made from recycled
          materials. Every purchase supports our circular economy.
        </p>

        {token ? (
          <p className="points-balance">
            🌱 Your Eco Points: <strong>{ecoPoints}</strong>
          </p>
        ) : (
          <a href="/login" className="signin-link">
            Sign in to redeem eco-points!
          </a>
        )}
      </header>

      {message && <p className="shop-message">{message}</p>}

      {/* Shop Items */}
      <section className="products">
        {loading ? (
          <p>Loading items...</p>
        ) : shops.length > 0 ? (
          shops.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.imageUrl} alt={item.name} />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="points-price">
                  <span className="points">{item.pointsCost} pts</span>
                  <span className="price">${item.price}</span>
                </div>
                {token ? (
                  <button
                    className="redeem-btn"
                    onClick={() => handleRedeem(item)}
                    disabled={ecoPoints < item.pointsCost}
                  >
                    {ecoPoints < item.pointsCost
                      ? "Not enough points"
                      : "Redeem"}
                  </button>
                ) : (
                  <button className="redeem-btn" disabled>
                    Sign in to redeem
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No shop items available</p>
        )}
      </section>

      {/* Earn Points Section */}
      <section className="earn-points">
        <h2>Earn More Points</h2>
        <div className="points-grid">
          {earnPoints.map((task) => (
            <div key={task.id} className="task-card">
              <span className="icon">{task.icon}</span>
              <h4>{task.title}</h4>
              <p>{task.points}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
