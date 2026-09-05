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
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
            Executive Intelligence Stream
          </h2>
        </div>
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
          Live B2B Feed
        </span>
      </div>

      {/* Sub-Tab Bar */}
      {!hideTabs && <SubTabBar activeTab={activeTab} onTabChange={setActiveTab} prefix="" />}

      {/* Sector Coverage Intelligence Ribbon */}
      <div className="rounded-2xl border border-amber-200/80 dark:border-amber-900/40 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-4 text-center">
        <p className="text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-300">
          ⚡ <strong>Expand Trade Coverage:</strong> 18 additional GDP sector corridors available for verified enterprise profiles.
        </p>
      </div>

      {/* Main News Cards */}
      <div className="space-y-5">
        {mainArticles.map((article) => (
          <NewsCard key={article.id} article={article} variant="list" />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center py-6">
        <button className="rounded-xl border border-slate-200 dark:border-slate-700 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 shadow-2xs">
          Load Additional Intelligence Briefs
        </button>
      </div>
    </div>
  );
}
