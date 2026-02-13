"use client";

import { mockArticles, trendingArticles, mostDiscussedArticles } from "@/lib/mockData";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import AboutNews from "@/components/about-news/AboutNews";
import NewsFeedSection from "@/components/news-feed/NewsFeedSection";
import RightSidebar from "@/components/right-sidebar/RightSidebar";

export default function FeedPage() {
  const feedArticles = mockArticles;
  const spotlightArticle = feedArticles[0];
  const topNewsArticles = feedArticles.slice(0, 5);
  const highlightArticles = feedArticles.slice(2, 7);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      {/* 3-Column Layout */}
      <div className="flex gap-6">
        {/* LEFT PANEL — Navigation + About News */}
        <div className="w-[220px] shrink-0 hidden lg:block space-y-4">
          <NavigationPanel />
          <AboutNews />
        </div>

        {/* CENTER — News Feed Section (8) */}
        <div className="flex-1 min-w-0">
          <NewsFeedSection articles={feedArticles} />
        </div>

        {/* RIGHT SIDEBAR (9) */}
        <div className="w-[300px] shrink-0">
          <RightSidebar
            spotlightArticle={spotlightArticle}
            topNewsArticles={topNewsArticles}
            highlightArticles={highlightArticles}
            trendingArticles={trendingArticles}
            mostDiscussedArticles={mostDiscussedArticles}
          />
        </div>
      </div>
    </div>
  );
}
