import http from "http";
import { supabase } from "supabase/client";

const server = http.createServer(async (_, res) => {
  const { data, error } = await supabase.from("users").select("*").limit(1);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: true, data, error }));
});

server.listen(4000, () => console.log("API running on :4000"));
