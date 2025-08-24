import React, { useState } from "react";
import "./Product.css";

const products = [
  { id: 1, title: "Plastic Bottles", description: "PET bottles, water bottles, soda bottles", points: 5 },
  { id: 2, title: "Glass Containers", description: "Jars, bottles, food containers", points: 8 },
  { id: 3, title: "Aluminum Cans", description: "Beverage cans, food cans", points: 10 },
  { id: 4, title: "Cardboard & Paper", description: "Boxes, newspapers, magazines", points: 3 },
  { id: 5, title: "Electronics", description: "Old phones, batteries, small appliances", points: 15 },
  { id: 6, title: "Textiles", description: "Old clothes, fabric scraps, shoes", points: 7 },
  { id: 7, title: "Organic Waste & Seeds", description: "Fruit peels, vegetable scraps, seeds", points: 5 },
  { id: 8, title: "Metal Items", description: "Wire, small metal objects, hardware", points: 12 },
];

const Product = () => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedItems = products.filter((p) => selected.includes(p.id));
  const totalPoints = selectedItems.reduce((sum, item) => sum + item.points, 0);

  return (
    <div className="product-modal">
      <div className="product-header">
        <h2>♻️ GreenCycle Collection Request</h2>
      </div>

      <div className="product-body">
        <h3>What Can We Collect?</h3>
        <p>
          Select the items you'd like us to collect. Each item type earns you eco-points
          that can be redeemed in our shop!
        </p>

        <div className="product-grid">
          {products.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <div
                key={item.id}
                className={`product-card ${isSelected ? "selected" : ""}`}
                onClick={() => toggleSelect(item.id)}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleSelect(item.id)}
              >
                {/* keep a real checkbox for a11y, but hide it visually */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  aria-hidden="true"
                />

                <label>
                  <div className="image-placeholder">
                    <span>🖼</span>
                  </div>

                  <div className="title-row">
                    <span className="checkbox-round" aria-hidden="true"></span>
                    <h4>{item.title}</h4>
                  </div>

                  <p>{item.description}</p>
                  <span className="eco-points">🌱 {item.points} eco-points</span>
                </label>
              </div>
            );
          })}
        </div>

        <div className="summary-box">
          <p>📦 Selected Items: <b>{selected.length}</b></p>
          <p>Total Eco-Points: <b>{totalPoints}</b></p>
        </div>
      </div>
    </div>
  );
};

export default Product;
