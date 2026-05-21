"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Heart, Clock, ChevronRight, Share2, History, Award, Sparkles } from "lucide-react";
import Link from "next/link";
import { mockArticles } from "@/lib/mockData";

type TabId = "saved" | "liked" | "read-later" | "history" | "sme-articles" | "recommended";

export default function MyNewsSection() {
  const [activeTab, setActiveTab] = useState<TabId>("saved");

  const savedArticles = mockArticles.slice(0, 3);
  const likedArticles = mockArticles.slice(3, 6);
  const historyArticles = mockArticles.slice(2, 5);
  const smeArticles = mockArticles.slice(1, 4);
  const recommendedArticles = mockArticles.slice(4, 7);
  const readLaterArticles = mockArticles.slice(5, 8);

  const tabs: { id: TabId; label: string; icon: any }[] = [
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "liked", label: "Liked", icon: Heart },
    { id: "read-later", label: "Read Later", icon: Clock },
    { id: "history", label: "Recently Viewed", icon: History },
    { id: "sme-articles", label: "SME Articles", icon: Award },
    { id: "recommended", label: "Recommended", icon: Sparkles },
  ];

  const getActiveArticles = () => {
    switch (activeTab) {
      case "liked": return likedArticles;
      case "history": return historyArticles;
      case "sme-articles": return smeArticles;
      case "recommended": return recommendedArticles;
      case "read-later": return readLaterArticles;
      default: return savedArticles;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-[32px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
        <h2 className="text-2xl font-bold text-[#1E3A5F] whitespace-nowrap">
          News Hub
        </h2>
        
        {/* Tabs - Scrollable on mobile */}
        <div className="overflow-x-auto pb-2 -mx-2 px-2 xl:pb-0 xl:mx-0 xl:px-0 hide-scrollbar">
          <div className="flex bg-[#f4f7fb] p-1.5 rounded-2xl w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-white text-[#1E3A5F] shadow-sm" 
                    : "text-gray-500 hover:text-[#1E3A5F] hover:bg-white/50"
                }`}
              >
                <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? "fill-[#F4A024] text-[#F4A024]" : ""}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-4 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {getActiveArticles().map((article) => (
              <div 
                key={article.id} 
                className="group relative flex flex-col rounded-[24px] border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[#1E3A5F]/20 transition-all duration-300 bg-white"
              >
                {/* Image */}
                <div className="h-48 w-full overflow-hidden relative">
                  <img 
                    src={article.heroImage} 
                    alt={article.title} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold text-[#1E3A5F] shadow-sm">
                    {article.sector?.name || article.tags[0] || 'News'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-[#1E3A5F] mb-4 line-clamp-2 leading-snug group-hover:text-[#F4A024] transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* Author / Source if SME article */}
                  {activeTab === 'sme-articles' && (
                     <div className="flex items-center gap-3 mb-4">
                         <div className="h-8 w-8 rounded-full bg-[#f4f7fb] flex items-center justify-center text-[#1E3A5F] text-[10px] font-bold">
                             SME
                         </div>
                         <span className="text-sm font-bold text-gray-500">Verified Contributor</span>
                     </div>
                  )}

                  <div className="mt-auto flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-2 font-medium">
                      <Clock className="h-4 w-4" /> {article.readTime}
                    </span>
                    <div className="flex gap-4">
                      <button className="hover:text-[#F4A024] transition-all"><Share2 className="h-5 w-5" /></button>
                      <button className="hover:text-[#F4A024] transition-all">
                        <Bookmark className={`h-5 w-5 ${activeTab === 'saved' ? 'fill-[#F4A024] text-[#F4A024]' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <Link href={`/news/${article.id}`} className="absolute inset-0 z-10" />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 text-center">
        <Link 
          href="/my-news" 
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#1E3A5F] hover:bg-[#F4A024] shadow-md hover:shadow-lg transition-all py-3 px-8 rounded-2xl"
        >
          View All in {tabs.find(t => t.id === activeTab)?.label}
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
