"use client";

import { mockArticles, trendingArticles, mostDiscussedArticles } from "@/lib/mockData";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import AboutNews from "@/components/about-news/AboutNews";
import NewsFeedSection from "@/components/news-feed/NewsFeedSection";
import RightSidebar from "@/components/right-sidebar/RightSidebar";
import MobileFeedView from "@/components/mobile/MobileFeedView";

export default function FeedCountryPage() {
  const countryArticles = mockArticles.filter((a) => a.country);
  const spotlightArticle = countryArticles[0];
  const topNewsArticles = countryArticles.slice(0, 5);
  const highlightArticles = countryArticles.slice(2, 7);

  return (
    <>
      <MobileFeedView
        articles={countryArticles}
        trendingArticles={trendingArticles}
        mostDiscussedArticles={mostDiscussedArticles}
      />

      <div className="hidden md:block mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            Country News Feed
          </h1>
          <p className="text-[var(--color-neutral-dark)] mt-2">
            Bilateral trade intelligence and country-specific business updates.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 hidden lg:block space-y-4">
            <NavigationPanel />
            <AboutNews />
          </div>

          <div className="col-span-12 lg:col-span-6 min-w-0">
            <NewsFeedSection articles={countryArticles} hideTabs={true} />
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
