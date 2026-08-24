'use client';

import { useState, useEffect } from 'react';
import { CompanyDetail } from '@/types/company';
import { companyApi } from '@/lib/api/company';
import { SkeletonPulse } from './skeletons';
import { Sparkles, Building2, MapPin, Globe, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function CompanySpotlight() {
  const [detail, setDetail] = useState<CompanyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  useEffect(() => {
    async function load() {
      try {
        // Fetch a representative enterprise details
        const featured = await companyApi.featured(['top'], 1);
        if (featured.length > 0) {
          const detailRes = await companyApi.detail(featured[0].id);
          setDetail(detailRes.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <SkeletonPulse className="h-[250px] w-full rounded-[32px]" />
      </div>
    );
  }

  if (!detail) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
      <div className="bg-gradient-to-br from-[#1D1D46] to-[#0c1829] rounded-[32px] overflow-hidden text-white border border-[#0642BA]/30 shadow-2xl relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#F0652E]/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="p-6 md:p-10 space-y-6 md:space-y-8 relative z-10">
          {/* Badge & header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F0652E] bg-[#F0652E]/15 border border-[#F0652E]/30 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-[#F0652E] stroke-none animate-pulse" />
              Corporate Spotlight
            </span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Enterprise Partner</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            {/* Logo initials mock */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#F0652E] to-[#e68a00] text-white font-extrabold text-3xl flex items-center justify-center shadow-lg border-2 border-white/20 shrink-0">
              {detail.logoInitials}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {detail.name}
              </h3>
              <p className="text-sm md:text-base text-gray-300 font-medium max-w-2xl leading-relaxed">
                "{detail.tagline || 'Leading bilateral operations across manufacturing corridors.'}"
              </p>
            </div>
          </div>

          <p className="text-xs md:text-sm text-gray-300 line-clamp-3 leading-relaxed max-w-4xl font-semibold">
            {detail.about}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 rounded-2xl p-5 border border-white/5">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Founded</span>
              <span className="text-base font-black text-[#F0652E]">{detail.foundedYear}</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Revenue</span>
              <span className="text-base font-black text-emerald-400">{detail.revenue}</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Global Team</span>
              <span className="text-base font-black text-white">{detail.employees}</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</span>
              <span className="text-base font-black text-white line-clamp-1">{detail.location}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={`/${locale}/company-news/${detail.tier}/pages/${detail.id}`}
              className="flex items-center gap-1.5 bg-[#F0652E] hover:bg-[#d97706] text-white px-5 py-3.5 rounded-2xl font-bold text-xs transition-colors shadow-md"
            >
              <Building2 className="w-4 h-4" />
              View Full Profile
            </Link>
            <Link
              href={`/${locale}/eoi`}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white px-5 py-3.5 rounded-2xl font-bold text-xs transition-colors"
            >
              <FileText className="w-4 h-4" />
              Request B2B Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
