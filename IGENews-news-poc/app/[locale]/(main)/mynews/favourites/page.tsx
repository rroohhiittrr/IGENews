"use client";

import { mockArticles } from "@/lib/mockData";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import AboutNews from "@/components/about-news/AboutNews";

export default function MyNewsFavouritesPage() {
  const articles = mockArticles.slice(0, 3); // Mocking user data

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
          ⭐ My Favourites
        </h1>
        <p className="text-[var(--color-neutral-dark)] mt-2">
          Articles you've marked as favourites.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 hidden lg:block space-y-4">
          <NavigationPanel />
          <AboutNews />
        </div>

        <div className="col-span-12 lg:col-span-9 min-w-0">
          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">{article.title}</h3>
                  <p className="text-sm text-[var(--color-neutral-dark)] mb-3">{article.summary}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center text-[var(--color-neutral-dark)]">
              No favourites yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
