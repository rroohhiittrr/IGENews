import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "India Global News — B2B Trade Intelligence",
  description:
    "India Global News delivers curated sector, country and leader news for international trade professionals.",
  keywords: [
    "India trade news",
    "B2B trade intelligence",
    "export import news",
    "sector analysis",
    "bilateral trade",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-[var(--background)] text-[var(--color-text-body)] antialiased"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
