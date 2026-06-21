export default function GridLayer({
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
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        opacity: 0.25,
        pointerEvents: "none",
        transform: "perspective(1000px) rotateX(75deg) scale(2)",
        transformOrigin: "center bottom"
      }}
    />
  );
}