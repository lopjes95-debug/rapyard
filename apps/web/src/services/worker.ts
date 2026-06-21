export default {
  async fetch(request: Request, env: any) {
    if (request.method === "POST" && new URL(request.url).pathname === "/login") {
      const { email, password } = await request.json();

      // Query D1 users table
      const stmt = env.DB.prepare("SELECT * FROM users WHERE email = ? AND password = ?");
      const user = await stmt.bind(email, password).first();

      if (user) {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ success: false }), { status: 401 });
      }
    }

    return new Response("Not found", { status: 404 });
  }
};
