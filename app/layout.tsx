import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import TopHeader from "@/components/header/TopHeader";
import MegaMenu from "@/components/mega-menu/MegaMenu";
import BreakingNewsTicker from "@/components/layout/BreakingNewsTicker";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";

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
      <body className="bg-[var(--background)] text-[var(--color-text-body)] antialiased" style={{ fontFamily: "var(--font-body)" }}>
        <TopHeader />
        <Suspense fallback={null}>
          <MegaMenu />
        </Suspense>
        <BreakingNewsTicker />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileNavBar />
      </body>
    </html>
  );
}
