import React, { useEffect, useState } from "react";
import "./Shop.css";
import { getProducts } from "./ProductService";

const earnPoints = [
  { id: 1, title: "Recycle 1kg plastic", points: "+50 points", icon: "♻️" },
  { id: 2, title: "Donate 10 seeds", points: "+30 points", icon: "🌱" },
  { id: 3, title: "Weekly challenge", points: "+100 points", icon: "🏆" },
  { id: 4, title: "Refer a friend", points: "+200 points", icon: "🌳" },
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div id="shop" className="shop-container">
      {/* Header */}
      <header className="shop-header">
        <h1>
          Welcome to the <span className="eco-text">Eco-Rewards Shop</span>
        </h1>
        <p>
          Redeem your eco-points for sustainable products made from recycled
          materials. Every purchase supports our circular economy and helps
          reduce waste.
        </p>
        <a href="/" className="signin-link">
          Sign in to your GreenCycle account to start redeeming eco-points!
        </a>
      </header>

      {/* Product Section */}
      <section className="products">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          products.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.imageUrl} alt={item.name} />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="points-price">
                  <span className="points">{item.pointsCost} pts</span>
                  <span className="price">${item.price}</span>
                </div>
                <button className="redeem-btn" disabled>
                  Sign in to redeem
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
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
