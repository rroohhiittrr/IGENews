'use client';

import { useState, useEffect } from 'react';
import { Sector } from '@/types/company';
import { companyApi } from '@/lib/api/company';
import { IndustryCardSkeleton } from './skeletons';
import { Globe, ArrowUpRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export function BrowseByIndustry() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'en';

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(false);
      try {
        const res = await companyApi.sectors();
        setSectors(res);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSectorClick = (id: string) => {
    router.push(`/${locale}/company-news/registered/pages?sector=${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 space-y-8">
      {/* Title */}
      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#F4A024] flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5" />
          Industry Hubs
        </span>
        <h2 className="text-2xl font-black text-[#1E3A5F] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
          Browse Companies by Primary Sector
        </h2>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <IndustryCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-6 bg-white dark:bg-[#122238] border border-red-100 rounded-3xl p-6">
          <p className="text-xs font-bold text-red-500">Failed to load industry sectors.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sectors.map(sec => (
            <button
              key={sec.id}
              onClick={() => handleSectorClick(sec.id)}
              className="group text-left border border-gray-100 dark:border-white/5 rounded-2xl p-4 bg-white dark:bg-[#122238] hover:shadow-[0_8px_24px_rgb(0,0,0,0.04)] hover:border-gray-200 dark:hover:border-white/10 flex items-center gap-3 transition-all cursor-pointer relative"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-lg shrink-0">
                {sec.icon || '🏭'}
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#1E3A5F] dark:text-white group-hover:text-[#F4A024] transition-colors leading-tight line-clamp-1">
                  {sec.name}
                </h3>
                <span className="text-[10px] font-bold text-gray-400 block mt-0.5">
                  {sec.companyCount} Companies
                </span>
              </div>
              <ArrowUpRight className="w-3 h-3 absolute right-3 top-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
