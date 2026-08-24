"use client";

import Link from "next/link";

export default function EOIButton() {
  return (
    <Link
      href="/eoi"
      id="eoi-header-btn"
      className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 shadow-sm"
      style={{
        background: "linear-gradient(135deg, #E63946 0%, #c0392b 100%)",
        color: "#ffffff",
        boxShadow: "0 2px 12px rgba(230, 57, 70, 0.35)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 18px rgba(230, 57, 70, 0.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(230, 57, 70, 0.35)";
      }}
    >
      <span className="text-sm">📋</span>
      <span className="whitespace-nowrap">EOI Form</span>
    </Link>
  );
}
