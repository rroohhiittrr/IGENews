'use client';

import { BrowseByIndustry } from '@/components/company-pages/BrowseByIndustry';
import { CompanyHeroBanner } from '@/components/company-pages/CompanyHeroBanner';

export default function TierSectorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b12] pb-12">
      <CompanyHeroBanner />
      <BrowseByIndustry />
    </div>
  );
}
