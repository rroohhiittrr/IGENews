"use client";

import { useSearchParams } from "next/navigation";
import { mockArticles, trendingArticles, mostDiscussedArticles } from "@/lib/mockData";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import AboutNews from "@/components/about-news/AboutNews";
import NewsFeedSection from "@/components/news-feed/NewsFeedSection";
import RightSidebar from "@/components/right-sidebar/RightSidebar";
import MobileFeedView from "@/components/mobile/MobileFeedView";

type TabType = "sector" | "country" | "leader";

export default function TrendingPage() {
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as TabType) || "sector";

  // Filter articles based on the tab query parameter and trending status
  const getFilteredArticles = () => {
    const trendingOnly = mockArticles.filter((a) => a.isTrending);
    switch (activeTab) {
      case "sector":
        return trendingOnly.filter((a) => a.sector);
      case "country":
        return trendingOnly.filter((a) => a.country);
      case "leader":
        return trendingOnly.filter((a) => a.leader);
      default:
        return trendingOnly;
    }
  };

  const filteredArticles = getFilteredArticles();
  const spotlightArticle = filteredArticles[0];
  const topNewsArticles = filteredArticles.slice(0, 5);
  const highlightArticles = filteredArticles.slice(2, 7);

  // Get title based on active tab
  const getTabTitle = () => {
    switch (activeTab) {
      case "sector":
        return "🔥 Trending Sector News";
      case "country":
        return "🔥 Trending Country News";
      case "leader":
        return "🔥 Trending Leader News";
      default:
        return "🔥 Trending News";
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case "sector":
        return "Most popular stories and trending topics in various business sectors";
      case "country":
        return "Trending bilateral trade news and country-specific developments";
      case "leader":
        return "Trending updates from key business and political leaders";
      default:
        return "Most popular stories and trending topics across all categories";
    }
  };

  return (
    <>
      {/* =================== MOBILE VIEW =================== */}
      <MobileFeedView
        articles={filteredArticles}
        trendingArticles={trendingArticles}
        mostDiscussedArticles={mostDiscussedArticles}
      />

      {/* =================== DESKTOP VIEW =================== */}
      <div className="hidden md:block mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            {getTabTitle()}
          </h1>
          <p className="text-[var(--color-neutral-dark)] mt-2">
            {getTabDescription()}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Navigation */}
          <div className="col-span-3 hidden lg:block space-y-4">
            <NavigationPanel />
            <AboutNews />
          </div>

          {/* CENTER — News Feed */}
          <div className="col-span-12 lg:col-span-6 min-w-0">
            {filteredArticles.length > 0 ? (
              <NewsFeedSection articles={filteredArticles} />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-[var(--color-neutral-dark)]">
                  No trending articles found for this category.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-span-3 hidden xl:block">
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
    </>
  );
}
