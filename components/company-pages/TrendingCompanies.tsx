'use client';

import { useState, useEffect } from 'react';
import { CompanyCard as CompanyCardType } from '@/types/company';
import { companyApi } from '@/lib/api/company';
import { SkeletonPulse } from './skeletons';
import { Award, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function TrendingCompanies() {
  const [list, setList] = useState<CompanyCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  useEffect(() => {
    async function load() {
      try {
        const res = await companyApi.featured(['top', 'verified'], 6);
        // Sort deterministically to look like a ranking
        res.sort((a, b) => b.followerCount - a.followerCount);
        setList(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
      {/* Title */}
      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase tracking-wider text-[#F0652E] flex items-center gap-1">
          <Award className="w-3.5 h-3.5" />
          Ranking Signals
        </span>
        <h3 className="text-base font-black text-[#1D1D46] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
          Trending Corporate Ranks
        </h3>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-center">
              <SkeletonPulse className="w-6 h-6 rounded-lg" />
              <div className="space-y-1.5 w-full">
                <SkeletonPulse className="h-4 w-2/3" />
                <SkeletonPulse className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-white/5">
          {list.map((c, index) => {
            const rank = index + 1;
            const trendUp = rank % 3 !== 0; // Mock trend flag
            const changePercent = Math.floor(c.viewCount30d / 500) + 1;

            return (
              <Link
                key={c.id}
                href={`/${locale}/company-news/${c.tier}/pages/${c.id}`}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0 group"
              >
                {/* Rank indicator badge */}
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                  rank === 1 ? 'bg-[#F0652E]/10 text-[#F0652E] border border-[#F0652E]/20' : 
                  rank === 2 ? 'bg-[#1D1D46]/10 text-[#1D1D46] dark:bg-white/5 dark:text-white' : 
                  'text-gray-400'
                }`}>
                  {rank}
                </span>

                {/* Company info */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white group-hover:text-[#F0652E] transition-colors leading-snug line-clamp-1">
                    {c.name}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-semibold mt-0.5 block">{c.industry}</span>
                </div>

                {/* Trend values */}
                <div className="text-right shrink-0">
                  <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${
                    trendUp ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {trendUp ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                    {changePercent}%
                  </span>
                  <span className="block text-[9px] text-gray-400 font-medium">Rankings</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Button footer linking to all rankings */}
      <Link
        href={`/${locale}/company-news/registered/pages?sort=most_viewed`}
        className="block text-center text-[10px] font-black uppercase text-[#F0652E] hover:text-[#1D1D46] dark:hover:text-white transition-colors cursor-pointer"
      >
        View Full Directory Ranks
      </Link>
    </div>
  );
}
