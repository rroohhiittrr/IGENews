'use client';

import { useState } from 'react';
import { CompanyCard as CompanyCardType } from '@/types/company';
import { TierBadge } from './TierBadge';
import { MapPin, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CompanyCardProps {
  company: CompanyCardType;
  locale?: string;
}

export function CompanyCard({ company, locale = 'en' }: CompanyCardProps) {
  const [isFollowing, setIsFollowing] = useState(company.isFollowing);
  const [followers, setFollowers] = useState(company.followerCount);

  const toggleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    setFollowers(prev => isFollowing ? prev - 1 : prev + 1);
  };

  return (
    <Link
      href={`/${locale}/company-news/${company.tier}/pages/${company.id}`}
      className="group block border border-gray-100 dark:border-white/5 rounded-3xl p-5 bg-white dark:bg-[#122238] shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgb(0,0,0,0.06)] hover:border-gray-200 dark:hover:border-white/10 transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex gap-4 items-center">
          {/* Logo Fallback Initials */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1D1D46] to-[#0642BA] flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md">
            {company.logoInitials}
          </div>
          <div>
            <div className="mb-1">
              <TierBadge tier={company.tier} />
            </div>
            <h3 className="font-bold text-base text-[#1D1D46] dark:text-white group-hover:text-[#F0652E] transition-colors leading-tight line-clamp-1">
              {company.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 h-8 font-medium leading-relaxed">
          {company.tagline || 'B2B Trade operations, exports and bilateral supply chain updates.'}
        </p>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-400">
          <span className="bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-md">
            {company.industry}
          </span>
        </div>

        <hr className="border-gray-100 dark:border-white/5" />

        <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {company.location}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {followers.toLocaleString()} followers
          </span>
        </div>
      </div>

      {/* Hover slide overlay */}
      <div className="absolute right-4 bottom-4 w-7 h-7 rounded-full bg-gray-50 dark:bg-white/5 group-hover:bg-[#1D1D46] group-hover:text-white flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <ChevronRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
