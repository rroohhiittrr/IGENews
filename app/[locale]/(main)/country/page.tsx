"use client";

import MobileHeader, { NewsViewType } from "@/components/mobile/MobileHeader";
import MobileNewsCard from "@/components/mobile/MobileNewsCard";
import { mockArticles } from "@/lib/mockData";
import { useState } from "react";

export default function CountryNewsPage() {
  const [activeView, setActiveView] = useState<NewsViewType>("top");

  // Filter articles that have country data
  const countryArticles = mockArticles.filter((a) => a.country);

  const getSortedArticles = () => {
    switch (activeView) {
      case "top":
        return [...countryArticles].sort((a, b) => b.likeCount - a.likeCount);
      case "trending":
        return countryArticles.filter((a) => a.isTrending);
      case "discussed":
        return [...countryArticles].sort((a, b) => b.commentCount - a.commentCount);
      default:
        return countryArticles;
    }
  };

  const articles = getSortedArticles();

  return (
    <div className="min-h-screen pb-28">
      {/* Mobile */}
      <div className="md:hidden">
        <MobileHeader activeView={activeView} onViewChange={setActiveView} />
        <div className="bg-[var(--color-secondary)]/5 px-4 py-2">
          <span className="text-[11px] font-semibold text-[var(--color-secondary)] uppercase tracking-wider">
            🌍 Country News — Bilateral Trade Intelligence
          </span>
        </div>
        {articles.length > 0 ? (
          articles.map((a) => <MobileNewsCard key={a.id} article={a} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
            <span className="text-4xl mb-3">🌍</span>
            <p className="text-sm font-semibold text-[var(--color-text-body)]">No country news</p>
            <p className="text-xs text-[var(--color-neutral-dark)] mt-1">Try a different filter above</p>
          </div>
        )}
      </div>

      {/* Desktop placeholder */}
      <div className="hidden md:block max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>Country News</h1>
        <p className="text-[var(--color-neutral-dark)] mt-2">This page is optimized for mobile view.</p>
      </div>
    </div>
  );
}
