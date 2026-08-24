'use client';

import { useState, useEffect, useRef } from 'react';
import { NewsCard as NewsCardType } from '@/types/company';
import { companyApi } from '@/lib/api/company';
import { NewsCard } from './ui/NewsCard';
import { NewsCardSkeleton } from './skeletons';
import { TrendingUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';

export function TrendingCompanyNews() {
  const [news, setNews] = useState<NewsCardType[]>([]);
  const [activeVariant, setActiveVariant] = useState<'most-viewed' | 'editors-pick'>('most-viewed');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(false);
      try {
        const res = await companyApi.trendingNews(activeVariant, 6);
        setNews(res);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeVariant]);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 340; // width of item + gap
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#F0652E] flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Market Signals
          </span>
          <h2 className="text-2xl font-black text-[#1D1D46] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Trending B2B Coverage
          </h2>
        </div>

        {/* Carousel actions */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl gap-1 mr-2">
            <button
              onClick={() => setActiveVariant('most-viewed')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeVariant === 'most-viewed'
                  ? 'bg-white dark:bg-[#122238] text-[#1D1D46] dark:text-[#F0652E] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-white'
              }`}
            >
              Most Viewed
            </button>
            <button
              onClick={() => setActiveVariant('editors-pick')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeVariant === 'editors-pick'
                  ? 'bg-white dark:bg-[#122238] text-[#1D1D46] dark:text-[#F0652E] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-white'
              }`}
            >
              Editors Pick
            </button>
          </div>

          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-gray-100 dark:border-white/5 bg-white dark:bg-[#122238] flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-gray-100 dark:border-white/5 bg-white dark:bg-[#122238] flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white shadow-sm cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel list wrapper */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-white dark:bg-[#122238] border border-red-100 rounded-3xl p-6">
          <p className="text-xs font-bold text-red-500">Failed to load trending data.</p>
        </div>
      ) : (
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {news.map(n => (
            <div key={n.id} className="w-[300px] md:w-[340px] shrink-0 snap-start">
              <NewsCard news={n} locale={locale} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
