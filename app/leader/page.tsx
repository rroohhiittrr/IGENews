"use client";

import MobileHeader, { NewsViewType } from "@/components/mobile/MobileHeader";
import MobileNewsCard from "@/components/mobile/MobileNewsCard";
import { mockArticles } from "@/lib/mockData";
import { useState } from "react";

export default function LeaderNewsPage() {
  const [activeView, setActiveView] = useState<NewsViewType>("top");

  // Filter articles that have leader designation data
  const leaderArticles = mockArticles.filter((a) => a.leaderDesignation);

  const getSortedArticles = () => {
    switch (activeView) {
      case "top":
        return [...leaderArticles].sort((a, b) => b.likeCount - a.likeCount);
      case "trending":
        return leaderArticles.filter((a) => a.isTrending);
      case "discussed":
        return [...leaderArticles].sort((a, b) => b.commentCount - a.commentCount);
      default:
        return leaderArticles;
    }
  };

  const articles = getSortedArticles();

  return (
    <div className="min-h-screen pb-24">
      {/* Mobile */}
      <div className="md:hidden">
        <MobileHeader activeView={activeView} onViewChange={setActiveView} />
        <div className="bg-purple-50 px-4 py-2">
          <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-wider">
            👤 Leader News — CEO, CTO, CFO & More
          </span>
        </div>
        {articles.length > 0 ? (
          articles.map((a) => <MobileNewsCard key={a.id} article={a} />)
        ) : (
          <div className="px-4 py-12 text-center text-sm text-[var(--color-neutral-dark)]">
            No leader news for this filter.
          </div>
        )}
      </div>

      {/* Desktop placeholder */}
      <div className="hidden md:block max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>Leader News</h1>
        <p className="text-[var(--color-neutral-dark)] mt-2">This page is optimized for mobile view.</p>
      </div>
    </div>
  );
}
