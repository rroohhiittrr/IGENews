"use client";

import { useState, useEffect } from "react";
import MobileHeader, { NewsViewType } from "@/components/mobile/MobileHeader";
import MobileNewsCard from "@/components/mobile/MobileNewsCard";
import { Article } from "@/types/types";

interface MobileFeedViewProps {
  articles: Article[];
  trendingArticles: Article[];
  mostDiscussedArticles: Article[];
}

export default function MobileFeedView({
  articles,
  trendingArticles,
  mostDiscussedArticles,
}: MobileFeedViewProps) {
  const [activeView, setActiveView] = useState<NewsViewType>("top");

  // Scroll to top whenever the view tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeView]);

  // Sort/filter articles based on active view
  const getFilteredArticles = (): Article[] => {
    switch (activeView) {
      case "top":
        return [...articles].sort((a, b) => b.likeCount - a.likeCount);
      case "trending":
        return trendingArticles.length > 0 ? trendingArticles : articles;
      case "headlines":
        return articles;
      case "discussed":
        return mostDiscussedArticles.length > 0 ? mostDiscussedArticles : articles;
      default:
        return articles;
    }
  };

  const filteredArticles = getFilteredArticles();

  return (
    <div className="md:hidden">
      <MobileHeader activeView={activeView} onViewChange={setActiveView} />

      {filteredArticles.length > 0 ? (
        <div id="mobile-feed" className="pb-28">
          {filteredArticles.map((article) => (
            <MobileNewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
          <span className="text-4xl mb-3">📭</span>
          <p className="text-sm font-semibold text-[var(--color-text-body)]">No articles found</p>
          <p className="text-xs text-[var(--color-neutral-dark)] mt-1">Try a different filter above</p>
        </div>
      )}
    </div>
  );
}
