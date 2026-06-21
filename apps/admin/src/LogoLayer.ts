export default function FogLayer({
  className = ""
}: {
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",return (
  <div
    ref={containerRef}
    style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      background: "radial-gradient(circle at center, #111 0%, #000 100%)",
      fontFamily: "Arial, Helvetica, sans-serif"
    }}
  >
    <GridLayer className="grid" />
    <FogLayer className="fog" />

    <LogoLayer ref={logoRef} />

    {/* Center Content */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#ffffff",
        pointerEvents: "none",
        paddingTop: "180px"
      }}
    >
      <h2
        style={{
          fontWeight: 300,
          letterSpacing: "4px",
          color: "#cccccc",
          marginBottom: "25px"
        }}
      >
        The Forge Is Burning.
      </h2>

      <p
        style={{
          fontSize: "20px",
          opacity: 0.8,
          marginBottom: "30px"
        }}
      >
        Every legend starts as a spark.
      </p>

      <div
        style={{
          display: "flex",
          gap: "18px",
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: 0.7,
          fontSize: "14px",
          letterSpacing: "2px"
        }}
      >
        <span>BATTLES</span>
        <span>AI STUDIO</span>
        <span>MARKETPLACE</span>
        <span>CREATOR ECONOMY</span>
      </div>
    </div>

    {/* Founder Form */}
    <div
      style={{
        position: "absolute",
        bottom: "110px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 30
      }}
    >
      <input
        type="email"
        placeholder="Enter your email"
        style={{
          width: "340px",
          maxWidth: "90%",
          padding: "16px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid #444",
          color: "#fff",
          outline: "none",
          marginBottom: "18px",
          fontSize: "16px",
          textAlign: "center"
        }}
      />

      <button
        style={{
          padding: "16px 42px",
          background: "transparent",
          border: "1px solid #777",
          color: "#fff",
          cursor: "pointer",
          letterSpacing: "3px",
          textTransform: "uppercase",
          fontWeight: "bold"
        }}
      >
        Join the Founders List
      </button>
    </div>

    {/* Footer */}
    <div
      style={{
        position: "absolute",
        bottom: "35px",
        width: "100%",
        textAlign: "center",
        color: "#ffffff",
        opacity: 0.35,
        letterSpacing: "4px",
        fontSize: "14px",
        zIndex: 30
      }}
    >
      COMING SOON
    </div>
  </div>
);
        inset: 0,
        background: `
          radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08), transparent 60%),
          radial-gradient(circle at 70% 60%, rgba(255,255,255,0.05), transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent 70%)
        `,
        filter: "blur(80px)",
        pointerEvents: "none"
      }}
    />
  );
}