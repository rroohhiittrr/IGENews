'use client';

import { CompanyDirectory } from '@/components/company-pages/CompanyDirectory';
import { CompanyHeroBanner } from '@/components/company-pages/CompanyHeroBanner';
import { useEffect } from 'react';
import { useCompanyFilters } from '@/hooks/useCompanyFilters';

export default function AllTierDirectoryPage() {
  const { setFilters } = useCompanyFilters();

  useEffect(() => {
    // Reset tier filter to show all in the directory
    setFilters({ tier: [], page: 1 });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b12] pb-12">
      <CompanyHeroBanner />
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-8">
        <h2 className="text-xl font-black text-[#1E3A5F] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
          Full Corporate Directory Repository
        </h2>
      </div>
      <CompanyDirectory />
    </div>
  );
}
