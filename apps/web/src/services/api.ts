export async function login(email: string, password: string) {
  try {
    // Call Cloudflare Worker that queries D1
    const response = await fetch("https://your-worker.yard.workers.dev/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      // Optional: trigger AWS SES email notification
      await fetch("https://your-api.aws/send-login-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
    }

    return data;
  } catch (err) {
    console.error("Login error:", err);
    return { success: false };
  }
}
