"use client";

import Link from "next/link";

export default function POCV2Button() {
  return (
    <Link
      href="/poc-v2"
      id="poc-v2-header-btn"
      className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 shadow-sm"
      style={{
        background: "linear-gradient(135deg, #2D1B69 0%, #7928CA 100%)",
        color: "#ffffff",
        boxShadow: "0 2px 12px rgba(121, 40, 202, 0.35)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 18px rgba(121, 40, 202, 0.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(121, 40, 202, 0.35)";
      }}
    >
      <span className="text-sm">✨</span>
      <span className="whitespace-nowrap">POC V2</span>
    </Link>
  );
}
