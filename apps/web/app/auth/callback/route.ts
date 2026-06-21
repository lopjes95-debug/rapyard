import { NextResponse } from "next/server";
import { createServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServer();
  await supabase.auth.exchangeCodeForSession();
  return NextResponse.redirect("/dashboard");
}
