"use client";

import Link from "next/link";

export default function NewsPOCButton() {
  return (
    <Link
      href="/news-poc"
      id="news-poc-header-btn"
      className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 shadow-sm"
      style={{
        background: "linear-gradient(135deg, #1D1D46 0%, #0642BA 100%)",
        color: "#ffffff",
        boxShadow: "0 2px 12px rgba(30, 58, 95, 0.35)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 18px rgba(30, 58, 95, 0.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(30, 58, 95, 0.35)";
      }}
    >
      <span className="text-sm">📰</span>
      <span className="whitespace-nowrap">News POC</span>
    </Link>
  );
}
