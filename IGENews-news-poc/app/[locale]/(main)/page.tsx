"use client";

import { mockArticles, trendingArticles, mostDiscussedArticles } from "@/lib/mockData";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import AboutNews from "@/components/about-news/AboutNews";
import NewsFeedSection from "@/components/news-feed/NewsFeedSection";
import RightSidebar from "@/components/right-sidebar/RightSidebar";
import MobileFeedView from "@/components/mobile/MobileFeedView";

export default function FeedPage() {
  const feedArticles = mockArticles;
  const spotlightArticle = feedArticles[0];
  const topNewsArticles = feedArticles.slice(0, 5);
  const highlightArticles = feedArticles.slice(2, 7);

  return (
    <>
      {/* =================== MOBILE VIEW =================== */}
      <MobileFeedView
        articles={feedArticles}
        trendingArticles={trendingArticles}
        mostDiscussedArticles={mostDiscussedArticles}
      />

      {/* =================== DESKTOP VIEW =================== */}
      <div className="hidden md:block mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Navigation */}
          <div className="col-span-3 hidden lg:block space-y-4">
            <NavigationPanel />
            <AboutNews />
          </div>

          {/* CENTER — News Feed */}
          <div className="col-span-12 lg:col-span-6 min-w-0">
            <NewsFeedSection articles={feedArticles} />
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
