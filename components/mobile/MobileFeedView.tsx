"use client";

import { useState } from "react";
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
      <div className="pb-20">
        {filteredArticles.map((article) => (
          <MobileNewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
