import React, { useState, useEffect } from "react";
import { getRecyclableItems } from "./RecyclableItemService";
import "./Product.css";

const Product = ({ onSelectionChange }) => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getRecyclableItems();
        setProducts(res.data);

        // INITIAL QUANTITY = 0
        const qtyMap = {};
        res.data.forEach((item) => {
          qtyMap[item.id] = 0;
        });

        setQuantities(qtyMap);
      } catch (err) {
        console.error("❌ Failed to fetch recyclable items:", err);
      }
    };

    fetchItems();
  }, []);

  // ================================
  // QUANTITY UPDATE WITH AUTO-SELECT
  // ================================
  const updateQuantity = (id, newQty) => {
    if (newQty < 0) newQty = 0;

    setQuantities((prev) => ({ ...prev, [id]: newQty }));

    // Auto-select when quantity goes from 0 → 1
    if (newQty === 1 && !selected.includes(id)) {
      setSelected((prev) => [...prev, id]);
    }

    // Auto-unselect if quantity becomes 0
    if (newQty === 0 && selected.includes(id)) {
      setSelected((prev) => prev.filter((x) => x !== id));
    }
  };

const toggleSelect = (id) => {
  setSelected((prev) => {
    if (prev.includes(id)) {
      // 🔥 When user unselects → reset quantity to 0
      setQuantities((q) => ({ ...q, [id]: 0 }));
      return prev.filter((x) => x !== id);
    } else {
      // Selecting → quantity becomes 1 if it's 0
      if (quantities[id] === 0) {
        setQuantities((q) => ({ ...q, [id]: 1 }));
      }
      return [...prev, id];
    }
  });
};


  // Send updated selection to parent
  useEffect(() => {
    const selectedItems = products
      .filter((p) => selected.includes(p.id))
      .map((item) => {
        const qty = quantities[item.id];
        const totalPoints =
          item.category === "SEED"
            ? item.points
            : item.points * qty;

        return {
          ...item,
          quantity: item.category === "SEED" ? 1 : qty,
          totalPoints,
        };
      });

    onSelectionChange(selectedItems);
  }, [selected, quantities, products, onSelectionChange]);

  const totalPoints = products
    .filter((p) => selected.includes(p.id))
    .reduce((sum, item) => {
      const qty = quantities[item.id];
      return (
        sum +
        (item.category === "SEED" ? item.points : item.points * qty)
      );
    }, 0);

  return (
    <div className="product-modal">
      <div className="product-header">
        <h2>♻️ GreenCycle Collection Request</h2>
      </div>

      <div className="product-body">
        <h3>What Can We Collect?</h3>

        <div className="product-grid">
          {products.map((item) => {
            const isSelected = selected.includes(item.id);
            const qty = quantities[item.id];
            const isSeed = item.category === "SEED";

            return (
              <div
                key={item.id}
                className={`product-card ${isSelected ? "selected" : ""}`}
                onClick={() => toggleSelect(item.id)}
              >
                <h4>{item.title}</h4>
                <p>{item.description}</p>

                {/* Quantity Selector (hidden on seed) */}
                {!isSeed && (
                  <div
                    className="qty-box small"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="qty-btn small"
                      onClick={() => updateQuantity(item.id, qty - 1)}
                    >
                      −
                    </button>

                    <span className="qty-value small">{qty}</span>

                    <button
                      className="qty-btn small"
                      onClick={() => updateQuantity(item.id, qty + 1)}
                    >
                      +
                    </button>
                  </div>
                )}

                <span className="eco-points">
                  🌱 {isSeed ? item.points : item.points * qty} eco-points
                </span>
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
