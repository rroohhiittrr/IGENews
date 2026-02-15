"use client";

import { mockArticles } from "@/lib/mockData";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import AboutNews from "@/components/about-news/AboutNews";
import NewsCard from "@/components/news-feed/NewsCard";

export default function MyNewsPage() {
  const articles = mockArticles.slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
          My News
        </h1>
        <p className="text-[var(--color-neutral-dark)] mt-2">
          Your personalized news dashboard and saved articles.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 hidden lg:block space-y-4">
          <NavigationPanel />
          <AboutNews />
        </div>

        <div className="col-span-12 lg:col-span-9 min-w-0">
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">Latest for You</h2>
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} variant="list" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
