import { useEffect } from "react";

const narrativeBeats = [
  "The YardGate stands silent… waiting.",
  "A world built from steel, smoke, and sound.",
  "The gate opens. Light floods the arena.",
  "Voices rise. Sparks fly. The Cypher Pit awakens.",
  "Producers craft heat in the Beat Stations.",
  "Creators sharpen their craft in the Workshop Zone.",
  "The Yard reveals itself — alive, industrial, mythic.",
  "Welcome to the RapYard System."
];

export function useNarrativeEngine(activeIndex: number) {
  useEffect(() => {
    const text = document.querySelector(".narrative-text") as HTMLElement | null;
    if (!text) return;

    text.style.opacity = "0";
    text.style.transform = "translateY(20px)";

    setTimeout(() => {
      text.innerText = narrativeBeats[activeIndex] || "";
      text.style.opacity = "1";
      text.style.transform = "translateY(0)";
    }, 200);
  }, [activeIndex]);
}
