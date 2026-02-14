"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Heart, Clock, ChevronRight, Share2 } from "lucide-react";
import Link from "next/link";
import { mockArticles } from "@/lib/mockData";

export default function MyNewsSection() {
  const [activeTab, setActiveTab] = useState<"bookmarks" | "likes" | "history">("bookmarks");

  // Mock data derived from existing mock articles
  const savedArticles = mockArticles.slice(0, 3);
  const likedArticles = mockArticles.slice(3, 6);
  const historyArticles = mockArticles.slice(2, 5);

  const tabs = [
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
    { id: "likes", label: "Liked", icon: Heart },
    { id: "history", label: "Read History", icon: Clock },
  ];

  const getActiveArticles = () => {
    switch (activeTab) {
      case "likes": return likedArticles;
      case "history": return historyArticles;
      default: return savedArticles;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-3xl bg-white p-6 shadow-xl border border-[var(--color-neutral-light)] mt-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
          My News Activity
        </h2>
        
        {/* Tabs */}
        <div className="flex bg-[var(--color-neutral-light)]/30 p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id 
                  ? "bg-white text-[var(--color-primary)] shadow-sm" 
                  : "text-[var(--color-neutral-dark)] hover:text-[var(--color-primary)]"
              }`}
            >
              <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {getActiveArticles().map((article) => (
              <div 
                key={article.id} 
                className="group relative flex flex-col rounded-2xl border border-[var(--color-neutral-light)] overflow-hidden hover:shadow-xl hover:border-[var(--color-primary)]/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="h-40 w-full overflow-hidden relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-[var(--color-primary)]">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-[var(--color-primary)] mb-2 line-clamp-2 leading-snug group-hover:text-[var(--color-secondary)] transition-colors">
                    {article.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between text-xs text-[var(--color-neutral-dark)] pt-3 border-t border-[var(--color-neutral-light)]/50">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="hover:text-[var(--color-secondary)]"><Share2 className="h-4 w-4" /></button>
                      <button className="hover:text-[var(--color-secondary)]"><Bookmark className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
                
                <Link href={`/news/${article.id}`} className="absolute inset-0 z-10" />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 text-center">
        <Link 
          href="/my-news" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors py-2 px-4 rounded-lg hover:bg-[var(--color-neutral-light)]/30"
        >
          View All {activeTab === 'history' ? 'History' : activeTab === 'likes' ? 'Likes' : 'Bookmarks'}
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
