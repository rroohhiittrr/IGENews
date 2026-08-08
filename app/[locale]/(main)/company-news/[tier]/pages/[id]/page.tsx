'use client';

import { useState, useEffect } from 'react';
import { CompanyDetail } from '@/types/company';
import { companyApi } from '@/lib/api/company';
import { SkeletonPulse } from '@/components/company-pages/skeletons';
import { TierBadge } from '@/components/company-pages/ui/TierBadge';
import { Building2, MapPin, Calendar, Users, DollarSign, Globe, Phone, Mail, ArrowLeft, Image as ImageIcon, Lock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const locale = (params?.locale as string) || 'en';
  
  const [detail, setDetail] = useState<CompanyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      setError(false);
      try {
        const res = await companyApi.detail(id);
        setDetail(res.data);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <SkeletonPulse className="h-6 w-24" />
        <SkeletonPulse className="h-[200px] w-full rounded-3xl" />
        <SkeletonPulse className="h-[300px] w-full rounded-3xl" />
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-sm font-bold text-red-500">Failed to load company details.</p>
        <button onClick={() => router.back()} className="text-xs font-bold text-[#1E3A5F] dark:text-white underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b12] pb-16">
      {/* Header Back Button */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 grid grid-cols-12 gap-8">
        {/* Main profile section */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Main Info Card */}
          <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
              {/* Logo fallback */}
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1E3A5F] to-[#2F6FA3] flex items-center justify-center text-white font-black text-2xl shrink-0 shadow-md">
                {detail.logoInitials}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TierBadge tier={detail.tier} />
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-[#1E3A5F] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  {detail.name}
                </h1>
                <p className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {detail.location}
                </p>
              </div>
            </div>

            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-l-4 border-[#F4A024] pl-4 italic">
              "{detail.tagline || 'Leading bilateral operations across manufacturing corridors.'}"
            </p>

            <div className="space-y-3">
              <h3 className="text-base font-black text-[#1E3A5F] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
                About Company
              </h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">
                {detail.about}
              </p>
            </div>
          </div>

          {/* Products & Assets */}
          <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 space-y-4">
            <h3 className="text-base font-black text-[#1E3A5F] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Core Products & Capabilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {detail.products.map((prod, idx) => (
                <span
                  key={idx}
                  className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-xl text-xs font-bold"
                >
                  {prod}
                </span>
              ))}
            </div>
          </div>

          {/* Leadership Structure */}
          {detail.tier === 'registered' ? (
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-50/70 dark:bg-[#0c1829]/70 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 z-10">
                <Lock className="w-8 h-8 text-amber-500 mb-2" />
                <h4 className="text-xs font-black text-[#1E3A5F] dark:text-white uppercase tracking-wider">Team Leadership Locked</h4>
                <p className="text-[10px] text-gray-500 max-w-[240px] mt-1 font-semibold leading-normal">
                  Upgrade to Verified or Enterprise plan to link executive leadership profiles.
                </p>
                <Link href={`/${locale}/profile/plans/company`} className="mt-3 text-[10px] font-black uppercase text-[#F4A024] hover:underline">
                  Unlock Team linking
                </Link>
              </div>
              <h3 className="text-base font-black text-[#1E3A5F] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Executive Leadership Team
              </h3>
              <div className="grid grid-cols-2 gap-4 opacity-20">
                <div className="h-14 bg-gray-200 dark:bg-white/5 rounded-2xl" />
                <div className="h-14 bg-gray-200 dark:bg-white/5 rounded-2xl" />
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 space-y-4">
              <h3 className="text-base font-black text-[#1E3A5F] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Executive Leadership Team
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {detail.leadership.map((l, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-[#1E3A5F]/20 text-[#1E3A5F] dark:text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {l.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white leading-tight">{l.name}</h4>
                      <span className="text-[10px] text-gray-400 font-semibold">{l.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Corporate Stats Card */}
          <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <h3 className="text-sm font-black text-[#1E3A5F] dark:text-white uppercase tracking-wider">
              Profile Summary
            </h3>
            <div className="space-y-3.5 text-xs font-semibold">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 shrink-0" />
                  Founded
                </span>
                <span className="text-[#1E3A5F] dark:text-white font-bold">{detail.foundedYear}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Users className="w-4 h-4 shrink-0" />
                  Employees
                </span>
                <span className="text-[#1E3A5F] dark:text-white font-bold">{detail.employees}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 shrink-0" />
                  Revenue
                </span>
                <span className="text-[#1E3A5F] dark:text-white font-bold">{detail.revenue}</span>
              </div>
              
              <hr className="border-gray-100 dark:border-white/5" />
              
              <div className="space-y-2.5 pt-1.5">
                {detail.website && (
                  <a
                    href={detail.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-[#F4A024] hover:text-[#1E3A5F] dark:hover:text-white transition-colors"
                  >
                    <Globe className="w-4 h-4 shrink-0" />
                    Visit Official Website
                  </a>
                )}
                {detail.phone && (
                  <span className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
                    <Phone className="w-4 h-4 shrink-0" />
                    {detail.phone}
                  </span>
                )}
                {detail.email && (
                  <span className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
                    <Mail className="w-4 h-4 shrink-0" />
                    {detail.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* B2B Analytics & Buyer Leads Gating */}
          <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 space-y-4 relative overflow-hidden">
            {detail.tier === 'registered' && (
              <div className="absolute inset-0 bg-gray-50/70 dark:bg-[#0c1829]/70 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 z-10">
                <Lock className="w-6 h-6 text-amber-500 mb-1" />
                <h4 className="text-xs font-black text-[#1E3A5F] dark:text-white uppercase tracking-wider">B2B Analytics Locked</h4>
                <p className="text-[9px] text-gray-400 max-w-[200px] mt-1 font-semibold leading-normal">
                  Upgrade to Verified/Enterprise to track buyer leads and visitor metrics.
                </p>
              </div>
            )}
            
            <h3 className="text-sm font-black text-[#1E3A5F] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#F4A024]" />
              B2B Analytics
            </h3>
            
            <div className={`space-y-3 ${detail.tier === 'registered' ? 'opacity-20' : ''}`}>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-gray-400">Profile Views (30d)</span>
                <span className="text-emerald-500 font-bold">+{detail.viewCount30d}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-gray-400">B2B Buyer Leads</span>
                <span className="text-[#1E3A5F] dark:text-white font-bold">
                  {detail.tier === 'top' ? '28 Active Leads' : 'Leads Locked'}
                </span>
              </div>
              
              {detail.tier === 'top' ? (
                <button
                  onClick={() => alert('Leads exported successfully as CSV.')}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Export Leads (CSV)
                </button>
              ) : detail.tier === 'verified' ? (
                <div className="pt-2 border-t border-dashed border-gray-100 dark:border-white/5 space-y-2">
                  <p className="text-[10px] text-gray-400 font-semibold leading-normal">
                    You have <span className="text-emerald-500 font-black">12 locked buyer leads</span> looking for products in your sector.
                  </p>
                  <Link
                    href={`/${locale}/profile/plans/company`}
                    className="block text-center py-2 bg-gradient-to-r from-amber-500 to-[#F4A024] text-white rounded-xl text-[9px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Unlock Enterprise Leads
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          {/* Premium gallery list (Gated for Verified/Top tiers) */}
          {detail.tier === 'registered' ? (
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-50/70 dark:bg-[#0c1829]/70 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 z-10">
                <Lock className="w-8 h-8 text-amber-500 mb-2" />
                <h4 className="text-xs font-black text-[#1E3A5F] dark:text-white uppercase tracking-wider">Media Gallery Locked</h4>
                <p className="text-[10px] text-gray-500 max-w-[200px] mt-1 font-semibold leading-normal">
                  Upgrade to Verified or Enterprise plan to showcase products.
                </p>
                <Link href={`/${locale}/profile/plans/company`} className="mt-3 text-[10px] font-black uppercase text-[#F4A024] hover:underline">
                  View Plans
                </Link>
              </div>
              <h3 className="text-sm font-black text-[#1E3A5F] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-gray-400" />
                Media Gallery
              </h3>
              <div className="grid grid-cols-2 gap-2.5 opacity-20">
                <div className="aspect-square bg-gray-200 dark:bg-white/5 rounded-2xl" />
                <div className="aspect-square bg-[#1E3A5F]/20 dark:bg-white/5 rounded-2xl" />
              </div>
            </div>
          ) : detail.galleryImages.length > 0 ? (
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 space-y-4">
              <h3 className="text-sm font-black text-[#1E3A5F] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#F4A024]" />
                Media Gallery
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {detail.galleryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-square bg-gray-100 dark:bg-white/5 rounded-2xl overflow-hidden group shadow-inner">
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
