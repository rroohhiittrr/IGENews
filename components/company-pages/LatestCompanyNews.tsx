'use client';

import { useState, useEffect } from 'react';
import { NewsCard as NewsCardType } from '@/types/company';
import { companyApi } from '@/lib/api/company';
import { NewsCard } from './ui/NewsCard';
import { NewsCardSkeleton } from './skeletons';
import { Newspaper, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export function LatestCompanyNews() {
  const [news, setNews] = useState<NewsCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(false);
      try {
        const res = await companyApi.latestNews(6);
        setNews(res);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 space-y-8">
      {/* Title */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#F0652E] flex items-center gap-1.5">
            <Newspaper className="w-3.5 h-3.5" />
            Corporate Updates
          </span>
          <h2 className="text-2xl font-black text-[#1D1D46] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Latest Press Releases & Announcements
          </h2>
        </div>
        <Link
          href={`/${locale}/company-news/registered/news`}
          className="flex items-center gap-1 text-xs font-black text-[#F0652E] hover:text-[#1D1D46] dark:hover:text-white transition-colors"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* List Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-white dark:bg-[#122238] border border-red-100 rounded-3xl p-6">
          <p className="text-xs font-bold text-red-500">Failed to fetch corporate news.</p>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-[#122238] border rounded-3xl">
          <p className="text-xs text-gray-500 font-bold">No press releases available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {news.map(n => (
            <NewsCard key={n.id} news={n} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
