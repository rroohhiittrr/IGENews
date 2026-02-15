"use client";

import { useState } from "react";
import { FeedTab, Article } from "@/types/types";
import SubTabBar from "./SubTabBar";
import NewsCard from "./NewsCard";

interface NewsFeedSectionProps {
  articles: Article[];
  hideTabs?: boolean;
}

export default function NewsFeedSection({ articles, hideTabs = false }: NewsFeedSectionProps) {
  const [activeTab, setActiveTab] = useState<FeedTab>("sector");
  const mainArticles = articles;

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
          📰 News Feed
        </h2>
      </div>

      {/* Sub-Tab Bar */}
      {!hideTabs && <SubTabBar activeTab={activeTab} onTabChange={setActiveTab} prefix="" />}

      {/* "You are missing out" block */}
      <div className="rounded-xl border border-dashed border-[var(--color-accent-gold)]/40 bg-[var(--color-accent-gold-light)] p-4 text-center">
        <p className="text-sm font-medium text-[var(--color-accent-gold-dark)]">
          🔓 You are missing out on <strong>18 more sectors</strong> of news
        </p>
        <button className="mt-2 rounded-full bg-[var(--color-accent-gold)] px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[var(--color-accent-gold-dark)] hover:shadow-md">
          Upgrade Now
        </button>
      </div>

      {/* Main News Cards */}
      <div className="space-y-5">
        {mainArticles.map((article) => (
          <NewsCard key={article.id} article={article} variant="list" />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center py-6">
        <button className="rounded-full border border-[var(--color-neutral-mid)] px-6 py-2.5 text-sm font-medium text-[var(--color-neutral-dark)] transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-sm">
          Load More Articles
        </button>
      </div>
    </div>
  );
}
