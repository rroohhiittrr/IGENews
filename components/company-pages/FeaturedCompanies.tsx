'use client';

import { useState, useEffect } from 'react';
import { CompanyCard as CompanyCardType, CompanyTier } from '@/types/company';
import { companyApi } from '@/lib/api/company';
import { CompanyCard } from './ui/CompanyCard';
import { CompanyCardSkeleton } from './skeletons';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export function FeaturedCompanies() {
  const [list, setList] = useState<CompanyCardType[]>([]);
  const [activeTab, setActiveTab] = useState<CompanyTier | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(false);
      try {
        const tiers: string[] = activeTab === 'all' ? ['verified', 'top'] : [activeTab];
        const res = await companyApi.featured(tiers, 8);
        setList(res);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#F4A024] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 fill-[#F4A024] stroke-none" />
            Curated Prestige Listings
          </span>
          <h2 className="text-2xl font-black text-[#1E3A5F] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Featured Corporate Leaders
          </h2>
        </div>

        {/* Tier filter tabs */}
        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl gap-1 shrink-0 overflow-x-auto">
          {[
            { id: 'all', label: 'All Premium' },
            { id: 'top', label: 'Enterprise' },
            { id: 'verified', label: 'Verified' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#122238] text-[#1E3A5F] dark:text-[#F4A024] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <CompanyCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-white dark:bg-[#122238] border border-red-100 rounded-3xl p-6">
          <p className="text-xs font-bold text-red-500">Failed to fetch featured companies.</p>
          <button onClick={() => setActiveTab(activeTab)} className="mt-2 text-xs font-bold text-[#1E3A5F] dark:text-white underline">
            Retry Loading
          </button>
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-[#122238] border rounded-3xl">
          <p className="text-xs text-gray-500 font-bold">No premium listings found matching this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map(c => (
            <CompanyCard key={c.id} company={c} locale={locale} />
          ))}
        </div>
      )}

      {/* Upgrade CTA strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#1E3A5F]/5 to-[#2F6FA3]/5 dark:from-white/5 dark:to-transparent rounded-3xl p-5 border border-gray-100 dark:border-white/5">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
          Want your company profile showcased here? Join our verification and editorial support pipelines.
        </p>
        <Link
          href={`/${locale}/profile/plans/company`}
          className="flex items-center gap-1.5 text-xs font-black text-[#F4A024] hover:text-[#1E3A5F] dark:hover:text-white transition-colors"
        >
          View Business Plans
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
