'use client';

import { Sparkles, ArrowRight, ShieldCheck, Crown } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function UpgradeBanner() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2F6FA3] dark:from-[#122238] dark:to-[#172c47] rounded-[32px] overflow-hidden text-white border border-white/5 shadow-xl relative p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#F4A024]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-2xl text-center md:text-left relative z-10">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#F4A024] bg-[#F4A024]/15 border border-[#F4A024]/30 px-3 py-1 rounded-full inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-[#F4A024] stroke-none animate-pulse" />
            Grow Authority
          </span>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Establish Trust with Verified Profiles
          </h3>
          <p className="text-xs md:text-sm text-gray-300 font-semibold leading-relaxed">
            Upgrade to a Verified Company profile to get a trust badge, unlock professional PR publications written by IGEN editors, and sync directly with buyer leads pipelines.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 relative z-10 w-full md:w-auto">
          <Link
            href={`/${locale}/profile/plans/company`}
            className="flex items-center justify-center gap-1.5 bg-[#F4A024] hover:bg-[#d97706] text-white px-6 py-4 rounded-2xl font-bold text-xs shadow-md transition-colors w-full sm:w-auto"
          >
            Upgrade Plan
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/${locale}/eoi`}
            className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white px-6 py-4 rounded-2xl font-bold text-xs transition-colors w-full sm:w-auto"
          >
            <ShieldCheck className="w-4 h-4 text-[#F4A024]" />
            Claim Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
