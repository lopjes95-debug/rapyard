// app/yardgate/page.tsx
const cinematic = [
  { title: "The YardGate", subtitle: "The industrial entrance to the RapYard universe." },
  { title: "Cinematic vs Iconic", subtitle: "A mythic world built with gritty realism." },
  { title: "Gate Opens", subtitle: "Light floods in. The arena wakes." },
  { title: "The Cypher Pit", subtitle: "Where rappers sharpen steel with steel." },
  { title: "Beat Stations", subtitle: "Producers crafting heat and flipping samples." },
  { title: "Workshop Zone", subtitle: "Creators refining tapes and leveling up." },
  { title: "The Yard Revealed", subtitle: "A full industrial arena of creators and fans." },
  { title: "The RapYard System", subtitle: "Battles, Cyphers, Mixtapes, Producers, Royalties." },
];

export default function YardGatePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Top glow bar */}
      <div className="h-1 w-full bg-gradient-to-r from-yellow-400/0 via-yellow-400/60 to-yellow-400/0" />

      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 lg:flex lg:gap-16">
        {/* Left: Hero */}
        <section className="flex-1">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
            Enter the Yard
          </p>

          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
            The <span className="text-yellow-400">YardGate</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200/90 mb-8 max-w-xl">
            A cinematic universe built for creators—gritty, industrial, alive with energy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="/onboarding/choose-lane"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-yellow-400 text-black font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:brightness-110 transition"
            >
              Choose Your Lane
            </a>

            <a
              href="/signin"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-700 text-gray-300 text-sm hover:border-gray-500 hover:text-white transition"
            >
              Already in the Yard — Sign In
            </a>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            Battles • Cyphers • Mixtapes • Producers • Royalties
          </p>
        </section>

        {/* Right: Cinematic cards */}
        <section className="flex-1 mt-12 lg:mt-0">
          <div className="space-y-4">
            {cinematic.map((item, index) => (
              <div
                key={item.title}
                className="bg-[#0b0b0b] border border-[#262626] rounded-2xl p-5 md:p-6 shadow-[0_18px_45px_rgba(0,0,0,0.7)] relative overflow-hidden group"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-yellow-400/80 via-yellow-400/0 to-yellow-400/0 opacity-60" />
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-yellow-400/5 blur-3xl group-hover:bg-yellow-400/10 transition" />

                <div className="flex items-start gap-3">
                  <span className="text-[11px] mt-1 text-gray-500 uppercase tracking-[0.25em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-xl md:text-2xl font-extrabold mb-1">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-300/90">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
