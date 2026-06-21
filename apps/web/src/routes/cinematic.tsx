import React from "react";
import "../global.css"; // your reset + overrides
import GridLayer from "../components/GridLayer";

export default function Cinematic() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #000 0%, #111 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid + Fog layers */}
      <GridLayer className="grid-overlay" />

      {/* Title */}
      <h1 className="chrome-exact" style={{ fontSize: "96px", letterSpacing: "12px" }}>
        RAPYARD
      </h1>

      {/* Tagline */}
      <h2 className="houston-exact" style={{ maxWidth: "800px", margin: "20px auto" }}>
        THE FORGE IS BURNING.<br />EVERY LEGEND STARTS AS A SPARK.
      </h2>

      {/* Features row */}
      <div className="features">
        <div>BATTLES</div>
        <div>AI STUDIO</div>
        <div>MARKETPLACE</div>
        <div>CREATOR ECONOMY</div>
      </div>

      {/* Email input + CTA */}
      <input
        type="email"
        placeholder="ENTER YOUR EMAIL"
        className="email-input"
      />
      <button
        className="cta-button"
        onClick={() => {
          // TODO: wire to backend signup
          alert("Joining the Founders List...");
        }}
      >
        JOIN THE FOUNDERS LIST
      </button>

      {/* Footer */}
      <div className="footer">
        <h2 className="houston-exact">BLEED THA BLOCK LABEL</h2>
        <p>COMING SOON</p>
      </div>
    </div>
  );
}
