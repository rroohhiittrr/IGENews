"use client";

import { mockArticles, trendingArticles, mostDiscussedArticles } from "@/lib/mockData";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import AboutNews from "@/components/about-news/AboutNews";
import NewsFeedSection from "@/components/news-feed/NewsFeedSection";
import RightSidebar from "@/components/right-sidebar/RightSidebar";
import MobileFeedView from "@/components/mobile/MobileFeedView";

export default function HeadlinesSectorPage() {
  const sectorArticles = mockArticles.filter((a) => a.sector);
  const spotlightArticle = sectorArticles[0];
  const topNewsArticles = sectorArticles.slice(0, 5);
  const highlightArticles = sectorArticles.slice(2, 7);

  return (
    <>
      <MobileFeedView
        articles={sectorArticles}
        trendingArticles={trendingArticles}
        mostDiscussedArticles={mostDiscussedArticles}
      />

      <div className="hidden md:block mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            Sector Headlines
          </h1>
          <p className="text-[var(--color-neutral-dark)] mt-2">
            Top breaking news from various business sectors.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 hidden lg:block space-y-4">
            <NavigationPanel />
            <AboutNews />
          </div>

          <div className="col-span-12 lg:col-span-6 min-w-0">
            <NewsFeedSection articles={sectorArticles} hideTabs={true} />
          </div>

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
