"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Heart, Clock, Share2, History, Award, Sparkles, ChevronRight, Search, Filter } from "lucide-react";
import Link from "next/link";
import { mockArticles } from "@/lib/mockData";

type TabId = "saved" | "liked" | "read-later" | "history" | "sme-articles" | "recommended";

const TABS: { id: TabId; label: string; icon: any; count?: number }[] = [
  { id: "saved",        label: "Saved",           icon: Bookmark,  count: 124 },
  { id: "liked",        label: "Liked",           icon: Heart,     count: 856 },
  { id: "read-later",   label: "Read Later",      icon: Clock,     count: 15 },
  { id: "history",      label: "Recently Viewed", icon: History },
  { id: "sme-articles", label: "SME Articles",    icon: Award },
  { id: "recommended",  label: "Recommended",     icon: Sparkles },
];

function getArticles(tab: TabId) {
  switch (tab) {
    case "liked":        return mockArticles.slice(3, 6);
    case "history":      return mockArticles.slice(2, 5);
    case "sme-articles": return mockArticles.slice(1, 4);
    case "recommended":  return mockArticles.slice(4, 7);
    case "read-later":   return mockArticles.slice(5, 8);
    default:             return mockArticles.slice(0, 3);
  }
}

export default function MyNewsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("saved");
  const [search, setSearch] = useState("");

  const articles = getArticles(activeTab).filter(a =>
    !search || a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1D1D46]" style={{ fontFamily: "var(--font-display)" }}>My News</h1>
          <p className="text-sm text-gray-500 mt-1">Your saved, liked, and personalised news activity</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="pl-11 pr-4 py-2.5 rounded-full bg-white shadow-sm text-sm w-full border-none focus:outline-none focus:ring-2 focus:ring-[#F0652E] transition-all"
          />
        </div>
      </div>

      {/* Tab Bar */}
      <div className="overflow-x-auto hide-scrollbar mb-8">
        <div className="flex gap-3 w-max">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#1D1D46] text-white shadow-lg"
                  : "bg-white text-gray-500 hover:text-[#1D1D46] hover:shadow-md shadow-sm"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-[#F0652E]" : ""}`} />
              {tab.label}
              {tab.count && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-black ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-[#f4f7fb] text-[#1D1D46]"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {articles.length > 0 ? articles.map(article => (
            <div key={article.id} className="group relative bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="h-48 overflow-hidden relative">
                <img src={article.heroImage} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-3 right-3 bg-white/95 px-3 py-1 rounded-xl text-xs font-bold text-[#1D1D46] shadow">
                  {article.sector?.name || article.tags?.[0] || "News"}
                </div>
                {activeTab === "sme-articles" && (
                  <div className="absolute top-3 left-3 bg-[#F0652E] text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow">
                    SME
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#1D1D46] text-base line-clamp-2 leading-snug group-hover:text-[#F0652E] transition-colors mb-3">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5" />{article.readTime}
                  </span>
                  <div className="flex gap-3">
                    <button className="hover:text-[#F0652E] transition-colors"><Share2 className="w-4 h-4" /></button>
                    <button className="hover:text-[#F0652E] transition-colors"><Bookmark className={`w-4 h-4 ${activeTab === "saved" ? "fill-[#F0652E] text-[#F0652E]" : ""}`} /></button>
                  </div>
                </div>
              </div>
              <Link href={`/news/${article.id}`} className="absolute inset-0 z-10" />
            </div>
          )) : (
            <div className="col-span-3 py-20 text-center">
              <p className="text-gray-400 text-sm font-medium">No articles found{search ? ` for "${search}"` : ""}.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
