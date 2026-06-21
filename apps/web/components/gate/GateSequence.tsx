"use client";

import { useEffect, useState } from "react";

export default function GateSequence() {
  const [phase, setPhase] = useState("closed");

  useEffect(() => {
    setTimeout(() => setPhase("opening"), 1200);
    setTimeout(() => setPhase("zoom"), 2600);
    setTimeout(() => setPhase("done"), 3800);
  }, []);

  if (phase === "closed")
    return <img src="/cinematic/gate/gate_closed.jpg" className="gate-img" />;

  if (phase === "opening")
    return <img src="/cinematic/gate/gate_opening.jpg" className="gate-img" />;

  if (phase === "zoom")
    return <img src="/cinematic/gate/gate_zoom.jpg" className="gate-img zoom" />;

  return null; // reveal homepage
}
