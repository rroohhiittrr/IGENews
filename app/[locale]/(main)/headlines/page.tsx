"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { mockArticles, trendingArticles, mostDiscussedArticles } from "@/lib/mockData";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import AboutNews from "@/components/about-news/AboutNews";
import NewsFeedSection from "@/components/news-feed/NewsFeedSection";
import RightSidebar from "@/components/right-sidebar/RightSidebar";
import MobileFeedView from "@/components/mobile/MobileFeedView";

type TabType = "sector" | "country" | "leader";

// Inner component that safely uses useSearchParams (must be inside Suspense)
function HeadlinesContent() {
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as TabType) || "sector";

  // Filter articles based on the tab query parameter
  const getFilteredArticles = () => {
    switch (activeTab) {
      case "sector":
        return mockArticles.filter((a) => a.sector);
      case "country":
        return mockArticles.filter((a) => a.country);
      case "leader":
        return mockArticles.filter((a) => a.leaderDesignation);
      default:
        return mockArticles;
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
        return "Sector Headlines";
      case "country":
        return "Country Headlines";
      case "leader":
        return "Leader Headlines";
      default:
        return "Headlines";
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case "sector":
        return "Top breaking news from various business sectors";
      case "country":
        return "Major bilateral trade and country-specific updates";
      case "leader":
        return "Key developments and statements from business and political leaders";
      default:
        return "Top breaking news and major stories from around the world";
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
            <NewsFeedSection articles={filteredArticles} />
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

// Page wrapper — required Suspense boundary for useSearchParams
export default function HeadlinesPage() {
  return (
    <Suspense fallback={null}>
      <HeadlinesContent />
    </Suspense>
  );
}
