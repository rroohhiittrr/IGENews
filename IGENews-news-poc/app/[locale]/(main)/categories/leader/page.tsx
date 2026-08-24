"use client";

import { mockArticles, trendingArticles, mostDiscussedArticles } from "@/lib/mockData";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import AboutNews from "@/components/about-news/AboutNews";
import NewsFeedSection from "@/components/news-feed/NewsFeedSection";
import RightSidebar from "@/components/right-sidebar/RightSidebar";
import MobileFeedView from "@/components/mobile/MobileFeedView";

export default function LeaderCategoryPage() {
  // Filter articles by leader
  const leaderArticles = mockArticles.filter((a) => a.leaderDesignation);
  const spotlightArticle = leaderArticles[0];
  const topNewsArticles = leaderArticles.slice(0, 5);
  const highlightArticles = leaderArticles.slice(2, 7);

  return (
    <>
      {/* =================== MOBILE VIEW =================== */}
      <MobileFeedView
        articles={leaderArticles}
        trendingArticles={trendingArticles}
        mostDiscussedArticles={mostDiscussedArticles}
      />

      {/* =================== DESKTOP VIEW =================== */}
      <div className="hidden md:block mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            Leader News
          </h1>
          <p className="text-[var(--color-neutral-dark)] mt-2">
            Leadership insights and updates from key business and political figures
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
            <NewsFeedSection articles={leaderArticles} hideTabs={true} />
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
