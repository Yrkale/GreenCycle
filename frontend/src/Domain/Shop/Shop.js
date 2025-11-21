import React, { useEffect, useState } from "react";
import "./Shop.css";
import axios from "axios";
import { useAuth } from "../User/context/AuthContext";
import { getShops, redeemItem, getUserRedemptions } from "./ShopService";

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
  const [redemptions, setRedemptions] = useState([]);

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

  // ✅ Fetch redeemed items
  const fetchRedemptions = async () => {
    if (!token) return;
    try {
      const res = await getUserRedemptions(token);
      setRedemptions(res.data);
    } catch (err) {
      console.error("❌ Failed to load redemptions:", err);
    }
  };

  // ✅ Redeem shop item
  const handleRedeem = async (item) => {
    if (ecoPoints < item.pointsCost) {
      setMessage("❌ Not enough eco points to redeem this item.");
      return;
    }

    try {
      await redeemItem(item.id, token);
      setMessage(`✅ Successfully redeemed ${item.name}!`);
      await fetchProfile(); // refresh updated ecoPoints
      await fetchRedemptions(); // refresh redemption list
    } catch (err) {
      console.error("Redemption failed:", err);
      setMessage("❌ Redemption failed. Please try again later.");
    }
  };

  useEffect(() => {
    fetchShops();
    fetchProfile();
    fetchRedemptions();
  }, [token]);

  return (
    <div id="shop" className="shop-container">
      {/* ✅ Header */}
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

      {/* ✅ Shop Items */}
      <section className="products">
        {loading ? (
          <p>Loading items...</p>
        ) : shops.length > 0 ? (
          shops.map((item) => {
            const canRedeem = token && ecoPoints >= item.pointsCost;
            return (
              <div key={item.id} className="product-card">
                <img src={item.imageUrl} alt={item.name} />
                <div className="product-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="points-price">
                    <span className="points">{item.pointsCost} pts</span>
                    <span className="price">₹{item.price}</span>
                  </div>

                  <button
                    className={`redeem-btn ${
                      canRedeem ? "active" : "disabled"
                    }`}
                    onClick={() => canRedeem && handleRedeem(item)}
                    disabled={!canRedeem}
                  >
                    {token
                      ? canRedeem
                        ? "Redeem"
                        : "Not enough points"
                      : "Sign in to redeem"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No shop items available</p>
        )}
      </section>

     {/* ✅ My Redeemed Orders Section */}
{token && (
  <section className="my-redemptions">
    <h2>My Redeemed Orders</h2>

    {redemptions.length > 0 ? (
      <div className="redemption-grid">
        {redemptions.map((r) => (
          <div key={r.id} className="redemption-card">
            <div className="redemption-header">
              <img
                src={r.imageUrl || "https://cdn-icons-png.flaticon.com/512/711/711769.png"}
                alt={r.shopName || "Redeemed item"}
                className="redemption-img"
              />
              <div className="redemption-details">
                <h4>{r.shopName ? r.shopName : `Shop #${r.shopId}`}</h4>
                <p className="points-used">🪙 {r.pointsUsed ?? "—"} pts used</p>
              </div>
            </div>
            <p className="redeemed-date">
              🗓️ {r.redeemedAt
                ? new Date(r.redeemedAt).toLocaleString()
                : "Unknown date"}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="no-redemptions">You haven’t redeemed any items yet.</p>
    )}
  </section>
)}


      {/* ✅ Earn Points Section */}
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
