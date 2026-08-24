'use client';

import { useState } from 'react';
import { NewsCard as NewsCardType } from '@/types/company';
import { Bookmark, Clock, Eye, Share2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface NewsCardProps {
  news: NewsCardType;
  locale?: string;
}

export function NewsCard({ news, locale = 'en' }: NewsCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(news.isBookmarked);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const formattedDate = new Date(news.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link
      href={`/${locale}/company-news/${news.company.tier}/news/${news.id}`}
      className="group block border border-gray-100 dark:border-white/5 rounded-3xl p-4 bg-white dark:bg-[#122238] shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgb(0,0,0,0.06)] hover:border-gray-200 dark:hover:border-white/10 transition-all duration-300 relative"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[1.6] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 mb-4 shadow-inner">
        {news.thumbnailUrl ? (
          <img
            src={news.thumbnailUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1D1D46] to-[#0642BA] text-white/20">
            <Sparkles className="w-10 h-10" />
          </div>
        )}
        
        {/* Sponsored / PR tag */}
        {news.isSponsored && (
          <span className="absolute top-3 left-3 bg-[#F0652E] text-white text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md">
            Sponsored PR
          </span>
        )}

        {/* Category tag */}
        <span className="absolute bottom-3 left-3 bg-[#0c1829]/70 backdrop-blur-md text-white text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-md">
          {news.category}
        </span>
      </div>

      {/* Title & metadata */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          <span className="text-[#1D1D46] dark:text-[#F0652E]">{news.company.name}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        <h3 className="font-extrabold text-sm text-[#1D1D46] dark:text-white leading-snug group-hover:text-[#F0652E] transition-colors line-clamp-2 h-10">
          {news.title}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 h-8 font-medium">
          {news.summary}
        </p>

        <hr className="border-gray-100 dark:border-white/5 pt-1" />

        <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {news.readingTimeMinutes} min read
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleBookmark}
              className={`p-1.5 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors ${
                isBookmarked ? 'text-[#F0652E]' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Bookmark"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-1.5 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 transition-colors"
              title="Share"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
