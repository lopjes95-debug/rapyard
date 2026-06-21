import "./globals.css";
import GateSequence from "@/components/gate/GateSequence";
import { createServer } from "@/lib/supabase/server";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServer();
  const { data: gate } = await supabase
    .from("gate_state")
    .select("phase")
    .single();

  const showGate = gate?.phase === "closed";

  return (
    <html lang="en">
      <body>
        {showGate ? <GateSequence /> : children}
      </body>
    </html>
  );
}
