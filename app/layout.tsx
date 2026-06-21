export const metadata = {
  title: "RapYard — The Forge Is Burning",
  description: "Every legend starts as a spark."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
