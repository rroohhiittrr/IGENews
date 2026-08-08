'use client';

import { CompanyTier } from '@/types/company';
import { ShieldCheck, Crown, Shield } from 'lucide-react';

export function TierBadge({ tier }: { tier: CompanyTier }) {
  if (tier === 'top') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
        <Crown className="w-3 h-3 shrink-0" />
        Enterprise
      </span>
    );
  }

  if (tier === 'verified') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
        <ShieldCheck className="w-3 h-3 shrink-0" />
        Verified
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
      <Shield className="w-3 h-3 shrink-0" />
      Registered
    </span>
  );
}
