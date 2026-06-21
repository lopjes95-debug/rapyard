import "./cinematic.css";

export default function Home() {
  return (
    <main className="rapyard">
      <div className="overlay" />

      <section className="hero">
        <div className="skyline" />

        <h1 className="logo">
          RAP<span>Y</span>ARD
        </h1>

        <p className="tagline">
          The Digital Block Where Creators Battle, Build & Rise.
        </p>

        <div className="cta-row">
          <button className="blood-btn">ENTER THE YARD</button>
          <button className="chrome-btn">WATCH BATTLES</button>
        </div>
      </section>

      <section className="lanes">
        <h2>PICK YOUR LANE</h2>

        <div className="lane-grid">
          <div className="lane">
            <h3>RAPPER</h3>
            <p>Battle. Build your fanbase. Earn your spot.</p>
          </div>

          <div className="lane">
            <h3>PRODUCER</h3>
            <p>Showcase beats. Connect with artists.</p>
          </div>

          <div className="lane">
            <h3>LISTENER</h3>
            <p>Vote on battles. Influence rankings.</p>
          </div>
        </div>
      </section>

      <section className="battle-section">
        <h2>SOCIAL MEDIA & LISTENER VOTING ON BATTLES</h2>

        <div className="battle-card">
          <div className="battle-side">MC ALPHA</div>
          <div className="vs">VS</div>
          <div className="battle-side">MC OMEGA</div>
        </div>
      </section>

      <footer className="footer">
        <div className="bleed">BLEED THA BLOCK</div>
      </footer>
    </main>
  );
}
