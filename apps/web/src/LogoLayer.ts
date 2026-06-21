export default function LogoLayer({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "72px",
        fontWeight: "900",
        letterSpacing: "6px",
        textShadow: "0 0 20px rgba(255,255,255,0.8)",
        fontFamily: "Orbitron, sans-serif"
      }}
    >
      RAPYARD
    </div>
  );
}
