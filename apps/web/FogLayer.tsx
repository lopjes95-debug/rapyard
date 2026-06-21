export default function FogLayer({
  className = ""
}: {
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
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