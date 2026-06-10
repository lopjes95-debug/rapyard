export default function FogLayer({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.15), transparent 70%)",
        filter: "blur(40px)",
        opacity: 0.4
      }}
    />
  );
}
