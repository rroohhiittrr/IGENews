'use client';

import { useState } from 'react';
import { Search, Building2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export function CompanyHeroBanner() {
  const [search, setSearch] = useState('');
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'en';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/${locale}/company-news/registered/pages?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#1E3A5F] to-[#0c1829] text-white py-16 md:py-24 px-4 lg:px-6">
      {/* Decorative backdrop grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#F4A024]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center space-y-6 md:space-y-8 relative z-10">
        <div className="space-y-3 max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#F4A024] bg-[#F4A024]/10 border border-[#F4A024]/20 px-3 py-1 rounded-full">
            B2B Trade Intelligence Hub
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Explore India's Premier <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4A024] to-[#f97316]">Company Directory</span>
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Verify profiles, discover sector opportunities, and follow updates from over 16,000 exporters, manufacturers, and trade leaders.
          </p>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
          <div className="relative flex items-center p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl focus-within:ring-2 focus-within:ring-[#F4A024] focus-within:border-transparent transition-all">
            <Search className="w-5 h-5 absolute left-5 text-gray-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies, product lines, export sectors..."
              className="w-full bg-transparent pl-12 pr-4 py-3.5 text-sm md:text-base font-semibold text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#F4A024] hover:bg-[#d97706] text-white px-6 py-3.5 rounded-xl font-bold text-xs md:text-sm shrink-0 transition-colors shadow-md cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href={`/${locale}/eoi`}
            className="flex items-center gap-1.5 bg-white text-[#1E3A5F] hover:bg-gray-100 px-5 py-3 rounded-2xl font-bold text-xs shadow-md transition-colors"
          >
            <Building2 className="w-4 h-4" />
            Register Company
          </Link>
          <Link
            href={`/${locale}/eoi`}
            className="flex items-center gap-1.5 bg-[#F4A024]/20 hover:bg-[#F4A024]/30 border border-[#F4A024]/40 text-white px-5 py-3 rounded-2xl font-bold text-xs transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#F4A024]" />
            Claim Verification
          </Link>
          <Link
            href={`/${locale}/profile/plans/company`}
            className="flex items-center gap-1 text-gray-300 hover:text-white px-4 py-3 font-bold text-xs transition-colors"
          >
            Enterprise Upgrades
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Live Counters strip */}
        <div className="grid grid-cols-3 max-w-lg mx-auto bg-white/5 border border-white/5 backdrop-blur-md rounded-2xl p-4 divide-x divide-white/5 text-center text-xs">
          <div>
            <span className="block text-base md:text-lg font-black text-[#F4A024]">12,000+</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Registered</span>
          </div>
          <div>
            <span className="block text-base md:text-lg font-black text-emerald-400">3,200+</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Verified</span>
          </div>
          <div>
            <span className="block text-base md:text-lg font-black text-amber-400">420+</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Enterprise</span>
          </div>
        </div>
      </div>
    </div>
  );
}
