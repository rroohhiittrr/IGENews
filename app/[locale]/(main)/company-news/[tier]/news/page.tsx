'use client';

import { useState, useEffect } from 'react';
import { NewsCard as NewsCardType, Pagination as PaginationType } from '@/types/company';
import { companyApi } from '@/lib/api/company';
import { NewsCard } from '@/components/company-pages/ui/NewsCard';
import { NewsCardSkeleton } from '@/components/company-pages/skeletons';
import { Pagination } from '@/components/company-pages/ui/Pagination';
import { Newspaper, ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function TierNewsPage() {
  const params = useParams();
  const router = useRouter();
  const tier = params?.tier as string;
  const locale = (params?.locale as string) || 'en';

  const [news, setNews] = useState<NewsCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(false);
      try {
        // Query company news matching tier. For this client-side demo, we retrieve cross-tier news and filter
        const allNews = await companyApi.latestNews(50);
        const filtered = allNews.filter(n => n.company.tier === tier);
        
        // Paginate local results
        const pageSize = 12;
        const total = filtered.length;
        const totalPages = Math.ceil(total / pageSize);
        const start = (page - 1) * pageSize;
        const paginated = filtered.slice(start, start + pageSize);

        setNews(paginated);
        setPagination({
          page,
          pageSize,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        });
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [tier, page]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b12] pb-16">
      {/* Header with back trigger */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-8">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#F0652E] flex items-center gap-1">
            <Newspaper className="w-3.5 h-3.5" />
            {tier === 'top' ? 'Enterprise' : tier} Releases
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-[#1D1D46] dark:text-white capitalize" style={{ fontFamily: 'var(--font-display)' }}>
            Company updates and PR bulletins
          </h1>
        </div>

        {/* Content grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white dark:bg-[#122238] border border-red-100 rounded-[32px] p-6">
            <p className="text-xs font-bold text-red-500">Failed to load press releases.</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-[32px]">
            <p className="text-xs text-gray-500 font-bold">No announcements published yet for this tier.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {news.map(n => (
                <NewsCard key={n.id} news={n} locale={locale} />
              ))}
            </div>
            
            <Pagination
              pagination={pagination}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
