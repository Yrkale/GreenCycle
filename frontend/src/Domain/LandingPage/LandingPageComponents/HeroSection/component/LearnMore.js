import React from "react";
import "./LearnMore.css";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="learnmore-page">
      <header className="learnmore-header">
        <h1>Recycling for a Greener Future 🌱</h1>
        <p>
          Every small action creates a ripple of change. Let’s learn how proper
          waste segregation and recycling can help build a sustainable planet.
        </p>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </header>

      <section className="learnmore-section">
        <h2>♻️ Why Recycling Matters</h2>
        <p>
          Recycling saves energy, reduces pollution, and minimizes the strain on
          our natural resources. When we recycle, we transform waste into
          valuable materials that can be used again — keeping our planet cleaner
          and greener for future generations.
        </p>
      </section>

      <section className="learnmore-section types">
        <h2>🗑️ Types of Recyclable Waste</h2>
        <div className="waste-types">
          <div className="type-card">
            <h3>Plastic Waste</h3>
            <p>
              Bottles, containers, bags, and packaging can be recycled into new
              plastic products. Always clean them before recycling!
            </p>
          </div>
          <div className="type-card">
            <h3>Paper Waste</h3>
            <p>
              Newspapers, office paper, cardboard, and magazines can be reused
              to make new paper products — saving thousands of trees.
            </p>
          </div>
          <div className="type-card">
            <h3>Metal Waste</h3>
            <p>
              Aluminum cans, foil, and metal scraps can be melted and reused.
              Recycling metal saves up to <b>95% of the energy</b> compared to
              producing it from raw ore!
            </p>
          </div>
          <div className="type-card">
            <h3>Glass Waste</h3>
            <p>
              Glass bottles and jars can be endlessly recycled without losing
              quality — reducing landfill waste significantly.
            </p>
          </div>
          <div className="type-card">
            <h3>E-Waste</h3>
            <p>
              Old electronics contain valuable metals and toxic chemicals.
              Always recycle them responsibly through certified e-waste centers.
            </p>
          </div>
        </div>
      </section>

      <section className="learnmore-section segregation">
        <h2>🧩 How to Segregate Waste at Home</h2>
        <ul>
          <li>
            🟩 <b>Green Bin:</b> Organic waste like food scraps and garden waste.
          </li>
          <li>
            🟨 <b>Blue Bin:</b> Recyclable dry waste like plastic, paper, and
            metal.
          </li>
          <li>
            🔴 <b>Red Bin:</b> Non-recyclable and hazardous waste such as
            sanitary napkins, chemicals, and glass shards.
          </li>
        </ul>
        <p>
          Small steps like separating waste at home make a massive impact on
          local recycling efficiency and landfill reduction.
        </p>
      </section>

      <section className="learnmore-section impact">
        <h2>🌏 The Positive Impact of Recycling</h2>
        <ul>
          <li>✅ Reduces pollution and conserves natural resources.</li>
          <li>✅ Saves energy and decreases greenhouse gas emissions.</li>
          <li>✅ Creates jobs in recycling and green industries.</li>
          <li>✅ Keeps oceans cleaner by reducing plastic waste.</li>
        </ul>
        <p>
          Every item you recycle is a step toward a sustainable future. Let’s
          act responsibly and inspire others to do the same!
        </p>
      </section>

      <footer className="learnmore-footer">
        <h3>Be a Planet Hero 🌳</h3>
        <p>
          Start recycling today and be part of a community working to make the
          Earth greener, cleaner, and better for everyone.
        </p>
        <button className="start-btn" onClick={() => navigate("/")}>
          🌿 Start Recycling
        </button>
      </footer>
    </div>
  );
};

export default LearnMore;
