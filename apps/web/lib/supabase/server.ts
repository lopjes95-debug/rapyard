import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const createServer = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { cookies }
  );
