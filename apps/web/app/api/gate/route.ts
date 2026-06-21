import { createServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { phase } = await req.json();
  const supabase = createServer();

  await supabase.from("gate_state").update({ phase }).eq("id", "YOUR_GATE_ID");

  return NextResponse.json({ ok: true });
}