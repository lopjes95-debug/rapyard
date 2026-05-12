export const metadata = {
  title: "RapYard Governance Portal",
  description: "Governance Portal Lite"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        background: "#111",
        color: "#eee",
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: 0
      }}>
        <nav style={{
          padding: "20px",
          borderBottom: "1px solid #333",
          display: "flex",
          gap: "20px"
        }}>
          <a href="/">Home</a>
          <a href="/proposals">Proposals</a>
          <a href="/voting">Voting</a>
          <a href="/constitution">Constitution</a>
        </nav>
        <main style={{ padding: "40px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
