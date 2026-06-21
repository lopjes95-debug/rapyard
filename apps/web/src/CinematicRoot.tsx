import React from "react";

export default function CinematicRoot() {
const chromeStyle: React.CSSProperties = {
fontFamily: "'Impact', 'Arial Black', sans-serif",
fontWeight: 900,
color: "transparent",
background:
"linear-gradient(180deg,#ffffff 0%,#dddddd 15%,#888888 40%,#250000 52%,#9b9b9b 68%,#ffffff 100%)",
WebkitBackgroundClip: "text",
textShadow:
"0 2px 2px rgba(255,255,255,.35),0 5px 12px rgba(0,0,0,.9),0 0 28px rgba(160,0,0,.65)",
};

return (
<> <main className="rapyard-page"> <div className="fog" /> <div className="grid" /> <div className="blood blood-top" /> <div className="blood blood-bottom" />

```
    <div className="side side-left">CREATORS BUILD THE YARD</div>
    <div className="side side-right">LISTENERS MOVE THE YARD</div>

    <section className="hero">
      <h1 style={chromeStyle} className="logo">RAPYARD</h1>

      <p className="eyebrow">THE CALL TO ACTION</p>
      <h2>THE YARD WHERE BARS BECOME LEGACY.</h2>
      <p className="sub">
        Battles. Beats. Royalties. Community.
        <br />
        Built by creators. Powered by listeners.
      </p>

      <div className="features">
        <span>BATTLES</span>
        <span>RECORDING STUDIO</span>
        <span>MARKETPLACE</span>
        <span>LISTENER VOTING</span>
        <span>CREATOR ROYALTIES</span>
      </div>

      <div className="lanes">
        <button>RAPPER</button>
        <button>PRODUCER</button>
        <button>LISTENER</button>
      </div>

      <div className="signup">
        <input type="email" placeholder="Enter your email" />
        <button>CLAIM YOUR SPOT IN THE YARD</button>
      </div>
    </section>

    <section className="bottom-brand">
      <h1 style={chromeStyle}>BLEED THA BLOCK</h1>
      <h2 style={chromeStyle}>LABEL</h2>
      <p>ONLY THE BEGINNING</p>
    </section>
  </main>

  <style>{`
    * { box-sizing: border-box; }
    body { margin: 0; background: #000; overflow: hidden; }

    .rapyard-page {
      position: fixed;
      inset: 0;
      overflow: hidden;
      background:
        radial-gradient(circle at center, #230000 0%, #070707 48%, #000 100%);
      color: white;
      font-family: Arial, Helvetica, sans-serif;
      text-align: center;
      padding: 24px;
    }

    .fog {
      position: absolute;
      inset: -25%;
      background: radial-gradient(circle, rgba(120,120,120,.25), transparent 65%);
      filter: blur(90px);
      animation: fogMove 18s linear infinite;
    }

    .grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
      background-size: 48px 48px;
      opacity: .22;
    }

    .blood {
      position: absolute;
      left: 0;
      right: 0;
      height: 140px;
      background: linear-gradient(180deg, rgba(120,0,0,.65), transparent);
      filter: blur(8px);
    }

    .blood-top { top: 0; }
    .blood-bottom {
      bottom: 0;
      transform: rotate(180deg);
    }

    .side {
      position: absolute;
      top: 50%;
      z-index: 5;
      letter-spacing: 4px;
      font-size: 12px;
      color: rgba(255,255,255,.45);
      writing-mode: vertical-rl;
      transform: translateY(-50%);
    }

    .side-left { left: 18px; }
    .side-right { right: 18px; }

    .hero {
      position: relative;
      z-index: 10;
      height: 68vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .logo {
      font-size: clamp(72px, 12vw, 170px);
      letter-spacing: 8px;
      margin: 0;
      line-height: .9;
    }

    .eyebrow {
      color: #b90000;
      letter-spacing: 5px;
      font-weight: 900;
      margin: 20px 0 8px;
    }

    h2 {
      font-size: clamp(24px, 4vw, 58px);
      margin: 0;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .sub {
      color: #ddd;
      font-size: clamp(15px, 2vw, 22px);
      line-height: 1.5;
      margin: 16px 0 22px;
    }

    .features, .lanes {
      display: flex;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .features span {
      border: 1px solid rgba(255,255,255,.25);
      background: rgba(0,0,0,.45);
      padding: 10px 14px;
      font-size: 12px;
      letter-spacing: 2px;
    }

    .lanes { margin-top: 22px; }

    button {
      background: rgba(120,0,0,.45);
      color: white;
      border: 1px solid rgba(255,255,255,.4);
      padding: 14px 24px;
      cursor: pointer;
      letter-spacing: 3px;
      font-weight: 900;
      text-transform: uppercase;
    }

    button:hover { background: rgba(180,0,0,.7); }

    .signup {
      margin-top: 22px;
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    input {
      width: 300px;
      max-width: 90vw;
      padding: 14px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.35);
      color: white;
      text-align: center;
      font-size: 15px;
    }

    input::placeholder { color: #aaa; }

    .bottom-brand {
      position: relative;
      z-index: 10;
      height: 28vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .bottom-brand h1 {
      font-size: clamp(44px, 7vw, 110px);
      letter-spacing: 7px;
      margin: 0;
      line-height: .9;
    }

    .bottom-brand h2 {
      font-size: clamp(24px, 3vw, 44px);
      letter-spacing: 12px;
      margin: 4px 0 0;
    }

    .bottom-brand p {
      color: #ff1b1b;
      letter-spacing: 7px;
      font-weight: 900;
      margin-top: 14px;
      text-shadow: 0 0 18px rgba(255,0,0,.8);
    }

    @keyframes fogMove {
      0% { transform: translateX(-8%) translateY(0); }
      50% { transform: translateX(8%) translateY(-5%); }
      100% { transform: translateX(-8%) translateY(0); }
    }

    @media (max-width: 700px) {
      .rapyard-page {
        padding: 18px 14px;
        overflow-y: auto;
      }

      body { overflow: auto; }

      .side { display: none; }

      .hero {
        min-height: 72vh;
        height: auto;
        padding-top: 20px;
      }

      .logo {
        font-size: clamp(56px, 18vw, 90px);
        letter-spacing: 3px;
      }

      .features span {
        font-size: 10px;
        padding: 9px 10px;
      }

      .signup {
        flex-direction: column;
        align-items: center;
      }

      .bottom-brand {
        min-height: 28vh;
        height: auto;
        padding-bottom: 30px;
      }

      .bottom-brand h1 { letter-spacing: 3px; }
    }
  `}</style>
</>
```

);
}

