'use client';

import { CompanyDirectory } from '@/components/company-pages/CompanyDirectory';
import { CompanyHeroBanner } from '@/components/company-pages/CompanyHeroBanner';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCompanyFilters } from '@/hooks/useCompanyFilters';

export default function TierDirectoryPage() {
  const params = useParams();
  const tier = params?.tier as string;
  const { filters, setFilters } = useCompanyFilters();

  useEffect(() => {
    if (tier && (tier === 'registered' || tier === 'verified' || tier === 'top') && !filters.tier.includes(tier as any)) {
      setFilters({ tier: [tier as any], page: 1 });
    }
  }, [tier]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b12] pb-12">
      <CompanyHeroBanner />
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-8">
        <h2 className="text-xl font-black text-[#1D1D46] dark:text-white capitalize" style={{ fontFamily: 'var(--font-display)' }}>
          {tier === 'top' ? 'Enterprise' : tier} Corporate Directory
        </h2>
      </div>
      <CompanyDirectory />
    </div>
  );
}
