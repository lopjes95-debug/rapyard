import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RapYard",
  description: "Creators build the yard. Listeners move the yard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}