import React from "react";
import "./Shop.css";

const products = [
  {
    id: 1,
    name: "Recycled Plastic Water Bottle",
    description:
      "Durable water bottle made from 100% recycled ocean plastic. BPA-free and dishwasher safe.",
    points: 150,
    price: "$25",
    impact: "Saves 5 plastic bottles from landfills",
    image:
      "https://via.placeholder.com/200x200.png?text=Water+Bottle",
  },
  {
    id: 2,
    name: "Bamboo Fiber Lunch Box",
    description:
      "Sustainable lunch container made from bamboo fiber and recycled materials. Microwave safe.",
    points: 200,
    price: "$35",
    impact: "Replaces 100+ single-use containers",
    image:
      "https://via.placeholder.com/200x200.png?text=Lunch+Box",
  },
  {
    id: 3,
    name: "Eco-Friendly Tote Bag",
    description:
      "Stylish tote bag made from recycled canvas and featuring natural dyes.",
    points: 180,
    price: "$28",
    impact: "Eliminates need for 500+ plastic bags",
    image:
      "https://via.placeholder.com/200x200.png?text=Tote+Bag",
  },
];

const earnPoints = [
  { id: 1, title: "Recycle 1kg plastic", points: "+50 points", icon: "♻️" },
  { id: 2, title: "Donate 10 seeds", points: "+30 points", icon: "🌱" },
  { id: 3, title: "Weekly challenge", points: "+100 points", icon: "🏆" },
  { id: 4, title: "Refer a friend", points: "+200 points", icon: "🌳" },
];

export default function Shop() {
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
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} />
            <div className="product-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="points-price">
                <span className="points">{item.points} pts</span>
                <span className="price">{item.price}</span>
              </div>
              <p className="impact">
                <strong>Impact: </strong>
                {item.impact}
              </p>
              <button className="redeem-btn" disabled>
                Sign in to redeem
              </button>
            </div>
          </div>
        ))}
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
