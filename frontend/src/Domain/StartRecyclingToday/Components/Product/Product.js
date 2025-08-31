import React, { useState, useEffect } from "react";
import { getRecyclableItems } from "./RecyclableItemService";
import "./Product.css";

const Product = ({ onSelectionChange }) => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getRecyclableItems();
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch recyclable items:", err);
      }
    };
    fetchItems();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    // send full objects to parent (PickUpRequest)
    onSelectionChange(products.filter((p) => selected.includes(p.id)));
  }, [selected, products, onSelectionChange]);

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
          Select the items you'd like us to collect. Each item type earns you eco-points!
        </p>

        <div className="product-grid">
          {products.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <div
                key={item.id}
                className={`product-card ${isSelected ? "selected" : ""}`}
                onClick={() => toggleSelect(item.id)}
              >
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <span className="eco-points">🌱 {item.points} eco-points</span>
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
