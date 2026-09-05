import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IGENews — India Global Expo News | B2B Trade Intelligence",
  description:
    "IGENews delivers curated sector, country and leader news for international trade professionals.",
  keywords: [
    "India trade news",
    "B2B trade intelligence",
    "export import news",
    "sector analysis",
    "bilateral trade",
  ],
  icons: {
    icon: "/images/favicon_IGENews.svg",
    apple: "/images/favicon_IGENews.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-[var(--background)] text-[var(--color-text-body)] antialiased"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </body>
    </html>
  );
}
