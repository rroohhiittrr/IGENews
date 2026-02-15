"use client";

import { mockArticles, trendingArticles, mostDiscussedArticles } from "@/lib/mockData";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import AboutNews from "@/components/about-news/AboutNews";
import NewsFeedSection from "@/components/news-feed/NewsFeedSection";
import RightSidebar from "@/components/right-sidebar/RightSidebar";
import MobileFeedView from "@/components/mobile/MobileFeedView";

export default function TrendingCountryPage() {
  const trendingCountryArticles = mockArticles.filter((a) => a.isTrending && a.country);
  const spotlightArticle = trendingCountryArticles[0];
  const topNewsArticles = trendingCountryArticles.slice(0, 5);
  const highlightArticles = trendingCountryArticles.slice(2, 7);

  return (
    <>
      <MobileFeedView
        articles={trendingCountryArticles}
        trendingArticles={trendingArticles}
        mostDiscussedArticles={mostDiscussedArticles}
      />

      <div className="hidden md:block mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            🔥 Trending Country News
          </h1>
          <p className="text-[var(--color-neutral-dark)] mt-2">
            Trending bilateral trade news and country-specific developments.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 hidden lg:block space-y-4">
            <NavigationPanel />
            <AboutNews />
          </div>

          <div className="col-span-12 lg:col-span-6 min-w-0">
            {trendingCountryArticles.length > 0 ? (
              <NewsFeedSection articles={trendingCountryArticles} hideTabs={true} />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-[var(--color-neutral-dark)]">
                  No trending country news at the moment.
                </p>
              </div>
            )}
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
